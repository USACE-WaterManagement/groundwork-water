import { Feature, Overlay } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
// import mapData from "./map.json";
// import { GLOBAL_CONFIG } from "../../../public/config/config";

// function get24HrPrecip(loc_name) {
//   const proj_url = loc_name + GLOBAL_CONFIG.precip_append_url;
// }

export const createPrecipVectorLayer = (data, precipData) => {
    console.log({ data, precipData })

    // console.log("precip", data.precip);
    const vectorSourcePrecip = new VectorSource();

    const precipNoneStyle = new Style({
        image: new Icon({
            src: "images/maps/marker-precip-off.png", // Adjust the path if needed
            scale: 0.3,
        }),
    });
    const missingPrecipMarker = new Style({
        image: new Icon({
            src: "images/maps/marker-question.png", // Adjust the path if needed
            scale: 0.3,
        }),
    });

    //   const precipNotDetectedMarker = new Style({
    //     image: new Icon({
    //       src: "images/maps/marker-precip-off.png", // Adjust the path if needed
    //       scale: 0.3,
    //     }),
    //   });
    //   const precipDetectedMarker = new Style({
    //     image: new Icon({
    //       src: "images/maps/marker-precip-on.png", // Adjust the path if needed
    //       scale: 0.3,
    //     }),
    //   });
    //   const precipDetectedMediumMarker = new Style({
    //     image: new Icon({
    //       src: "images/maps/marker-precip-medium.png", // Adjust the path if needed
    //       scale: 0.3,
    //     }),
    //   });
    const precipDetectedHighMarker = new Style({
        image: new Icon({
            src: "images/maps/marker-precip-high.png", // Adjust the path if needed
            scale: 0.3,
        }),
    });

    // console.log("Fetched precipitation data:", data.precip);

    const precipGageList = data.precip;
    // console.log(precipGageList);
    if (!Array.isArray(precipGageList)) {
        console.error("precipGageList is not an array", precipGageList);
        return;
    }

    precipGageList.forEach((entry) => {
        const point = new Point(fromLonLat([entry.longitude, entry.latitude]));
        const feature = new Feature(point);
        const precipPath =
            entry["name"].replace(/[\(\) ]/g, "") +
            ".Precip.Total.15Minutes.15Minutes.OBS";
        //removing (,)," " characters in location name to fix Columbus (Scioto) issue

        // get24HrPrecip(entry["name"]);
        // console.log(precipPath, precipData[precipPath].values);
        if (precipData[precipPath]?.values) {
            feature.setStyle(precipNoneStyle);
        } else if (precipData[precipPath])
            feature.setStyle(precipDetectedHighMarker);
        else {
            feature.setStyle(missingPrecipMarker);
        }
        // feature.setStyle(precipNoneStyle);
        feature.setId(entry["name"]);
        feature.setProperties({ name: entry["name"] });
        feature.setProperties({ usgsid: entry["usgsid"] });
        feature.set("layerType", "precip");
        feature.set("precipPath", precipPath);

        vectorSourcePrecip.addFeature(feature);
        // console.log("precip gage", entry["name"]);
    });

    const vectorLayerPrecip = new VectorLayer({
        source: vectorSourcePrecip,
        visible: true,
    });

    return vectorLayerPrecip;
};

export const fetchAndCreatePrecipLayer = async (urlArray, mapData) => {
    // console.log("map data", mapData);
    // console.log("Precip URLS", urlArray);

    // Fetch data from all precip URLS
    const responses = await Promise.all(urlArray.map((url) => fetch(url)));
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

    console.log("precip data", jsonData);

    // const precipData = jsonData.reduce((acc, item) => {
    //   acc[item.name] = item;
    // });

    const precipValues = jsonData.reduce((acc, user) => {
        acc[user.name] = user;
        return acc;
    }, {});
    console.log("dictionary entry", precipValues);
    // console.log(precipData);
    console.log("map data", mapData);
    // return [createPrecipVector(mapData),createOverlay(mapData)];
    return [createPrecipVectorLayer(mapData, precipValues), null];
};
