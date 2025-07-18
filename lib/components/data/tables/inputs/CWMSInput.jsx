import React, { useEffect, useState, useContext } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

export function CWMSInput({
  style,
  disable,
  invalid,
  name,
  defaultValue,
  value,
  type,
  placeholder,
  tsid,
  precision,
  offset,
  order,
  AllowMissingData,
  loadNearest,
  readonly,
  onChange,
  units,
}) {
  const { registerInput } = useContext(FormContext);
  const [inputValue, setInputValue] = useState(defaultValue || value || "");

  const inputRef = {
    tsid,
    precision: precision || 2,
    offset: timeoffset || 0,
    order: order || 1,
    AllowMissingData: true,
    loadNearest: "prev",
    readonly: false,
    units: units || "EN",
    getValues: () => [inputValue],
    reset: () => setInputValue(defaultValue || ""),
  };

  useEffect(() => {
    registerInput(inputRef);
  }, [registerInput]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Input
      style={style}
      disabled={disable}
      invalid={invalid}
      name={name}
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      readOnly={readonly}
    />
  );
}
