import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { NWPS_URL } from "../helpers/nwps";
import { GaugeGauge } from "../../../types/nwps";

const getNwpsGauge = async (sid: string) => {
  const response = await fetch(NWPS_URL + `/v1/gauges/${sid}`);
  if (!response.ok) {
    throw new Error("Error retrieving data");
  }
  const gaugeData: Promise<GaugeGauge> = response.json();
  return gaugeData;
};

interface useNwpsGaugeParams {
  sid: string;
  queryOptions: Partial<UseQueryOptions<GaugeGauge>>;
}

const useNwpsGauge = ({ sid, queryOptions }: useNwpsGaugeParams) => {
  return useQuery({
    queryKey: ["nwps", "gauge", sid],
    queryFn: async () => {
      return getNwpsGauge(sid);
    },
    ...queryOptions,
  });
};

export { useNwpsGauge };
export default useNwpsGauge;
