/* eslint-disable react/prop-types */
// MapComponent.js
import { useEffect, useRef } from 'react';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import "../../../css/map.css"

function GageMap({className}) {
    const mapElement = useRef()
    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })

        const map = new Map({
            target: mapElement.current,
            layers: [osmLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
              }),
          });
      return () => map.setTarget(null)
    }, []);

    return (
      <div id="map" className={`map-container w-full ${className}`} ref={mapElement} />
    //   className="map-container absolute top-0 bottom-0 w-96" 
    );
}

export default GageMap;