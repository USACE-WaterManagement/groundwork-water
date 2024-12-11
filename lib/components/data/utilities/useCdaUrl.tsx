import { useContext } from "react";
import { CdaUrlContext } from "./CdaUrlProvider";

const useCdaUrl = () => {
  return useContext(CdaUrlContext);
};

export { useCdaUrl };
export default useCdaUrl;
