import { useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Configuration, TextTimeSeriesApi, TimeSeriesApi } from "cwmsjs";
import { AuthContext } from "../utilities/auth/AuthContext";
import useCdaUrl from "../utilities/useCdaUrl";
import {
  classifyCwmsDataUploadRows,
  filterCwmsDataUploadRows,
} from "../forms/helpers/dataUpload";

function useCwmsDataUpload({
  model,
  filter = "all",
  cdaUrl,
  unit = "ft",
  loadExistingData = true,
  onDeleteSuccess,
  onDeleteError,
} = {}) {
  const providedCdaUrl = useCdaUrl();
  const resolvedCdaUrl = cdaUrl ?? providedCdaUrl;
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const config = useMemo(() => {
    const headers = { accept: "application/json;version=2" };
    if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
    return new Configuration({
      basePath: resolvedCdaUrl,
      headers,
      credentials: "include",
    });
  }, [auth?.token, resolvedCdaUrl]);

  const timeSeriesApi = useMemo(() => new TimeSeriesApi(config), [config]);
  const textTimeSeriesApi = useMemo(() => new TextTimeSeriesApi(config), [config]);
  const queryKey = [
    "cda",
    "data-upload",
    model?.office,
    model?.tsid,
    model?.begin,
    model?.end,
    unit,
  ];

  const existingQuery = useQuery({
    queryKey,
    enabled: Boolean(
      loadExistingData && model?.office && model?.tsid && model?.begin && model?.end,
    ),
    queryFn: async () => {
      try {
        return await timeSeriesApi.getTimeSeries({
          name: model.tsid,
          office: model.office,
          begin: model.begin,
          end: model.end,
          unit,
          timezone: "UTC",
          pageSize: 1000000,
        });
      } catch (error) {
        if (error?.response?.status === 404) {
          return {
            name: model.tsid,
            officeId: model.office,
            units: unit,
            values: [],
          };
        }
        throw error;
      }
    },
  });

  const classifiedRows = useMemo(
    () =>
      classifyCwmsDataUploadRows(model?.rows || [], existingQuery.data?.values || []),
    [existingQuery.data?.values, model?.rows],
  );
  const filteredRows = useMemo(
    () => filterCwmsDataUploadRows(classifiedRows, filter),
    [classifiedRows, filter],
  );

  const deleteMutation = useMutation({
    mutationFn: async (rows) => {
      if (!rows?.length) throw new Error("Select at least one row to delete.");

      const groups = new Map();
      rows.forEach((row) => {
        const key = `${row.office}|${row.tsid}`;
        const current = groups.get(key) || {
          office: row.office,
          tsid: row.tsid,
          begin: row.timestamp,
          end: row.timestamp,
          hasNumeric: false,
          hasText: false,
        };
        if (row.epoch < new Date(current.begin).getTime())
          current.begin = row.timestamp;
        if (row.epoch > new Date(current.end).getTime()) current.end = row.timestamp;
        current.hasNumeric ||= row.value !== null && row.value !== undefined;
        current.hasText ||= Boolean(row.textValue);
        groups.set(key, current);
      });

      const operations = [];
      groups.forEach((group) => {
        if (group.hasNumeric) {
          operations.push(
            timeSeriesApi.deleteTimeSeriesWithTimeSeries({
              timeseries: group.tsid,
              office: group.office,
              begin: group.begin,
              end: group.end,
              timezone: "UTC",
              startTimeInclusive: true,
              endTimeInclusive: true,
              overrideProtection: true,
            }),
          );
        }
        if (group.hasText) {
          operations.push(
            textTimeSeriesApi.deleteTimeSeriesTextWithName({
              name: group.tsid,
              office: group.office,
              textMask: "*",
              begin: group.begin,
              end: group.end,
              timezone: "UTC",
            }),
          );
        }
      });
      await Promise.all(operations);
      return { deletedRows: rows.length, operations: operations.length };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey });
      onDeleteSuccess?.(result);
    },
    onError: onDeleteError,
  });

  return {
    classifiedRows,
    filteredRows,
    existingData: existingQuery.data,
    isLoadingExisting: existingQuery.isLoading || existingQuery.isFetching,
    existingError: existingQuery.error,
    refreshExisting: existingQuery.refetch,
    deleteRows: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}

export { useCwmsDataUpload };
export default useCwmsDataUpload;
