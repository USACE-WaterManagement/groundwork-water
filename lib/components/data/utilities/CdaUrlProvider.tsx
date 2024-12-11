import { createContext, PropsWithChildren } from "react";

interface CdaUrlProviderProps {
  url: string;
}

const CdaUrlContext = createContext<string | undefined>(undefined);

const CdaUrlProvider = ({
  url,
  children,
}: PropsWithChildren<CdaUrlProviderProps>) => {
  return (
    <CdaUrlContext.Provider value={url}>{children}</CdaUrlContext.Provider>
  );
};

export { CdaUrlContext, CdaUrlProvider };
export default CdaUrlProvider;
