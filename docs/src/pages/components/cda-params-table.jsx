import ParamsTable from "./params-table";
import { cdaUrlParam, queryOptionsParam } from "./shared-docs";

const CdaParamsTable = ({ requestObject, requestType, cwmsJsType }) => {
  const docsBase =
    "https://hydrologicengineeringcenter.github.io/cwms-data-api-client-javascript/interfaces/";
  const docsUrl = `${docsBase}${cwmsJsType}.html`;
  const hookParams = [
    {
      name: "cdaParams",
      type: "object",
      required: true,
      desc: (
        <>
          Parameters provided to CDA for a {requestObject} {requestType} request. Core
          parameters are listed below. Check the{" "}
          <a href={docsUrl} className="underline">
            cwmsjs documentation
          </a>{" "}
          for a full listing.
        </>
      ),
    },
    cdaUrlParam,
    queryOptionsParam,
  ];

  return <ParamsTable paramsList={hookParams} />;
};

export { CdaParamsTable };
export default CdaParamsTable;
