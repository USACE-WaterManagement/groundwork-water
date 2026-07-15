/* eslint-disable react/prop-types */
// MapComponent.js
import { useEffect, useRef } from "react";
import { gwMerge } from "@usace/groundwork";

function GageMap({ className }) {
  const mapElement = useRef();
  useEffect(() => {
    let map;
    let cancelled = false;

    async function renderMap() {
      const [
        { default: TileLayer },
        { default: Map },
        { default: View },
        { default: OSM },
      ] = await Promise.all([
        import("ol/layer/Tile"),
        import("ol/Map"),
        import("ol/View"),
        import("ol/source/OSM"),
      ]);

      if (cancelled || !mapElement.current) {
        return;
      }

      const osmLayer = new TileLayer({
        preload: Infinity,
        source: new OSM(),
      });

      map = new Map({
        target: mapElement.current,
        layers: [osmLayer],
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
      });
    }

    renderMap();

    return () => {
      cancelled = true;
      map?.setTarget(null);
    };
  }, []);

  return (
    <div
      id="map"
      className={gwMerge("map-container gww-w-full", className)}
      ref={mapElement}
    />
    //   className="map-container absolute top-0 bottom-0 w-96"
  );
}

export default GageMap;
