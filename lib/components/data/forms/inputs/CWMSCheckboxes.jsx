import React, { useEffect, useContext } from "react";
import { Checkboxes } from "@usace/groundwork";
import { FormContext } from "../CWMSForm";

function CWMSCheckboxes({
  // CWMS-specific props
  content = [],
  singleSelect = false, // New prop for single selection mode

  // Checkbox props that need special handling
  onChange,
  required,

  // All other props to pass through (legend, style, etc.)
  ...checkboxesProps
}) {
  const { registerInput } = useContext(FormContext);
  const [selectedId, setSelectedId] = React.useState(null);

  // Register each checkbox item that has a tsid
  useEffect(() => {
    const cleanupFunctions = [];

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
              // In single select mode, only return value if this checkbox is selected
              if (singleSelect) {
                return selectedId === item.id ? [true] : [false];
              }
              // Normal mode: get the current checked state
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
              if (singleSelect) {
                setSelectedId(null);
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
          const cleanup = registerInput(checkboxRef);
          if (cleanup) {
            cleanupFunctions.push(cleanup);
          }
        }
      });
    }

    // Return cleanup function that calls all individual cleanup functions
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [registerInput, content, required, singleSelect, selectedId]);

  // Process content to add CWMS-specific handling
  const processedContent = content.map((item) => {
    // Create a new object with all the original properties
    const processedItem = {
      ...item,
      // Override disabled if readonly or disabled is set at item level
      disabled: item.disabled || item.readonly || item.disable,
      // In single select mode, check if this item is selected
      defaultChecked: singleSelect ? selectedId === item.id : item.defaultChecked,
    };

    // Wrap the original onChange to include CWMS handling if needed
    const originalOnChange = item.onChange;
    processedItem.onChange = (e) => {
      if (singleSelect) {
        // In single select mode, uncheck all others and check only this one
        if (e.target.checked) {
          // Uncheck all other checkboxes
          content.forEach((contentItem) => {
            if (contentItem.id !== item.id) {
              const element = document.getElementById(contentItem.id);
              if (element) {
                element.checked = false;
              }
            }
          });
          setSelectedId(item.id);
        } else {
          setSelectedId(null);
        }
      }

      // Call the original onChange if provided
      if (originalOnChange) {
        originalOnChange(e);
      }

      // Call the parent onChange if provided
      if (onChange) {
        if (singleSelect) {
          // In single select mode, only pass the selected value
          const selectedValue = e.target.checked
            ? item.value || item.label || item.id
            : null;
          onChange(selectedValue ? [selectedValue] : []);
        } else {
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
      }
    };

    return processedItem;
  });

  return <Checkboxes {...checkboxesProps} content={processedContent} />;
}

// Extended checkbox item interface for documentation
// Component props:
// - singleSelect: boolean - When true, only one checkbox can be selected at a time (radio button behavior)
// - All standard Groundwork Checkboxes props (legend, style, etc.)
//
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
