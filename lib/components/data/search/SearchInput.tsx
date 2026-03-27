import { gwMerge, Badge, Skeleton } from "@usace/groundwork";
import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HiMagnifyingGlass,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
} from "react-icons/hi2";

import useDebounce from "../utilities/useDebounce";

type SearchInputRenderState = {
  isActive: boolean;
  query: string;
};

type SearchInputProps<T> = {
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  onSearch?: (query: string) => void;
  onSelect?: (item: T) => void;
  results?: T[];
  getResultKey?: (item: T, index: number) => string | number;
  getResultLabel?: (item: T) => string;
  getResultDescription?: (item: T) => string | undefined;
  renderResult?: (item: T, state: SearchInputRenderState) => ReactNode;
  label?: string;
  placeholder?: string;
  minQueryLength?: number;
  debounceMs?: number;
  idleMessage?: string;
  emptyMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  autoFocus?: boolean;
};

type SearchResultRecord = Record<string, unknown>;

const getStringValue = (value: unknown) => (typeof value === "string" ? value : "");

const defaultGetResultLabel = <T,>(item: T) => {
  const record = item as SearchResultRecord;
  return (
    getStringValue(record.label) ||
    getStringValue(record["public-name"]) ||
    getStringValue(record.publicName) ||
    getStringValue(record.title) ||
    getStringValue(record.name) ||
    getStringValue(record.id)
  );
};

const defaultGetResultDescription = <T,>(item: T) => {
  const record = item as SearchResultRecord;
  const office = getStringValue(record.office);
  const state = getStringValue(record.state);
  const parts = [office && `Office: ${office}`, state && `State: ${state}`].filter(
    Boolean,
  );
  return parts.join(" | ") || undefined;
};

const getKindLabel = (value: unknown) => getStringValue(value).toLowerCase();

const DefaultResultIcon = ({ item }: { item: SearchResultRecord }) => {
  const kind = getKindLabel(item.kind ?? item.type);
  if (kind.includes("project")) {
    return <HiOutlineBuildingOffice2 className="gww-h-5 gww-w-5 gww-text-blue-700" />;
  }

  return <HiOutlineMapPin className="gww-h-5 gww-w-5 gww-text-slate-500" />;
};

const DefaultResult = <T,>({
  item,
  getResultLabel,
  getResultDescription,
}: {
  item: T;
  getResultLabel: (item: T) => string;
  getResultDescription: (item: T) => string | undefined;
}) => {
  const record = item as SearchResultRecord;
  const description = getResultDescription(item);
  const kind = getStringValue(record.kind ?? record.type);

  return (
    <div className="gww-flex gww-items-start gww-gap-3">
      <div className="gww-mt-0.5 gww-flex-none">
        <DefaultResultIcon item={record} />
      </div>
      <div className="gww-min-w-0 gww-flex-1">
        <div className="gww-flex gww-items-center gww-gap-2">
          <span className="gww-truncate gww-font-medium gww-text-slate-900">
            {getResultLabel(item)}
          </span>
          {kind ? (
            <Badge color="gray" className="gww-whitespace-nowrap">
              {kind}
            </Badge>
          ) : null}
        </div>
        {description ? (
          <div className="gww-mt-1 gww-text-sm gww-text-slate-600">{description}</div>
        ) : null}
      </div>
    </div>
  );
};

