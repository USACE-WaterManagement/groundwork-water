// import { GLOBAL_CONFIG } from "../../../public/config/config";

const URLGeneratorLakes = (mapData, config) => {
    //https://cwms-data.usace.army.mil/cwms-data/timeseries?name=AlumCr-Lake.Elev.Inst.15Minutes.0.OBS&office=LRH&unit=EN&timezone=EST5EDT
    //Use these values to iterate and put the project name in between to have the URL for CDA (Lake Elevation)
    //const baseURL = "https://cwms-data.usace.army.mil/cwms-data/timeseries?name=";
    const baseURL = config.cda_base + "/" + config.timeseries_url;
    // const endURL = "-Lake.Elev.Inst.15Minutes.0.OBS&office=LRH&unit=EN&timezone=EST5EDT";
    const endURL = config.lake_append_url;
    const generatedUrls = mapData.lakes.map(
        (lake) => `${baseURL}${lake.id}${endURL}`
    );

    return generatedUrls;
}

export default URLGeneratorLakes;