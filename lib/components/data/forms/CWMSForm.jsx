import React, { createContext, useContext, useRef } from "react";
import { TimeSeriesApi } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

const FormContext = createContext();

export function FormWrapper({ office, unit = "EN", cdaUrl, children }) {
  const inputsRef = useRef([]);
  const config = useCdaConfig("v2", cdaUrl);
  const ts_api = new TimeSeriesApi(config);

  const registerInput = (input) => {
    inputsRef.current.push(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const input of inputsRef.current) {
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
  };

  const handleReset = () => {
    inputsRef.current.forEach((input) => {
      input.reset();
    });
  };

  return (
    <FormContext.Provider value={{ registerInput }}>
      <form onSubmit={handleSubmit}>
        {children}
        <button onClick={handleReset} type="reset">
          Reset
        </button>
        <button type="submit">Submit</button>
      </form>
    </FormContext.Provider>
  );
}
