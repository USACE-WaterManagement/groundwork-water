import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSDropdown({
  style,
  disable,
  invalid,
  id,
  name,
  defaultValue,
  value,
  options,
  tsid,
  precision,
  offset,
  order,
  AllowMissingData,
  loadNearest,
  readonly,
  units,
  onChange,
  placeholder,
  timeOffset,
}) {
  const { registerInput } = useContext(FormContext);
  const [selectedValue, setSelectedValue] = useState(defaultValue || value || "");

  useEffect(() => {
    if (!registerInput) return;

    const dropdownRef = {
      name,
      tsid,
      precision: precision || 2,
      offset: offset || 0,
      order: order || 1,
      AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
      loadNearest: loadNearest || "prev",
      readonly: readonly || false,
      units: units || "EN",
      timeOffset: timeOffset || 0,
      getValues: () => [selectedValue],
      reset: () => setSelectedValue(defaultValue || ""),
    };

    const cleanup = registerInput(dropdownRef);
    return cleanup;
  }, []); // Empty dependency array - only register once on mount

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
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
    id || name || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Dropdown
      style={style}
      disabled={disable || readonly}
      invalid={invalid}
      id={dropdownId}
      name={name}
      value={selectedValue}
      options={dropdownOptions}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default CWMSDropdown;
export { CWMSDropdown };
