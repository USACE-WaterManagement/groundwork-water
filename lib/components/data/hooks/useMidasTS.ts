import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { MIDAS_URL } from "../helpers/midas";

const getMidasProjectTimeSeries = async (
  project: string,
  instrument: string,
): Promise<MidasTimeSeries[]> => {
  const response = await fetch(
    `${MIDAS_URL}/projects/${project}/instruments/${instrument}/timeseries`,
  );
  if (!response.ok) {
    throw new Error("Error retrieving data");
  }
  return await response.json();
};

interface useMidasProjectParams {
  project: string;
  instrument: string;
  queryOptions?: Partial<UseQueryOptions<MidasTimeSeries[]>>;
}

const useMidasProjectTS = ({
  project,
  instrument,
  queryOptions = {},
}: useMidasProjectParams) => {
  return useQuery({
    queryKey: ["midas", project, instrument],
    queryFn: () => getMidasProjectTimeSeries(project, instrument),
    ...queryOptions,
  });
};

interface MidasTimeSeries {
  id: string;
  slug: string;
  name: string;
  type: string;
  is_computed: boolean;
  variable: string;
  instrument_id: string;
  instrument_slug: string;
  instrument: string;
  parameter_id: string;
  parameter: string;
  unit_id: string;
  unit: string;
}

export { useMidasProjectTS };
export default useMidasProjectTS;
