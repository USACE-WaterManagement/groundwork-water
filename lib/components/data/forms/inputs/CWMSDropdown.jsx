import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

function CWMSDropdown({
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

  // Dropdown props that need special handling
  defaultValue,
  value,
  options,
  onChange,
  invalid,
  required,
  placeholder,

  // Legacy prop names
  disable,
  readonly,

  // All other props to pass through
  ...dropdownProps
}) {
  const { registerInput } = useContext(FormContext);
  const [selectedValue, setSelectedValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);

  useEffect(() => {
    if (!registerInput) return;

    const dropdownRef = {
      name: dropdownProps.name,
      tsid,
      precision: precision || 2,
      offset: offset || 0,
      order: order || 1,
      AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
      loadNearest: loadNearest || "prev",
      readonly: readonly || false,
      units: units || "n/a",
      timeOffset: timeOffset || 0,
      required: required || false,
      label: label || placeholder || dropdownProps.name,
      getValues: () => [selectedValue],
      reset: () => setSelectedValue(defaultValue || ""),
      setInvalid: setIsInvalid,
    };

    const cleanup = registerInput(dropdownRef);
    return cleanup;
  }, [
    selectedValue,
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
    dropdownProps.name,
  ]); // Include dependencies to update getValues reference

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    // Clear invalid state when user selects a value
    if (isInvalid && newValue) {
      setIsInvalid(false);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  // Convert options to proper format if needed
  let dropdownOptions = options;
  if (Array.isArray(options) && options.length > 0) {
    if (typeof options[0] === "string") {
      // Convert string array to option elements
      dropdownOptions = [
        placeholder && (
          <option key="placeholder" value="">
            {placeholder}
          </option>
        ),
        ...options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        )),
      ].filter(Boolean);
    } else if (typeof options[0] === "object" && options[0].text !== undefined) {
      // Convert object array to option elements
      dropdownOptions = options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ));
    }
  }

  // Use provided id or fallback to name, ensuring we have a valid id
  const dropdownId =
    dropdownProps.id ||
    dropdownProps.name ||
    `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Dropdown
      {...dropdownProps}
      disabled={disable || readonly || dropdownProps.disabled}
      invalid={isInvalid ? "true" : undefined}
      id={dropdownId}
      value={selectedValue}
      options={dropdownOptions}
      onChange={(e) => handleChange(e.target.value)}
      required={required}
    />
  );
}

export default CWMSDropdown;
export { CWMSDropdown };
