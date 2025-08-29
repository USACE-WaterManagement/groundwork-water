import React, { useEffect, useState, useContext } from "react";
import { Textarea } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSTextarea({
  style,
  disable,
  invalid,
  name,
  defaultValue,
  value,
  tsid,
  precision,
  offset,
  order,
  AllowMissingData,
  loadNearest,
  readonly,
  units,
  onChange,
  rows,
  timeOffset,
  required,
  label,
  placeholder,
}) {
  const { registerInput } = useContext(FormContext);
  const [textareaValue, setTextareaValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);

  useEffect(() => {
    if (!registerInput) return;

    const textareaRef = {
      name,
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
      label: label || placeholder || name,
      getValues: () => [textareaValue],
      reset: () => setTextareaValue(defaultValue || ""),
      setInvalid: setIsInvalid,
    };

    const cleanup = registerInput(textareaRef);
    return cleanup;
  }, [
    textareaValue,
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
    setTextareaValue(newValue);
    // Clear invalid state when user starts typing
    if (isInvalid && newValue) {
      setIsInvalid(false);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Textarea
      style={style}
      disabled={disable}
      invalid={isInvalid}
      name={name}
      value={textareaValue}
      onChange={handleChange}
      rows={rows}
      readOnly={readonly}
      required={required}
      placeholder={placeholder}
    />
  );
}

export default CWMSTextarea;
export { CWMSTextarea };
