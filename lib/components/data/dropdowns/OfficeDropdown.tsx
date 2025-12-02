import { Dropdown, Skeleton, Badge } from "@usace/groundwork";

import useCdaOffices from "../hooks/useCdaOffices";
import { useMemo } from "react";

interface OfficeDropdownProps {
  hasData?: boolean;
  typeFilters?: string[];
  excludeOffices?: string[];
  includeBlank?: boolean;
  initOverrides?: Record<string, unknown>;
  queryOptions?: Record<string, unknown>;
  onChange?: (value: string) => void;
}

/**
 * OfficeDropdown component
 * Renders a dropdown list of offices
 * Accepts props for filtering and customization
 * - hasData: boolean to filter offices with data
 * - typeFilters: array of strings to filter offices by type
 * - excludeOffices: array of strings to exclude specific offices by name
 * - includeBlank: boolean to include a blank option in the dropdown
 * - initOverrides: object for initial query overrides
 * - queryOptions: object for query options
 * - onChange: callback function when the selected office changes
 */
const OfficeDropdown = ({
  hasData,
  typeFilters,
  excludeOffices,
  includeBlank,
  initOverrides,
  queryOptions,
  ...props
}: OfficeDropdownProps) => {
  const cdaOffices = useCdaOffices({
    cdaParams: { hasData },
    initOverrides,
    queryOptions,
  });

  const filteredOffices = useMemo(() => {
    if (!cdaOffices.data) return [];
    // Filter offices by requested types
    const filteredOffices = cdaOffices.data.filter((office) => {
      if (!typeFilters) return true;
      // normalize the filters to the types by case
      const normalizedFilters = typeFilters.map((filter) => filter.toLowerCase());
      return office.type
        ? normalizedFilters.includes(office.type.toLowerCase())
        : false;
    });
    // Offices to exclude by name, i.e. optionally popped out of final results
    if (excludeOffices) {
      const normalizedExcludes = excludeOffices.map((excl) => excl.toLowerCase());
      return filteredOffices.filter((office) => {
        return office.name && !normalizedExcludes.includes(office.name.toLowerCase());
      });
    }
    // Include a blank if set
    if (includeBlank) {
      filteredOffices.unshift({
        name: "",
        longName: "Select an office",
        type: undefined,
      });
    }
    return filteredOffices;
  }, [typeFilters, cdaOffices.data, excludeOffices, includeBlank]);

  const noData = !cdaOffices.isPending && !cdaOffices.data;
  if (!props?.onChange) {
    console.warn(
      "OfficeDropdown is missing onChange prop. You must set this property on <OfficeDropdown /> for something to happen when it changes.",
    );
  }
  if (noData) return <div>No office data available</div>;
  if (cdaOffices.isError)
    return (
      <Badge type="red" className="gww-my-2">
        Error loading office dropdown: {cdaOffices.error.message}
      </Badge>
    );
  return (
    <div className="gww-w-[50%]">
      {cdaOffices.isLoading ? (
        <Skeleton className="gww-w-full" />
      ) : (
        <Dropdown
          className={"gww-w-5/6 gww-m-auto"}
          defaultValue={filteredOffices[0]?.name}
          title="Select an office"
          aria-label="Select an office"
          options={filteredOffices.map((office) => (
            <option
              key={JSON.stringify(office)}
              value={office.name}
              className="gww-pl-2"
            >
              {office.longName}
            </option>
          ))}
          {...props}
        />
      )}
    </div>
  );
};

export { OfficeDropdown };
export default OfficeDropdown;
