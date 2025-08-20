import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { NWPS_URL } from "../helpers/nwps";
import { GaugeGetStageFlowAllResponse } from "../../../types/nwps";

const getNwpsGaugeData = async (sid: string, product: string) => {
  let fullUrl = NWPS_URL + `/v1/gauges/${sid}/stageflow`;
  if (product == "observed" || product == "forecast") fullUrl += `/${product}`;
  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error("Error retrieving data");
  }
  return response.json();
};

interface useNwpsGaugeDataParams {
  sid: string;
  product: string;
  queryOptions: Partial<UseQueryOptions<GaugeGetStageFlowAllResponse>>;
}

const useNwpsGaugeData = ({ sid, product, queryOptions }: useNwpsGaugeDataParams) => {
  return useQuery({
    queryKey: ["nwps", "gauge", sid, "data", `${product}`],
    queryFn: async () => {
      return getNwpsGaugeData(sid, product);
    },
    ...queryOptions,
  });
};

export { useNwpsGaugeData };
export default useNwpsGaugeData;
