import { Feature, Overlay } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
// import mapData from "./map.json";
// import projectData from "../../../src/data/json/basin_lakes_15M.min.json";
import { getLastValueIndex, getSeason } from "../../utilities";

// Create Vector Layer with provided data
export const createVectorLayer = (data, mapData) => {
    const vectorSourceProjects = new VectorSource();

    const projectGoodStyle = new Style({
        image: new Icon({
            src: "images/maps/dam-good.png", // Adjust the path if needed
            scale: 0.05,
        }),
    });

    const projectLowAlertStyle = new Style({
        image: new Icon({
            src: "images/maps/dam-low-alert.png", // Adjust the path if needed
            scale: 0.05,
        }),
    });

    const projectLowWarnStyle = new Style({
        image: new Icon({
            src: "images/maps/dam-low-warn.png", // Adjust the path if needed
            scale: 0.05,
        }),
    });

    const projectLDStyle = new Style({
        image: new Icon({
            src: "images/maps/dam-gray.png", // Adjust the path if needed
            scale: 0.05,
        }),
    });

    //First entry in the list is projects. Create icons for each. 
    const projectList = data[0].entries;

    const timeseriesLookupTable = data.slice(1).reduce((acc, item) => {
        acc[item.name] = item.values;
        return acc;
    }, {});

    const curSeason = getSeason();

    projectList.forEach((entry) => {
        const point = new Point(fromLonLat([entry.longitude, entry.latitude]));
        const feature = new Feature(point);

        //get current elev and expected pool to compare to set style
        //get name from CDA call to match lookup array


        const projTimeSeries = entry["name"] + "-Lake.Elev.Inst.15Minutes.0.OBS";
        const projFlow = entry["name"] + "-Lake.Flow.Inst.15Minutes.0.OBS";
        const projOutflow = entry["name"] + "-Outflow.Flow.Inst.15Minutes.0.OBS";


        //If value exists for this project/Elevation
        if (projTimeSeries in timeseriesLookupTable) {
            feature.setStyle(projectLowWarnStyle);
            const projElevIndex = getLastValueIndex(timeseriesLookupTable[projTimeSeries]);
            const projElevLastVal = timeseriesLookupTable[projTimeSeries][projElevIndex][1];
            // console.log(projElevLastVal);
            // const projTargetElev = mapData.lakes.entry["projCode"].levels;
            // console.log(projTargetElev);

            const projObject = mapData.lakes.find(lake => lake.id === entry["name"]);
            // console.log(projObject);
            const seasonalPool = projObject.levels[curSeason + 'Pool'];
            // console.log("seasonal pool is " + seasonalPool);

            if (projElevLastVal < (seasonalPool - 3)) {
                feature.setStyle(projectLowAlertStyle);
                feature.set("layerType", "lake");
            } else if (projElevLastVal < seasonalPool) {
                feature.setStyle(projectLowWarnStyle);
                feature.set("layerType", "lake");
            } else {
                feature.setStyle(projectGoodStyle);
                feature.set("layerType", "lake");
            }
            // console.log(mapData.lakes[entry["name"]]);
            //set paths for Lakes
            feature.set("lakeElevPath", projTimeSeries);
            feature.set("lakeFlowPath", projFlow);
            feature.set("outflowFlow", projOutflow);

        } else {
            feature.setStyle(projectLDStyle);
            feature.set("layerType", "lock");
        }

        // feature.setStyle(projectGoodStyle);
        feature.setId(entry["public-name"]);
        feature.setProperties({ name: entry["public-name"] });

        vectorSourceProjects.addFeature(feature);
    });

    const vL = new VectorLayer({
        source: vectorSourceProjects,
        visible: true,
    });
    console.log({ vL })
    return vL;
};

export const createOverlay = (data) => {
    // Create a ref for the popup element
    const popupRef = document.createElement('div');

    // Style the popup
    popupRef.style.position = 'absolute';
    popupRef.style.backgroundColor = 'white';
    popupRef.style.padding = '5px 10px';
    popupRef.style.border = '1px solid black';
    popupRef.style.borderRadius = '4px';
    popupRef.style.display = 'none';

    // Ensure text stays on one line
    popupRef.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    popupRef.style.overflow = 'hidden';  // Hide overflow
    popupRef.style.textOverflow = 'ellipsis'; // Add '...' if text overflows

    // Set initial content
    popupRef.innerHTML = data || '';

    // Create an OpenLayers overlay
    const overlay = new Overlay({
        element: popupRef,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10], // Adjust as needed
    });

    // Return both the overlay and popup reference for further use
    return { overlay, popupRef };
}

// Fetch Data and Return Vector Layer
//urlArray is an array of all project data that needs pulled back from CDA.
//First item in the URL list should be the project locations query for the district. Used to populate map.
export const fetchAndCreateLayer = async (urlArray, mapData) => {
    try {
        // "https://cwms-data.usace.army.mil/cwms-data/catalog/LOCATIONS?unit-system=EN&office=LRH&location-kind-like=PROJECT",
        const urls = [
            "https://wm.lrh.ds.usace.army.mil:8243/lrh-data/catalog/LOCATIONS?unit-system=EN&office=LRH&location-kind-like=PROJECT",
        ];
        // console.log("CDA URLS", urlArray);
        const urlsForCda = urls.concat(urlArray);
        // console.log('CDA', urlsForCda);

        // Fetch data from both URLs
        const responses = await Promise.all(urlsForCda.map((url) => fetch(url)));
        const jsonData = await Promise.all(
            responses.map((response) => {
                if (!response.ok) throw new Error(`Error fetching: ${response.url}`);
                return response.json();
            })
        );

        // Ensure jsonData is valid and has the expected structure
        if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
            throw new Error("No valid data received from the provided URLs");
        }

        // Combine data entries from both sources
        // const allEntries = jsonData.flatMap((data) => data.entries || []);
        // console.log(jsonData);
        // console.log(allEntries);
        // console.log(responses);

        if (responses.length === 0) {
            throw new Error("No entries found in the fetched data");
        }
        // console.log('responses length', responses.length);

        // Create and return the VectorLayer and Overlay
        // return [createVectorLayer(allEntries), createOverlay(allEntries)];
        // return [createVectorLayer(jsonData[0].entries),createOverlay(jsonData[0].entries)];
        // console.log("Creating VectorLayer and Overlay with data:", jsonData);
        return [createVectorLayer(jsonData, mapData), createOverlay(jsonData[0].entries)];
    } catch (error) {
        console.error("Error fetching data:", error);
        // console.log(jsonData);
        return null; // Return null if there's an error
    }
};
