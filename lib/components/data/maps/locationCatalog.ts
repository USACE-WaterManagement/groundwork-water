interface CdaLocationCatalogEntry {
  active?: boolean;
  aliases?: Array<{ name?: string; value?: string }>;
  boundingOffice?: string;
  kind?: string;
  latitude?: number;
  longitude?: number;
  mapLabel?: string;
  name?: string;
  publicName?: string;
  publishedLatitude?: number;
  publishedLongitude?: number;
  type?: string;
  [key: string]: unknown;
}

interface LocationFeatureOptions {
  statusValueAccessor?: (entry: CdaLocationCatalogEntry) => number | null | undefined;
  typeAccessor?: (entry: CdaLocationCatalogEntry) => string | undefined;
}

function getLocationCatalogCoordinates(entry: CdaLocationCatalogEntry) {
  const longitude = entry.publishedLongitude ?? entry.longitude;
  const latitude = entry.publishedLatitude ?? entry.latitude;

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return null;

  return [Number(longitude), Number(latitude)];
}

function locationCatalogToFeatureCollection(
  entries: CdaLocationCatalogEntry[] = [],
  options: LocationFeatureOptions = {},
) {
  const features = entries
    .map((entry) => {
      const coordinates = getLocationCatalogCoordinates(entry);
      if (!coordinates) return null;

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates,
        },
        properties: {
          ...entry,
          id: entry.name,
          label: entry.mapLabel ?? entry.publicName ?? entry.name,
          locationType: options.typeAccessor?.(entry) ?? entry.type ?? entry.kind,
          statusValue: options.statusValueAccessor?.(entry),
        },
      };
    })
    .filter(Boolean);

  return {
    type: "FeatureCollection",
    features,
  };
}

export { getLocationCatalogCoordinates, locationCatalogToFeatureCollection };
