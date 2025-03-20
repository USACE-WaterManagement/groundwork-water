import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "ol/ol.css"; // Import OpenLayers CSS
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import createKmlLayer from "./components/kml-layer";
import { fetchAndCreateLayer } from "./components/projects-cda";
import URLGeneratorLakes from "./components/url-generator-lakes";
import URLGeneratorPrecip from "./components/url-generator-precip";
import { fetchAndCreatePrecipLayer } from "./components/precip";
import PopupContent from "./components/popup-content";
import Overlay from "ol/Overlay";
import TileWMS from "ol/source/TileWMS";
import SidebarControls from "./components/SidebarControls";

const OpenLayersMap = ({
    initialCenter = [-80.97, 38.54],
    initialZoom = 7.5,
    baseLayersConfig,
    layerVisibility,
    defaultBaseLayers = {}
}) => {
    const mapRef = useRef(null); // Reference for the map container
    const [map, setMap] = useState(null);
    const [layers, setLayers] = useState(null)
    const [baseLayers, setBaseLayers] = useState(defaultBaseLayers); // Base layers (OSM, Carto)
    const [kmlLayers, setKmlLayers] = useState({}); // KML layers visibility state
    const [precipLayer, setPrecipLayer] = useState(null); // State for precipitation layer
    const [isPrecipVisible, setIsPrecipVisible] = useState(false); // Visibility state for precip layer
    const mapCenter = fromLonLat([-80.97, 38.54]);
    const popupRef = useRef(null);
    const overlayRef = useRef(null);
    const [popupData, setPopupData] = useState(null);
    const [radarLayer, setRadarLayer] = useState(null); //State for radar layer
    const [isRadarVisible, setIsRadarVisible] = useState(false); // New state for radar layer visibility

    useEffect(() => {
        fetch("/data/map/map.json")
            .then((response) => response.json())
            .then((mapData) => {
                fetch("/data/config.json")
                    .then((response) => response.json())
                    .then((data) => {
                        const generatedUrls = URLGeneratorLakes(mapData, data); // Generate URLs for map data
                        const generatedUrlsPrecip = URLGeneratorPrecip(mapData, data); //generate URLS for precip data
                        setLayers({
                            generatedUrls,
                            generatedUrlsPrecip,
                            config: data,
                            mapData
                        })
                    }
                    );
            });


    }, [])

    // Initialize the map
    useEffect(() => {


        if (!layers && !mapRef.current) return; // Ensure the map container exists

        // Define the base layers
        const osmLayer = new TileLayer({
            source: new OSM(),
            visible: true,
        });

        const cartoLayer = new TileLayer({
            source: new XYZ({
                url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            }),
            visible: false,
        });

        // NOAA Radar WMS Layer
        const radarLayer = new TileLayer({
            source: new TileWMS({
                url: "https://opengeo.ncep.noaa.gov/geoserver/conus/conus_cref_qcd/ows?",
                params: {
                    SERVICE: "WMS",
                    VERSION: "1.3.0",
                    REQUEST: "GetMap",
                    LAYERS: "conus:conus_cref_qcd",
                    FORMAT: "image/png",
                    TRANSPARENT: true,
                },
                serverType: "geoserver",
            }),
            opacity: 0.75, // Adjust opacity
            visible: isRadarVisible, // Bind initial visibility to state
        });

        // Save to state so it can be accessed in the toggle function
        setRadarLayer(radarLayer);



        // Create KML layers
        const kmlLayerList = [
            "bsa",
            "hoc",
            "twe",
            "lsa",
            "lka",
            "mus",
            "sci",
            "ohi",
            "guy",
            "kan",
            "bsa-streams",
            "hoc-streams",
            "twe-streams",
            "lsa-streams",
            "lka-streams",
            "mus-streams",
            "sci-streams",
            "ohi-streams",
            "guy-streams",
            "kan-streams",
        ].reduce((acc, name) => {
            const layer = createKmlLayer(`config/map/kml/${name}.kml`);
            layer.setVisible(true); // Set default visibility to false
            acc[name] = layer;
            return acc;
        }, {});

        const mapInstance = new Map({
            target: mapRef.current,
            layers: [
                osmLayer,
                cartoLayer,
                ...Object.values(kmlLayerList),
                radarLayer,
            ],
            view: new View({
                center: fromLonLat(initialCenter),
                zoom: initialZoom // Initial zoom level
            }),
        });

        setBaseLayers({
            osm: osmLayer,
            carto: cartoLayer,
        });
        setKmlLayers(kmlLayerList); // Save KML layers to state
        setMap(mapInstance);

        // Add precip layer
        const addPrecipLayer = async (precip_urls) => {
            try {
                console.log("Adding precip layer...");
                const [vectorLayerPrecip] = await fetchAndCreatePrecipLayer(precip_urls, layers?.mapData);
                if (vectorLayerPrecip) {
                    vectorLayerPrecip.setVisible(false); // Initially hidden
                    mapInstance.addLayer(vectorLayerPrecip);
                    setPrecipLayer(vectorLayerPrecip); // Save to state
                    console.log("Precipitation layer added successfully");
                } else {
                    console.warn("Precipitation layer not created");
                }
            } catch (error) {
                console.error("Error loading precipitation layer:", error);
            }
        };

        // Fetch data and add additional layers if needed
        const addProjectLayer = async (urls) => {
            const [vectorLayer, projOverlay] = await fetchAndCreateLayer(urls, layers?.mapData);
            if (vectorLayer) {
                mapInstance.addLayer(vectorLayer);
            }

            if (projOverlay) {
                const popupRef = projOverlay["popupRef"];
                const overlay = projOverlay["overlay"];
                let isHoveringPopup = false;



                // Show hover popup on pointermove
                mapInstance.on("pointermove", (event) => {
                    const feature = mapInstance.forEachFeatureAtPixel(
                        event.pixel,
                        (feat) => feat
                    );
                    if (feature && feature.getGeometry().getType() === "Point") {
                        if (!isHoveringPopup) {
                            popupRef.innerHTML = `<strong>${feature.get("name")}</strong>`;
                            overlay.setPosition(event.coordinate);
                            popupRef.style.display = "block";
                        }
                    } else if (!isHoveringPopup) {
                        popupRef.style.display = "none";
                        overlay.setPosition(undefined);
                    }
                });

                popupRef.addEventListener("mouseenter", () => {
                    isHoveringPopup = true;
                });
                popupRef.addEventListener("mouseleave", () => {
                    isHoveringPopup = false;
                });

                mapInstance.addOverlay(overlay);
            }
        };

        console.log("Layers?", { layers });
        if (layers?.generatedUrls) addProjectLayer(layers.generatedUrls);
        if (layers?.generatedUrlsPrecip) addPrecipLayer(layers.generatedUrlsPrecip);

        // Create OpenLayers Overlay
        const overlay = new Overlay({
            element: popupRef.current,
            autoPan: false,
        });
        overlayRef.current = overlay;
        mapInstance.addOverlay(overlay);

        mapInstance.on("singleclick", (event) => {
            const feature = mapInstance.forEachFeatureAtPixel(
                event.pixel,
                (feat) => feat
            );
            if (feature && feature.getGeometry().getType() === "Point") {
                console.log("popup data:", feature);
                setPopupData({
                    feature,
                    coordinate: event.coordinate,
                });
                overlay.setPosition(event.coordinate);
                popupRef.current.style.display = "block";
            }
        });

        return () => {
            mapInstance.setTarget(null); // Cleanup on unmount
        };
    }, [layers]);

    // Handle base layer change
    const handleBaseLayerChange = (layerKey) => {
        Object.entries(baseLayers).forEach(([key, layer]) => {
            layer.setVisible(key === layerKey);
        });
    };

    // Handle KML layer toggle
    const handleKmlLayerToggle = (layerKey) => {
        const layer = kmlLayers[layerKey];
        if (layer) {
            const newVisibility = !layer.getVisible(); // Use OpenLayers' getVisible method
            layer.setVisible(newVisibility); // Use OpenLayers' setVisible method
            setKmlLayers((prevLayers) => ({ ...prevLayers })); // Trigger re-render without modifying layers
        }
    };

    // Handle precipitation layer toggle
    const handlePrecipToggle = () => {
        if (precipLayer) {
            const newVisibility = !isPrecipVisible;
            precipLayer.setVisible(newVisibility);
            setIsPrecipVisible(newVisibility);
        }
    };

    const handleRadarToggle = () => {
        if (radarLayer) {
            const newVisibility = !isRadarVisible;
            radarLayer.setVisible(newVisibility); // Use OpenLayers' setVisible method
            setIsRadarVisible(newVisibility); // Update component state
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "95vw",
                height: "50vh",
            }}
        >
            <SidebarControls baseLayers={baseLayers} layerVisibility={layerVisibility} onLayerToggle={handleBaseLayerChange}
                additionalLayers={
                    [{
                        key: "precip",
                        label: "Precipitation",
                        visibility: isPrecipVisible,
                        onToggle: handlePrecipToggle,
                    },
                    {
                        key: "radar",
                        label: "NOAA Radar",
                        visibility: isRadarVisible,
                        onToggle: handleRadarToggle,
                    }]
                } />

            {/* Sidebar */}

            {/* Map */}
            <div
                ref={mapRef}
                style={{
                    flex: 1,
                    height: "50vh",
                    position: "relative",
                }}
            ></div>
            {/* Popup Container */}
            <div
                ref={popupRef}
                style={{ position: "absolute", display: "none" }}
            ></div>

            {/* React Portal to Inject Popup Content */}

            {popupData &&
                ReactDOM.createPortal(
                    <PopupContent
                        feature={popupData.feature}
                        onClose={() => {
                            setPopupData(null);
                            // overlayRef.current.setPosition(undefined);
                            popupRef.current.style.display = "none";
                        }}
                        config={layers?.config}
                    />,
                    popupRef.current
                )}
        </div>
    );
};

export default OpenLayersMap;
export { OpenLayersMap };
