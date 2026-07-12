import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Catalog, GetCatalogWithDatasetRequest } from "cwmsjs";
import { useCdaConfig } from "../helpers/cda";

type LocationCatalogParams = Omit<GetCatalogWithDatasetRequest, "dataset"> & {
  includeAliases?: boolean;
  maxPages?: number;
  searchText?: string;
};

type LocationCatalogResponse = Catalog & {
  "next-page"?: string;
};

interface UseCdaLocationCatalogParams {
  cdaParams: LocationCatalogParams;
  cdaUrl?: string;
  queryOptions?: Partial<UseQueryOptions<Catalog>>;
}

const LOCATION_CATALOG_PARAM_NAMES: Record<string, string> = {
  boundingOfficeLike: "bounding-office-like",
  excludeEmpty: "exclude-empty",
  includeAliases: "include-aliases",
  includeExtents: "include-extents",
  like: "like",
  locationCategoryLike: "location-category-like",
  locationGroupLike: "location-group-like",
  locationKindLike: "location-kind-like",
  locationTypeLike: "location-type-like",
  office: "office",
  page: "page",
  pageSize: "page-size",
  searchText: "search-text",
  unitSystem: "unit-system",
};

function appendCatalogParams(
  searchParams: URLSearchParams,
  params: LocationCatalogParams,
) {
  Object.entries(LOCATION_CATALOG_PARAM_NAMES).forEach(([key, queryName]) => {
    const value = params[key as keyof LocationCatalogParams];
    if (value === null || value === undefined || value === "") return;
    searchParams.set(queryName, String(value));
  });
}

async function fetchLocationCatalogPage({
  basePath,
  headers,
  params,
}: {
  basePath: string;
  headers?: HeadersInit;
  params: LocationCatalogParams;
}) {
  const catalogPath = `${basePath.replace(/\/+$/, "")}/catalog/LOCATIONS`;
  const url =
    typeof window === "undefined"
      ? new URL(catalogPath)
      : new URL(catalogPath, window.location.origin);
  appendCatalogParams(url.searchParams, params);

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Unable to fetch CDA location catalog: ${response.status}`);
  }

  return response.json() as Promise<LocationCatalogResponse>;
}

async function fetchLocationCatalog({
  basePath,
  headers,
  params,
}: {
  basePath: string;
  headers?: HeadersInit;
  params: LocationCatalogParams;
}) {
  const maxPages = params.maxPages ?? 10;
  const pages: LocationCatalogResponse[] = [];
  let page: string | undefined = params.page;

  for (let pageCount = 0; pageCount < maxPages; pageCount += 1) {
    const result = await fetchLocationCatalogPage({
      basePath,
      headers,
      params: { ...params, page },
    });

    pages.push(result);
    page = result.nextPage ?? result["next-page"];
    if (!page) break;
  }

  return {
    ...pages[0],
    entries: pages.flatMap((catalog) => catalog.entries ?? []),
    nextPage: page,
    pageSize: pages[0]?.pageSize,
    total: pages[0]?.total,
  } as Catalog;
}

const useCdaLocationCatalog = ({
  cdaParams,
  cdaUrl,
  queryOptions,
}: UseCdaLocationCatalogParams) => {
  const config = useCdaConfig("v2", cdaUrl);
  const headers = config.headers;

  return useQuery({
    queryKey: ["cda", "location-catalog", config.basePath, cdaParams],
    queryFn: async () =>
      fetchLocationCatalog({
        basePath: config.basePath,
        headers,
        params: cdaParams,
      }),
    ...queryOptions,
  });
};

export { fetchLocationCatalog, useCdaLocationCatalog };
export default useCdaLocationCatalog;
