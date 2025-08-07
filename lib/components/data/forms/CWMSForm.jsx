import React, { createContext, useContext, useRef } from "react";
import { TimeSeriesApi } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

export const FormContext = createContext();

export function FormWrapper({ 
  office, 
  unit = "EN", 
  cdaUrl, 
  children,
  onSubmit,
  onReset,
  submitText = "Submit",
  resetText = "Reset",
  showButtons = true,
  className = "",
  style
}) {
  const inputsRef = useRef([]);
  const config = useCdaConfig("v2", cdaUrl);
  const ts_api = new TimeSeriesApi(config);

  const registerInput = (input) => {
    inputsRef.current.push(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all form data
    const formData = inputsRef.current.map(input => ({
      tsid: input.tsid,
      values: input.getValues(),
      units: input.units,
      precision: input.precision,
      offset: input.offset,
      order: input.order,
    }));

    // Call custom onSubmit if provided
    if (onSubmit) {
      await onSubmit(formData, e);
    } else {
      // Default submit behavior - send to CWMS
      for (const input of inputsRef.current) {
        if (input.tsid) {
          try {
            const response = await ts_api.postTimeSeries({
              timeSeries: {
                name: input.tsid,
                officeId: office,
                values: input.getValues(),
                units: input.units,
              },
            });
            const result = await response.json();
            console.log("API result:", result);
          } catch (err) {
            console.error("API call failed:", err);
          }
        }
      }
    }
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    
    inputsRef.current.forEach((input) => {
      if (input.reset) {
        input.reset();
      }
    });

    // Call custom onReset if provided
    if (onReset) {
      onReset(e);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    ...style
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  };

  return (
    <FormContext.Provider value={{ registerInput }}>
      <form 
        onSubmit={handleSubmit} 
        className={className}
        style={formStyle}
      >
        {children}
        {showButtons && (
          <div style={buttonContainerStyle}>
            <button
              onClick={handleReset}
              type="button"
              style={{
                minWidth: '100px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6b7280';
              }}
            >
              {resetText}
            </button>
            <button
              type="submit"
              style={{
                minWidth: '100px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              {submitText}
            </button>
          </div>
        )}
      </form>
    </FormContext.Provider>
  );
}