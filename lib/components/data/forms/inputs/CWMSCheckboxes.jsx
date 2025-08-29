import React, { useEffect, useContext } from "react";
import { Checkboxes } from "@usace/groundwork";
import { FormContext } from "../../forms/CWMSForm";

function CWMSCheckboxes({ style, legend, content = [], onChange, required }) {
  const { registerInput } = useContext(FormContext);

  // Register each checkbox item that has a tsid
  useEffect(() => {
    if (registerInput) {
      content.forEach((item) => {
        if (item.tsid) {
          const checkboxRef = {
            name: item.id || item.label,
            tsid: item.tsid,
            precision: item.precision || 2,
            offset: item.offset || 0,
            order: item.order || 1,
            AllowMissingData:
              item.AllowMissingData !== undefined ? item.AllowMissingData : true,
            loadNearest: item.loadNearest || "prev",
            readonly: item.readonly || false,
            units: item.units || "n/a",
            required: item.required || required || false,
            label: item.label || item.id,
            getValues: () => {
              // Get the current checked state
              const element = document.getElementById(item.id);
              return element ? [element.checked] : [false];
            },
            reset: () => {
              const element = document.getElementById(item.id);
              if (element) {
                element.checked = item.defaultChecked || false;
                // Trigger onChange if provided
                if (item.onChange) {
                  item.onChange({ target: element });
                }
              }
            },
            setInvalid: (invalid) => {
              const element = document.getElementById(item.id);
              if (element && element.parentElement) {
                if (invalid) {
                  element.parentElement.classList.add("invalid");
                } else {
                  element.parentElement.classList.remove("invalid");
                }
              }
            },
          };
          registerInput(checkboxRef);
        }
      });
    }
  }, [registerInput, content, required]);

  // Process content to add CWMS-specific handling
  const processedContent = content.map((item) => {
    // Create a new object with all the original properties
    const processedItem = {
      ...item,
      // Override disabled if readonly or disabled is set at item level
      disabled: item.disabled || item.readonly || item.disable,
    };

    // Wrap the original onChange to include CWMS handling if needed
    if (item.onChange) {
      const originalOnChange = item.onChange;
      processedItem.onChange = (e) => {
        // Call the original onChange
        originalOnChange(e);

        // Call the parent onChange if provided
        if (onChange) {
          // Collect all checked values
          const checkedValues = content
            .filter((contentItem) => {
              if (contentItem.id === item.id) {
                return e.target.checked;
              }
              const element = document.getElementById(contentItem.id);
              return element ? element.checked : false;
            })
            .map(
              (contentItem) => contentItem.value || contentItem.label || contentItem.id,
            );

          onChange(checkedValues);
        }
      };
    }

    return processedItem;
  });

  return <Checkboxes style={style} legend={legend} content={processedContent} />;
}

// Extended checkbox item interface for documentation
// Each item in content array can have:
// - All standard Groundwork checkbox properties:
//   - id: string (required) - Unique identifier
//   - label: string - Display label
//   - description: string - Additional description text
//   - defaultChecked: boolean - Initial checked state
//   - onChange: function - Handler for changes
//   - disabled: boolean - Disabled state
//   - inputProps: object - Props for the input element
//   - labelProps: object - Props for the label element
//
// - Additional CWMS properties:
//   - tsid: string - Time series ID for CWMS data
//   - value: string - Value when checked (defaults to label or id)
//   - readonly: boolean - Make checkbox read-only
//   - disable: boolean - Alias for disabled
//   - precision: number - Decimal precision for numeric values
//   - offset: number - Time offset in seconds
//   - order: number - Sort order
//   - AllowMissingData: boolean - Allow missing data points
//   - loadNearest: string - Load nearest data point strategy
//   - units: string - Unit system (EN/SI)

export default CWMSCheckboxes;
export { CWMSCheckboxes };
