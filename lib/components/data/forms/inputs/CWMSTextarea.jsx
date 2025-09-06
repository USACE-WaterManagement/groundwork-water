import React, { useEffect, useState, useContext } from "react";
import { Textarea } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

function CWMSTextarea({
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

  // Textarea props that need special handling
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
  ...textareaProps
}) {
  const { registerInput } = useContext(FormContext);
  const [textareaValue, setTextareaValue] = useState(defaultValue || value || "");
  const [isInvalid, setIsInvalid] = useState(invalid || false);

  useEffect(() => {
    if (!registerInput) return;

    const textareaRef = {
      name: textareaProps.name,
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
      label: label || placeholder || textareaProps.name,
      getValues: () => [textareaValue],
      reset: () => setTextareaValue(defaultValue || ""),
      setInvalid: setIsInvalid,
    };

    const cleanup = registerInput(textareaRef);
    return cleanup;
  }, [
    textareaValue,
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
    textareaProps.name,
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
      {...textareaProps}
      disabled={disable || textareaProps.disabled}
      readOnly={readonly || textareaProps.readOnly}
      invalid={isInvalid ? "true" : undefined}
      value={textareaValue}
      onChange={handleChange}
      required={required}
    />
  );
}

export default CWMSTextarea;
export { CWMSTextarea };
