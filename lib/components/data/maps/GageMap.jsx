/* eslint-disable react/prop-types */
// MapComponent.js
import { useEffect, useRef } from "react";
import TileLayer from "ol/layer/Tile";

import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import OSM from "ol/source/OSM";
import "ol/ol.css";

import "../../../css/map.css";
import { gwMerge } from "@usace/groundwork";

function GageMap({ className }) {
  const mapElement = useRef();
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new Map({
      target: mapElement.current,
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(null);
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
