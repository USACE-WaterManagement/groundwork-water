// import { GLOBAL_CONFIG } from "../../../public/config/config";

function getStartDate() {
    var start_date_time = new Date();//returns current date/time

    var dateOffset = (24 * 60 * 60 * 1000);//offset for 24 hours
    start_date_time.setTime(start_date_time - dateOffset);

    //subtract 25 hours in case we do not have latest value.
    //start_date_time.addHours(start_date_time,-25);
    // console.log(start_date_time.toLocaleString());
    // console.log(start_date_time.getFullYear().toString() + "-" + start_date_time.getMonth().toString());

    var start_date_string = start_date_time.getFullYear().toString() + "-" + (start_date_time.getMonth() + 1).toString().padStart(2, '0') +
        "-" + start_date_time.getDate().toString().padStart(2, '0') + "T" + start_date_time.getHours().toString().padStart(2, '0') + ':' + start_date_time.getMinutes().toString().padStart(2, '0') +
        ':' + start_date_time.getSeconds().toString().padStart(2, '0');

    // console.log(start_date_string);

    return start_date_string;
}

const URLGeneratorPrecip = (mapData, config) => {

    //https://cwms-data.usace.army.mil/cwms-data/timeseries?name=AlumCr-Lake.Elev.Inst.15Minutes.0.OBS&office=LRH&unit=EN&timezone=EST5EDT
    //Use these values to iterate and put the project name in between to have the URL for CDA (Lake Elevation)
    //const baseURL = "https://cwms-data.usace.army.mil/cwms-data/timeseries?name=";
    const baseURL = config.cda_base + "/" + config.timeseries_url;
    // const endURL = "-Lake.Elev.Inst.15Minutes.0.OBS&office=LRH&unit=EN&timezone=EST5EDT";
    const endURL = config.precip_append_url;
    const start_date = getStartDate();
    //If a valid NWSID is available use it. If not and we have defined an altname value, use that. Otherwise use name
    const generatedUrls = mapData.precip.map(
        (precip) => `${baseURL}${precip.nwsid !== "None" ? precip.nwsid : precip.altname ? precip.altname : precip.name}${endURL}&begin=${start_date}`
    );

    return generatedUrls;
}

export default URLGeneratorPrecip;