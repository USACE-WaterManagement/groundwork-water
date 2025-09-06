import React, { useEffect, useState, useContext } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

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

  // Legacy prop names
  disable,
  readonly,

  // All other props to pass through
  ...inputProps
}) {
  const { registerInput } = useContext(FormContext);
  const [inputValue, setInputValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);

  useEffect(() => {
    if (!registerInput) return;

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
      reset: () => setInputValue(defaultValue || ""),
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
  ]); // Include dependencies to update getValues reference

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Clear invalid state when user starts typing
    if (isInvalid && newValue) {
      setIsInvalid(false);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Input
      {...inputProps}
      disabled={disable || inputProps.disabled}
      readOnly={readonly || inputProps.readOnly}
      invalid={isInvalid ? "true" : undefined}
      value={inputValue}
      onChange={handleChange}
      required={required}
    />
  );
}

export default CWMSInput;
export { CWMSInput };
