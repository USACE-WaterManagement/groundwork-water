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
}) {
  const { registerInput } = useContext(FormContext);
  const [textareaValue, setTextareaValue] = useState(defaultValue || value || "");

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
      units: units || "EN",
      timeOffset: timeOffset || 0,
      getValues: () => [textareaValue],
      reset: () => setTextareaValue(defaultValue || ""),
    };

    const cleanup = registerInput(textareaRef);
    return cleanup;
  }, []); // Empty dependency array - only register once on mount

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTextareaValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Textarea
      style={style}
      disabled={disable}
      invalid={invalid}
      name={name}
      value={textareaValue}
      onChange={handleChange}
      rows={rows}
      readOnly={readonly}
    />
  );
}

export default CWMSTextarea;
export { CWMSTextarea };
