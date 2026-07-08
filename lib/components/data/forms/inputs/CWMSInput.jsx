import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";
import useLoadNearestValues from "../hooks/useLoadNearestValues";

function CWMSInput({
  // CWMS-specific props
  tsid,
  precision,
  offset,
  order,
  AllowMissingData,
  loadNearest,
  units,
  timeOffset,
  label,

  // Input props that need special handling
  defaultValue,
  value,
  onChange,
  invalid,
  required,
  placeholder,

  // Display options
  showValueTimestamp,

  // Legacy prop names
  disable,
  readonly,

  // All other props to pass through
  ...inputProps
}) {
  const { registerInput, getTimestampForInput, office, cdaUrl, baseTimestamp } =
    useContext(FormContext);
  const [inputValue, setInputValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);
  const userEdited = useRef(false);

  const columnsArr = useMemo(
    () => (tsid ? [{ tsid, units: units || "EN" }] : []),
    [tsid, units],
  );
  const timeoffsetsArr = useMemo(() => [timeOffset || 0], [timeOffset]);

  const {
    values: loadedValues,
    timestamps: loadedTimestamps,
    isPending: isLoadingNearest,
  } = useLoadNearestValues({
    columns: columnsArr,
    timeoffsets: timeoffsetsArr,
    strategy: loadNearest || "prev",
    getTimestampForInput,
    office,
    cdaUrl,
    defaultUnits: units || "EN",
    enabled: !!office && !!tsid,
  });

  useEffect(() => {
    if (isLoadingNearest || !loadedValues) return;
    const key = `${tsid}_${timeOffset || 0}`;
    const val = loadedValues[key];
    if (!userEdited.current && val != null && inputValue !== String(val)) {
      setInputValue(String(val));
    }
  }, [loadedValues, isLoadingNearest, tsid, timeOffset, inputValue]);

  useEffect(() => {
    userEdited.current = false;
  }, [baseTimestamp]);

  useEffect(() => {
    if (!registerInput) return;

    // Don't register disabled inputs for submission
    if (disable || inputProps.disabled) return;

    const inputRef = {
      name: inputProps.name,
      tsid,
      precision: precision || 2,
      offset: offset || 0,
      order: order || 1,
      AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
      loadNearest: loadNearest || "prev",
      readonly: readonly || false,
      units: units || "EN",
      timeOffset: timeOffset || 0,
      required: required || false,
      label: label || placeholder || inputProps.name,
      getValues: () => [inputValue],
      reset: () => {
        userEdited.current = false;
        setInputValue(defaultValue || "");
      },
      setInvalid: setIsInvalid,
    };

    const cleanup = registerInput(inputRef);
    return cleanup;
  }, [
    inputValue,
    registerInput,
    tsid,
    precision,
    offset,
    order,
    AllowMissingData,
    loadNearest,
    readonly,
    units,
    timeOffset,
    defaultValue,
    required,
    label,
    placeholder,
    inputProps.name,
    disable,
    inputProps.disabled,
  ]); // Include dependencies to update getValues reference

  const handleChange = (e) => {
    const newValue = e.target.value;
    userEdited.current = true;
    setInputValue(newValue);
    if (isInvalid && newValue) {
      setIsInvalid(false);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const cellLoading = isLoadingNearest && !inputValue;
  const tsKey = `${tsid}_${timeOffset || 0}`;
  const valueTs =
    showValueTimestamp && !userEdited.current && loadedTimestamps?.[tsKey]
      ? new Date(loadedTimestamps[tsKey]).toLocaleString("sv-SE").replace("T", " ")
      : null;

  return (
    <Input
      {...inputProps}
      disabled={disable || inputProps.disabled}
      readOnly={readonly || inputProps.readOnly}
      invalid={isInvalid ? "true" : undefined}
      value={inputValue}
      onChange={handleChange}
      required={required}
      placeholder={cellLoading ? "Loading..." : placeholder}
      className={`${inputProps.className || ""} ${cellLoading ? "animate-pulse opacity-60" : ""}`}
      title={valueTs ? `Value from: ${valueTs}` : undefined}
    />
  );
}

export default CWMSInput;
export { CWMSInput };
