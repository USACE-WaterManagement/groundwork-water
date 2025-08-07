import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSDropdown({
  style,
  disable,
  invalid,
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
}) {
  const { registerInput } = useContext(FormContext);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || value || ""
  );

  const dropdownRef = {
    tsid,
    precision: precision || 2,
    offset: offset || 0,
    order: order || 1,
    AllowMissingData: AllowMissingData !== undefined ? AllowMissingData : true,
    loadNearest: loadNearest || "prev",
    readonly: readonly || false,
    units: units || "EN",
    getValues: () => [selectedValue],
    reset: () => setSelectedValue(defaultValue || ""),
  };

  useEffect(() => {
    if (registerInput) {
      registerInput(dropdownRef);
    }
  }, [registerInput]);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Convert options to proper format if needed
  let dropdownOptions = options;
  if (Array.isArray(options) && options.length > 0) {
    if (typeof options[0] === 'string') {
      // Convert string array to option elements
      dropdownOptions = [
        placeholder && <option key="placeholder" value="">{placeholder}</option>,
        ...options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))
      ].filter(Boolean);
    } else if (typeof options[0] === 'object' && options[0].text !== undefined) {
      // Convert object array to option elements
      dropdownOptions = options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ));
    }
  }

  return (
    <Dropdown
      style={style}
      disabled={disable || readonly}
      invalid={invalid}
      name={name}
      value={selectedValue}
      options={dropdownOptions}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default CWMSDropdown;
export { CWMSDropdown };