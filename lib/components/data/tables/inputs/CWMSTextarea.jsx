import React, { useEffect, useState, useContext } from "react";
import { Textarea } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

export function CWMSTextarea({
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
  onChange,
  rows,
}) {
  const { registerInput } = useContext(FormContext);
  const [textareaValue, setTextareaValue] = useState(
    defaultValue || value || ""
  );

  const textareaRef = {
    tsid,
    precision: precision || 2,
    offset: timeoffset || 0,
    order: order || 1,
    AllowMissingData: AllowMissingData || true,
    loadNearest: loadNearest || "prev",
    readonly: readonly || false,
    units: units || "EN",
    getValues: () => [textareaValue],
    reset: () => setTextareaValue(defaultValue || ""),
  };

  useEffect(() => {
    registerInput(textareaRef);
  }, [registerInput]);

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
    />
  );
}