const SearchInput = <T,>({
  query,
  defaultQuery = "",
  onQueryChange,
  onSearch,
  onSelect,
  results = [],
  getResultKey,
  getResultLabel = defaultGetResultLabel,
  getResultDescription = defaultGetResultDescription,
  renderResult,
  label,
  placeholder = "Search",
  minQueryLength = 3,
  debounceMs = 300,
  idleMessage = "Type more to search.",
  emptyMessage = "No matching results.",
  errorMessage,
  isLoading = false,
  disabled = false,
  className,
  inputClassName,
  listClassName,
  autoFocus = false,
}: SearchInputProps<T>) => {
  const [internalQuery, setInternalQuery] = useState(defaultQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onSearchRef = useRef<SearchInputProps<T>["onSearch"]>(onSearch);
  const listboxId = useId();
  const isControlled = query !== undefined;
  const currentQuery = (isControlled ? query : internalQuery) ?? "";
  const normalizedQuery = currentQuery.trim();
  const debouncedQuery = useDebounce(normalizedQuery, debounceMs);
  const canSearch = debouncedQuery.length >= minQueryLength;
  const showPanel = isOpen && !disabled;
  const hasResults = results.length > 0;
  const remainingCharacters = Math.max(minQueryLength - normalizedQuery.length, 0);
  const computedIdleMessage =
    idleMessage === "Type more to search."
      ? `Type ${remainingCharacters} more character${remainingCharacters === 1 ? "" : "s"} to search.`
      : idleMessage;

  useEffect(() => {
    // Keep the latest callback without making the debounced search effect
    // rerun on every parent re-render.
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    onSearchRef.current?.(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    // Close the popover when focus leaves the component via pointer interaction.
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    // Clamp the highlighted row as results appear/disappear so keyboard
    // navigation does not point at a stale index.
    if (!showPanel || !hasResults) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex((index) => {
      if (index >= results.length) return results.length - 1;
      return index;
    });
  }, [hasResults, results.length, showPanel]);

  const activeDescendant = useMemo(() => {
    if (activeIndex < 0 || activeIndex >= results.length) return undefined;
    return `${listboxId}-option-${activeIndex}`;
  }, [activeIndex, listboxId, results.length]);

  const setQueryValue = (nextQuery: string) => {
    if (!isControlled) {
      setInternalQuery(nextQuery);
    }
    onQueryChange?.(nextQuery);
  };

  const handleSelect = (item: T) => {
    // Mirror combobox behavior by writing the chosen label back into the input.
    setIsOpen(false);
    setActiveIndex(-1);
    setQueryValue(getResultLabel(item));
    onSelect?.(item);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Support the standard combobox keys: arrows to move, Enter to choose,
    // Escape to dismiss.
    if (!showPanel || !hasResults) {
      if (event.key === "ArrowDown" && normalizedQuery.length >= minQueryLength) {
        setIsOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1 >= results.length ? 0 : index + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(results[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const statusContent = (() => {
    if (errorMessage) {
      return (
        <div className="gww-px-4 gww-py-3 gww-text-sm gww-text-red-700">
          {errorMessage}
        </div>
      );
    }

    if (!canSearch) {
      return (
        <div className="gww-px-4 gww-py-3 gww-text-sm gww-text-slate-500">
          {computedIdleMessage}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="gww-space-y-2 gww-p-4">
          <Skeleton className="gww-h-4 gww-w-full" />
          <Skeleton className="gww-h-4 gww-w-4/5" />
        </div>
      );
    }

    if (!hasResults) {
      return (
        <div className="gww-px-4 gww-py-3 gww-text-sm gww-text-slate-500">
          {emptyMessage}
        </div>
      );
    }

    return null;
  })();

  return (
    <div ref={containerRef} className={gwMerge("gww-relative gww-w-full", className)}>
      {label ? (
        <label className="gww-mb-1 gww-block gww-text-sm gww-font-medium gww-text-slate-700">
          {label}
        </label>
      ) : null}
      <div className="gww-relative">
        <div className="gww-pointer-events-none gww-absolute gww-inset-y-0 gww-left-0 gww-flex gww-items-center gww-pl-3">
          <HiMagnifyingGlass
            className="gww-h-5 gww-w-5 gww-text-slate-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={showPanel}
          aria-activedescendant={activeDescendant}
          autoFocus={autoFocus}
          disabled={disabled}
          value={currentQuery}
          placeholder={placeholder}
          className={gwMerge(
            "gww-block gww-w-full gww-rounded-md gww-border gww-border-slate-300 gww-bg-white gww-py-2.5 gww-pl-10 gww-pr-3 gww-text-slate-900 placeholder:gww-text-slate-400 focus:gww-border-blue-600 focus:gww-outline-none focus:gww-ring-2 focus:gww-ring-blue-200 disabled:gww-cursor-not-allowed disabled:gww-bg-slate-100",
            inputClassName,
          )}
          onFocus={() => {
            if (normalizedQuery.length > 0 || hasResults || errorMessage) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setQueryValue(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
        />
      </div>

      {showPanel ? (
        <div
          id={listboxId}
          role="listbox"
          className={gwMerge(
            "gww-absolute gww-z-20 gww-mt-1 gww-max-h-96 gww-w-full gww-overflow-auto gww-rounded-md gww-border gww-border-slate-200 gww-bg-white gww-shadow-lg",
            listClassName,
          )}
        >
          {statusContent}
          {canSearch && !isLoading && !errorMessage && hasResults
            ? results.map((item, index) => {
                const itemKey =
                  getResultKey?.(item, index) ?? `${getResultLabel(item)}-${index}`;
                const isActive = index === activeIndex;

                return (
                  <button
                    id={`${listboxId}-option-${index}`}
                    key={itemKey}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={gwMerge(
                      "gww-flex gww-w-full gww-items-start gww-border-t gww-border-slate-100 gww-px-4 gww-py-3 gww-text-left first:gww-border-t-0",
                      isActive ? "gww-bg-blue-50" : "hover:gww-bg-slate-50",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(item)}
                  >
                    {renderResult ? (
                      renderResult(item, { isActive, query: currentQuery })
                    ) : (
                      <DefaultResult
                        item={item}
                        getResultLabel={getResultLabel}
                        getResultDescription={getResultDescription}
                      />
                    )}
                  </button>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

export { SearchInput };
export type { SearchInputProps };
export default SearchInput;
