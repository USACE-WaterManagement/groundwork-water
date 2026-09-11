import { describe, expect, it } from "vitest";

import {
  getLocationCatalogCoordinates,
  locationCatalogToFeatureCollection,
} from "../locationCatalog";

describe("location catalog map helpers", () => {
  it("prefers published coordinates and omits entries without coordinates", () => {
    const entries = [
      {
        kind: "PROJECT",
        latitude: 1,
        longitude: 2,
        name: "TEST",
        publicName: "Test Project",
        publishedLatitude: 35.5,
        publishedLongitude: -96.5,
      },
      { name: "MISSING" },
    ];

    expect(getLocationCatalogCoordinates(entries[0])).toEqual([-96.5, 35.5]);
    expect(locationCatalogToFeatureCollection(entries)).toEqual({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-96.5, 35.5] },
          properties: {
            ...entries[0],
            id: "TEST",
            label: "Test Project",
            locationType: "PROJECT",
            statusValue: undefined,
          },
        },
      ],
    });
  });

  it("supports application-specific status and type accessors", () => {
    const result = locationCatalogToFeatureCollection(
      [{ latitude: 35, longitude: -96, name: "TEST", type: "SITE" }],
      {
        statusValueAccessor: () => 75,
        typeAccessor: () => "reservoir",
      },
    );

    expect(result.features[0]?.properties).toMatchObject({
      locationType: "reservoir",
      statusValue: 75,
    });
  });
});
