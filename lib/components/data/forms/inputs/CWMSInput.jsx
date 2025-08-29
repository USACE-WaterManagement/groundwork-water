import React, { useEffect, useState, useContext } from "react";
import { Input } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSInput({
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
  timeOffset,
  required,
  label,
}) {
  const { registerInput } = useContext(FormContext);
  const [inputValue, setInputValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);

  useEffect(() => {
    if (!registerInput) return;

    const inputRef = {
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
      required: required || false,
      label: label || placeholder || name,
      getValues: () => [inputValue],
      reset: () => setInputValue(defaultValue || ""),
      setInvalid: setIsInvalid,
    };

    const cleanup = registerInput(inputRef);
    return cleanup;
  }, [
    inputValue,
    registerInput,
    name,
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
      style={style}
      disabled={disable}
      invalid={isInvalid}
      name={name}
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      readOnly={readonly}
      required={required}
    />
  );
}

export default CWMSInput;
export { CWMSInput };
