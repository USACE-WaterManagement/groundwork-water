import React, { useEffect, useContext, useState } from "react";
import { RadioGroup } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

function CWMSRadioGroup({
  // CWMS-specific props
  name,
  tsid,
  options = [],
  defaultValue,

  // Radio group props
  onChange,
  required = false,
  readonly = false,
  disable = false,

  // CWMS submission props
  precision = 2,
  offset = 0,
  timeOffset,
  order = 1,
  AllowMissingData = true,
  loadNearest = "prev",
  units = "EN",
  label,

  // All other props to pass through (legend, className, style, etc.)
  ...radioGroupProps
}) {
  const { registerInput } = useContext(FormContext);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  // Register with CWMS form
  useEffect(() => {
    if (!registerInput || !tsid) return;

    const inputRef = {
      name: name || tsid,
      tsid: tsid,
      precision: precision,
      offset: timeOffset ?? offset,
      timeOffset: timeOffset ?? offset,
      order: order,
      AllowMissingData: AllowMissingData,
      loadNearest: loadNearest,
      readonly: readonly,
      units: units,
      required: required,
      label: label || name || tsid,
      getValues: () => {
        return selectedValue ? [selectedValue] : [];
      },
      reset: () => {
        setSelectedValue(defaultValue || "");
        if (onChange) {
          onChange(defaultValue || "");
        }
      },
      setInvalid: (invalid) => {
        // Find the radio group container and set invalid state
        const container = document.querySelector(`[name="${name || tsid}"]`);
        if (container && container.parentElement) {
          if (invalid) {
            container.parentElement.classList.add("invalid");
          } else {
            container.parentElement.classList.remove("invalid");
          }
        }
      },
    };

    const cleanup = registerInput(inputRef);
    return cleanup;
  }, [
    registerInput,
    tsid,
    name,
    selectedValue,
    precision,
    offset,
    timeOffset,
    order,
    AllowMissingData,
    loadNearest,
    readonly,
    units,
    required,
    label,
    defaultValue,
    onChange,
  ]);

  // Handle value changes
  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Process options to match Groundwork RadioGroup API
  // Groundwork expects: content={[{id, text, onClick/onChange}]}
  const processedContent = options.map((option, index) => {
    const optionValue = typeof option === "string" ? option : option.value;
    const optionLabel = typeof option === "string" ? option : option.label;
    const optionId = `${name || tsid}-${index}`;

    return {
      id: optionId,
      text: optionLabel,
      onClick: () => handleChange(optionValue),
      disabled: (typeof option === "object" && option.disabled) || disable || readonly,
    };
  });

  // Find which radio should be checked by default
  const defaultCheckedId = processedContent.find((item, index) => {
    const optionValue =
      typeof options[index] === "string" ? options[index] : options[index].value;
    return optionValue === selectedValue;
  })?.id;

  return (
    <RadioGroup
      {...radioGroupProps}
      key={selectedValue} // Force re-render when value changes
      legend={label}
      content={processedContent}
      defaultChecked={defaultCheckedId}
      className={radioGroupProps.className}
    />
  );
}

// Extended radio group interface for documentation
// Component props:
// - name: string - Input name attribute (defaults to tsid)
// - tsid: string - Time Series ID for CWMS data (required for CWMS submission)
// - options: array - Array of option values (strings) or option objects {value, label}
// - defaultValue: string - Initial selected value
// - onChange: function - Handler for value changes
// - required: boolean - Whether selection is required
// - readonly: boolean - Make radio group read-only
// - disable: boolean - Disable all radio buttons
// - label: string - Label for the radio group
// - legend: string - Legend text for the fieldset
// - className: string - CSS classes
// - style: object - Inline styles
//
// CWMS-specific properties:
// - precision: number - Decimal precision for numeric values (default: 2)
// - offset: number - Time offset in seconds (default: 0)
// - timeOffset: number - Alternative to offset
// - order: number - Sort order (default: 1)
// - AllowMissingData: boolean - Allow missing data points (default: true)
// - loadNearest: string - Load nearest data point strategy (default: "prev")
// - units: string - Unit system (EN/SI) (default: "EN")

export default CWMSRadioGroup;
export { CWMSRadioGroup };
