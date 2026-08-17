//====================================================
// SETUP
//====================================================

console.log("UTILS ====================================================");

const currentUrl = window.location.href;
console.log("currentUrl: ", currentUrl);

const isMvsPublic = currentUrl.includes("/office/mvs") || currentUrl.includes("https://www.mvs-wc.usace.army.mil/");
console.log("isMvsPublic: ", isMvsPublic);

const urlParams = new URLSearchParams(window.location.search);

let basin = urlParams.get('basin') || 'Mississippi';
console.log("basin: ", basin);

let selectedBasin = urlParams.get('basin') || "Mississippi";
console.log('selectedBasin: ', selectedBasin);

let ts = urlParams.get('ts');
console.log("ts: ", ts);

const tsids = Array.from({ length: 50 }, (_, i) =>
    urlParams.get(`tsid${i + 1}`)
);

tsids[0] ||= 'St Louis-Mississippi.Stage.Inst.30Minutes.0.lrgsShef-rev';

const [
    tsid1, tsid2, tsid3, tsid4, tsid5, tsid6, tsid7, tsid8, tsid9, tsid10,
    tsid11, tsid12, tsid13, tsid14, tsid15, tsid16, tsid17, tsid18, tsid19, tsid20,
    tsid21, tsid22, tsid23, tsid24, tsid25, tsid26, tsid27, tsid28, tsid29, tsid30,
    tsid31, tsid32, tsid33, tsid34, tsid35, tsid36, tsid37, tsid38, tsid39, tsid40,
    tsid41, tsid42, tsid43, tsid44, tsid45, tsid46, tsid47, tsid48, tsid49, tsid50
] = tsids;

tsids.forEach((v, i) => console.log(`tsid${i + 1}:`, v));

console.log("UTILS ====================================================");

let office = urlParams.get('office') || "MVS";
console.log("office: ", office);

let type = urlParams.get('type');
console.log("type: ", type);

let id = urlParams.get('id');
console.log("id: ", id);

let lake = urlParams.get('lake');
console.log('lake: ', lake);

let widget = urlParams.get('widget');
console.log('widget: ', widget);

let report = urlParams.get('report');
console.log('report: ', report);

if (lake === 'Lk Shelbyville' || lake === 'Lk Shelbyville-Kaskaskia') {
    basin = 'Kaskaskia';
} else if (lake === "Carlyle Lk" || lake === "Carlyle Lk-Kaskaskia") {
    basin = 'Kaskaskia';
} else if (lake === "Mark Twain Lk" || lake === "Mark Twain Lk-Salt") {
    basin = 'Salt';
} else if (lake === "Rend Lk" || lake === "Rend Lk-Big Muddy") {
    basin = 'Big Muddy';
} else if (lake === "Wappapello Lk" || lake === "Wappapello Lk-St Francis") {
    basin = 'St Francis';
}

let begin = urlParams.get('begin');
console.log("begin: ", begin);

let begin_2 = urlParams.get('begin_2');
console.log('begin_2: ', begin_2);

let end = urlParams.get('end');
console.log("end: ", end);

let end_2 = urlParams.get('end_2');
console.log('end_2: ', end_2);

let top10 = urlParams.get('top10');
console.log('top10: ', top10);

const documentRoot = window.location.protocol + "//" + window.location.host;
console.log("documentRoot: ", documentRoot);

let cdaDefault = null;
if (documentRoot === `https://wm.mvs.ds.usace.army.mil`) {
    cdaDefault = "internal";
} else if (documentRoot === `https://wm-mvscoop.mvk.ds.usace.army.mil`) {
    cdaDefault = "coop";
} else if (documentRoot === `https://water-mgt.dev.cwbi.us`) {
    cdaDefault = "dev";
} else if (documentRoot === `https://water-mgt.test.cwbi.us`) {
    cdaDefault = "test";
} else if (documentRoot === `https://water-mgt.cwbi.us`) {
    cdaDefault = "prod";
} else if (documentRoot === `http://localhost:5173`) {
    cdaDefault = "local";
} else if (documentRoot === `https://water.dev.cwbi.us`) {
    cdaDefault = "public-dev";
} else if (documentRoot === `https://water.test.cwbi.us`) {
    cdaDefault = "public-test";
} else if (documentRoot === `https://water.usace.army.mil`) {
    cdaDefault = "public-prod";
} else if (documentRoot === `https://www.mvs-wc.usace.army.mil`) {
    cdaDefault = "public";
} else {
    cdaDefault = "public";
}
console.log("cdaDefault: ", cdaDefault);

let cda = urlParams.get('cda') || cdaDefault;
console.log("cda: ", cda);

let php = urlParams.get('php') || "false";
console.log('php: ', php);

let json = urlParams.get('json') || "true";
console.log('json: ', json);

let wq = urlParams.get('wq') || "false";
console.log('wq: ', wq);

let gage = urlParams.get('gage');
console.log('gage: ', gage);

let gage_2 = urlParams.get('gage_2');
console.log('gage_2: ', gage_2);

let type_flow = urlParams.get('type_flow');
console.log('type_flow: ', type_flow);

let datetime = urlParams.get('datetime') || formatDate(new Date());
console.log('datetime: ', datetime);

let loading = urlParams.get('loading');
console.log("loading: ", loading);

let edit = urlParams.get('edit') || 'false';
console.log('edit: ', edit);

let shef = urlParams.get('shef');
console.log("shef: ", shef);

let group = urlParams.get('group') || "MVS";
console.log('group: ', group);

let days = urlParams.get('days');
console.log('days: ', days);

let display_tributary = urlParams.get('display_tributary') || 'False';
console.log('display_tributary: ', display_tributary);

let display_type = urlParams.get('display_type') || 'FloodStage';
console.log('display_type: ', display_type);

let owner = urlParams.get('owner');
console.log('owner: ', owner);

let test = urlParams.get('test');
console.log('test: ', test);

let template_id = urlParams.get('template_id');
console.log('template_id: ', template_id);

let version_id = urlParams.get('version_id');
console.log('version_id: ', version_id);

let rating_id = urlParams.get('rating_id');
console.log('rating_id: ', rating_id);

let usgsLoc = urlParams.get('usgsLoc');
console.log('usgsLoc: ', usgsLoc);

let isDataEntry = window.location.href.includes("data-entry");
console.log('isDataEntry: ', isDataEntry);

let isReports = window.location.href.includes("reports");
console.log('isReports: ', isReports);

function formatDate(date) {
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
    let day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    let year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

function parseDate(str) {
    // Assumes format MM-DD-YYYY
    let [month, day, year] = str.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day)); // Local time, no ambiguity
}

let baseDate = parseDate(datetime);

let nextDate = new Date(baseDate);
nextDate.setDate(nextDate.getDate() + 1);

let prevDate = new Date(baseDate);
prevDate.setDate(prevDate.getDate() - 1);

let nextDay = urlParams.get('nextDay') || formatDate(nextDate);
console.log('nextDay:', nextDay);

let prevDay = urlParams.get('prevDay') || formatDate(prevDate);
console.log('prevDay:', prevDay);

let lookback = urlParams.get('lookback');
console.log('lookback: ', lookback);

let lookforward = urlParams.get('lookforward') || '0';
console.log("lookforward: ", lookforward);

let dateObj = new Date();
let hours = String(dateObj.getHours()).padStart(2, '0');
console.log('hours: ', hours);

let minutes = String(dateObj.getMinutes()).padStart(2, '0');
console.log('minutes: ', minutes);

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth <= 768;

console.log("Is this site viewed on mobile?", isMobile);

let setBaseUrl = null;
let setBaseUrlPort = null;
if (cda === "internal") {
    setBaseUrl = `https://wm.mvs.ds.usace.army.mil/mvs-data`;

    setBaseUrlPort = `https://wm.mvs.ds.usace.army.mil:8243/mvs-data`;
} else if (cda === "coop") {
    setBaseUrl = `https://wm-mvscoop.mvk.ds.usace.army.mil/mvs-data`;

    setBaseUrlPort = `https://wm-mvscoop.mvk.ds.usace.army.mil:8243/mvs-data`;
} else if (cda === "dev") {
    setBaseUrl = `https://water.dev.cwbi.us/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
} else if (cda === "test") {
    setBaseUrl = `https://cwms-data-test.cwbi.us/cwms-data`;

    setBaseUrlPort = `https://cwms-data-test.cwbi.us:8243/cwms-data`;
} else if (cda === "prod") {
    setBaseUrl = `https://cwms-data.usace.army.mil/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
} else if (cda === "public") {
    setBaseUrl = `https://cwms-data.usace.army.mil/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
} else if (cda === "public-dev") {
    setBaseUrl = `https://cwms-data.usace.army.mil/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
} else if (cda === "local") {
    setBaseUrl = `https://cwms-data.usace.army.mil/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
} else {
    setBaseUrl = `https://cwms-data.usace.army.mil/cwms-data`;

    setBaseUrlPort = `https://cwms-data.usace.army.mil:8243/cwms-data`;
}
console.log("setBaseUrl: ", setBaseUrl);
console.log("setBaseUrlPort: ", setBaseUrlPort);

//====================================================
// DATETIME
//====================================================

console.log("UTILS ====================================================");

// Today Date Time
const [month, day, year] = datetime.split('-');

const [monthTomorrow, dayTomorrow, yearTomorrow] = nextDay.split('-');
const [monthYesterday, dayYesterday, yearYesterday] = prevDay.split('-');

// Generate ISO strings for special past days
const isoDateMinus200Years = getIsoDateWithOffsetDynamic((year - 200), month, day, 0);
console.log("isoDateMinus200Years:", isoDateMinus200Years);
let dstOffsetHoursMinus200Years = (new Date(isoDateMinus200Years)).getUTCHours();
console.log(`dstOffsetHoursMinus200Years: ${dstOffsetHoursMinus200Years} hours`);

const isoDateMinus50Years = getIsoDateWithOffsetDynamic((year - 50), month, day, 0);
console.log("isoDateMinus50Years:", isoDateMinus50Years);
let dstOffsetHoursMinus50Years = (new Date(isoDateMinus50Years)).getUTCHours();
console.log(`dstOffsetHoursMinus50Years: ${dstOffsetHoursMinus50Years} hours`);

const isoDateMinus20Years = getIsoDateWithOffsetDynamic((year - 20), month, day, 0);
console.log("isoDateMinus20Years:", isoDateMinus20Years);
let dstOffsetHoursMinus20Years = (new Date(isoDateMinus20Years)).getUTCHours();
console.log(`dstOffsetHoursMinus20Years: ${dstOffsetHoursMinus20Years} hours`);

const isoDateMinus10Years = getIsoDateWithOffsetDynamic((year - 10), month, day, 0);
console.log("isoDateMinus10Years:", isoDateMinus10Years);
let dstOffsetHoursMinus10Years = (new Date(isoDateMinus10Years)).getUTCHours();
console.log(`dstOffsetHoursMinus10Years: ${dstOffsetHoursMinus10Years} hours`);

const isoDateMinus5Years = getIsoDateWithOffsetDynamic((year - 5), month, day, 0);
console.log("isoDateMinus5Years:", isoDateMinus5Years);
let dstOffsetHoursMinus5Years = (new Date(isoDateMinus5Years)).getUTCHours();
console.log(`dstOffsetHoursMinus5Years: ${dstOffsetHoursMinus5Years} hours`);

const isoDateMinus2Years = getIsoDateWithOffsetDynamic((year - 2), month, day, 0);
console.log("isoDateMinus2Years:", isoDateMinus2Years);
let dstOffsetHoursMinus2Years = (new Date(isoDateMinus2Years)).getUTCHours();
console.log(`dstOffsetHoursMinus2Years: ${dstOffsetHoursMinus2Years} hours`);

const isoDateMinus720Days = getIsoDateWithOffsetDynamic(year, month, day, -720);
console.log("isoDateMinus720Days:", isoDateMinus720Days);
let dstOffsetHoursMinus720 = (new Date(isoDateMinus720Days)).getUTCHours();
console.log(`dstOffsetHoursMinus720: ${dstOffsetHoursMinus720} hours`);

const isoDateMinus365Days = getIsoDateWithOffsetDynamic(year, month, day, -365);
console.log("isoDateMinus365Days:", isoDateMinus365Days);
let dstOffsetHoursMinus365 = (new Date(isoDateMinus365Days)).getUTCHours();
console.log(`dstOffsetHoursMinus365: ${dstOffsetHoursMinus365} hours`);

const isoDateMinus40Days = getIsoDateWithOffsetDynamic(year, month, day, -40);
console.log("isoDateMinus40Days:", isoDateMinus40Days);
let dstOffsetHoursMinus40 = (new Date(isoDateMinus40Days)).getUTCHours();
console.log(`dstOffsetHoursMinus40: ${dstOffsetHoursMinus40} hours`);

const isoDateMinus35Days = getIsoDateWithOffsetDynamic(year, month, day, -35);
console.log("isoDateMinus35Days:", isoDateMinus35Days);
let dstOffsetHoursMinus35 = (new Date(isoDateMinus35Days)).getUTCHours();
console.log(`dstOffsetHoursMinus35: ${dstOffsetHoursMinus35} hours`);

const isoDateMinus30Days = getIsoDateWithOffsetDynamic(year, month, day, -30);
console.log("isoDateMinus30Days:", isoDateMinus30Days);
let dstOffsetHoursMinus30 = (new Date(isoDateMinus30Days)).getUTCHours();
console.log(`dstOffsetHoursMinus30: ${dstOffsetHoursMinus30} hours`);

const isoDateMinus27Days = getIsoDateWithOffsetDynamic(year, month, day, -27);
console.log("isoDateMinus27Days:", isoDateMinus27Days);
let dstOffsetHoursMinus27 = (new Date(isoDateMinus27Days)).getUTCHours();
console.log(`dstOffsetHoursMinus27: ${dstOffsetHoursMinus27} hours`);

const isoDateMinus14Days = getIsoDateWithOffsetDynamic(year, month, day, -14);
console.log("isoDateMinus14Days:", isoDateMinus14Days);
let dstOffsetHoursMinus14 = (new Date(isoDateMinus14Days)).getUTCHours();
console.log(`dstOffsetHoursMinus14: ${dstOffsetHoursMinus14} hours`);

// Generate ISO strings and Offset for the previous 8 days
const isoDateMinus8Days = getIsoDateWithOffsetDynamic(year, month, day, -8);
console.log("isoDateMinus8Days:", isoDateMinus8Days);
let dstOffsetHoursMinus8 = (new Date(isoDateMinus8Days)).getUTCHours();
console.log(`dstOffsetHoursMinus8: ${dstOffsetHoursMinus8} hours`);

const isoDateMinus7Days = getIsoDateWithOffsetDynamic(year, month, day, -7);
console.log("isoDateMinus7Days:", isoDateMinus7Days);
let dstOffsetHoursMinus7 = (new Date(isoDateMinus7Days)).getUTCHours();
console.log(`dstOffsetHoursMinus7: ${dstOffsetHoursMinus7} hours`);

const isoDateMinus6Days = getIsoDateWithOffsetDynamic(year, month, day, -6);
console.log("isoDateMinus6Days:", isoDateMinus6Days);
let dstOffsetHoursMinus6 = (new Date(isoDateMinus6Days)).getUTCHours();
console.log(`dstOffsetHoursMinus6: ${dstOffsetHoursMinus6} hours`);

const isoDateMinus5Days = getIsoDateWithOffsetDynamic(year, month, day, -5);
console.log("isoDateMinus5Days:", isoDateMinus5Days);
let dstOffsetHoursMinus5 = (new Date(isoDateMinus5Days)).getUTCHours();
console.log(`dstOffsetHoursMinus5: ${dstOffsetHoursMinus5} hours`);

const isoDateMinus4Days = getIsoDateWithOffsetDynamic(year, month, day, -4);
console.log("isoDateMinus4Days:", isoDateMinus4Days);
let dstOffsetHoursMinus4 = (new Date(isoDateMinus4Days)).getUTCHours();
console.log(`dstOffsetHoursMinus4: ${dstOffsetHoursMinus4} hours`);

const isoDateMinus3Days = getIsoDateWithOffsetDynamic(year, month, day, -3);
console.log("isoDateMinus3Days:", isoDateMinus3Days);
let dstOffsetHoursMinus3 = (new Date(isoDateMinus3Days)).getUTCHours();
console.log(`dstOffsetHoursMinus3: ${dstOffsetHoursMinus3} hours`);

const isoDateMinus2Days = getIsoDateWithOffsetDynamic(year, month, day, -2);
console.log("isoDateMinus2Days:", isoDateMinus2Days);
let dstOffsetHoursMinus2 = (new Date(isoDateMinus2Days)).getUTCHours();
console.log(`dstOffsetHoursMinus2: ${dstOffsetHoursMinus2} hours`);

const isoDateMinus1Day = getIsoDateWithOffsetDynamic(year, month, day, -1);
console.log("isoDateMinus1Day:", isoDateMinus1Day);
let dstOffsetHoursMinus1 = (new Date(isoDateMinus1Day)).getUTCHours();
console.log(`dstOffsetHoursMinus1: ${dstOffsetHoursMinus1} hours`);

console.log("UTILS ====================================================");

// Today
const isoDateToday = getIsoDateWithOffsetDynamic(year, month, day, 0);
console.log("isoDateToday:", isoDateToday);
let dstOffsetHours = (new Date(isoDateToday)).getUTCHours();
console.log(`dstOffsetHours: ${dstOffsetHours} hours`);

// Check if selected day is today
const isTodayCurrentDate =
    isoDateToday.substring(0, 10) === new Date().toISOString().substring(0, 10);

console.log("isTodayCurrentDate:", isTodayCurrentDate);

// Today 6AM
const isoDateToday6AM = convertTo6AMCST(getIsoDateWithOffsetDynamic(year, month, day, 0), 6);
console.log("isoDateToday6AM:", isoDateToday6AM);
let dstOffsetHours6AM = (new Date(isoDateToday6AM)).getUTCHours();
console.log(`dstOffsetHours6AM: ${dstOffsetHours6AM} hours`);

// Today 8AM
const isoDateToday8AM = convertTo6AMCST(getIsoDateWithOffsetDynamic(year, month, day, 0), 8);
console.log("isoDateToday8AM:", isoDateToday8AM);
let dstOffsetHours8AM = (new Date(isoDateToday8AM)).getUTCHours();
console.log(`dstOffsetHours8AM: ${dstOffsetHours8AM} hours`);

// Now
const isoDateNow = new Date().toISOString();
console.log("isoDateNow:", isoDateNow);
let dstOffsetHoursNow = new Date(isoDateNow).getUTCHours();
console.log(`dstOffsetHoursNow: ${dstOffsetHoursNow} hours`);

console.log("UTILS ====================================================");

// Generate ISO strings and Offset for the next 8 days
const isoDateDay1 = getIsoDateWithOffsetDynamic(year, month, day, 1);
console.log("isoDateDay1:", isoDateDay1);
let dstOffsetHours1 = (new Date(isoDateDay1)).getUTCHours();
console.log(`dstOffsetHours1: ${dstOffsetHours1} hours`);

const isoDateDay2 = getIsoDateWithOffsetDynamic(year, month, day, 2);
console.log("isoDateDay2:", isoDateDay2);
let dstOffsetHours2 = (new Date(isoDateDay2)).getUTCHours();
console.log(`dstOffsetHours2: ${dstOffsetHours2} hours`);

const isoDateDay3 = getIsoDateWithOffsetDynamic(year, month, day, 3);
console.log("isoDateDay3:", isoDateDay3);
let dstOffsetHours3 = (new Date(isoDateDay3)).getUTCHours();
console.log(`dstOffsetHours3: ${dstOffsetHours3} hours`);

const isoDateDay4 = getIsoDateWithOffsetDynamic(year, month, day, 4);
console.log("isoDateDay4:", isoDateDay4);
let dstOffsetHours4 = (new Date(isoDateDay4)).getUTCHours();
console.log(`dstOffsetHours4: ${dstOffsetHours4} hours`);

const isoDateDay5 = getIsoDateWithOffsetDynamic(year, month, day, 5);
console.log("isoDateDay5:", isoDateDay5);
let dstOffsetHours5 = (new Date(isoDateDay5)).getUTCHours();
console.log(`dstOffsetHours5: ${dstOffsetHours5} hours`);

const isoDateDay6 = getIsoDateWithOffsetDynamic(year, month, day, 6);
console.log("isoDateDay6:", isoDateDay6);
let dstOffsetHours6 = (new Date(isoDateDay6)).getUTCHours();
console.log(`dstOffsetHours6: ${dstOffsetHours6} hours`);

const isoDateDay7 = getIsoDateWithOffsetDynamic(year, month, day, 7);
console.log("isoDateDay7:", isoDateDay7);
let dstOffsetHours7 = (new Date(isoDateDay7)).getUTCHours();
console.log(`dstOffsetHours7: ${dstOffsetHours7} hours`);

const isoDateDay8 = getIsoDateWithOffsetDynamic(year, month, day, 8);
console.log("isoDateDay8:", isoDateDay8);
let dstOffsetHours8 = (new Date(isoDateDay8)).getUTCHours();
console.log(`dstOffsetHours8: ${dstOffsetHours8} hours`);

const isoDateDay9 = getIsoDateWithOffsetDynamic(year, month, day, 9);
console.log("isoDateDay9:", isoDateDay9);
let dstOffsetHours9 = (new Date(isoDateDay9)).getUTCHours();
console.log(`dstOffsetHours9: ${dstOffsetHours9} hours`);

const isoDateDay10 = getIsoDateWithOffsetDynamic(year, month, day, 10);
console.log("isoDateDay10:", isoDateDay10);
let dstOffsetHours10 = (new Date(isoDateDay10)).getUTCHours();
console.log(`dstOffsetHours10: ${dstOffsetHours10} hours`);

const isoDateDay11 = getIsoDateWithOffsetDynamic(year, month, day, 11);
console.log("isoDateDay11:", isoDateDay11);
let dstOffsetHours11 = (new Date(isoDateDay11)).getUTCHours();
console.log(`dstOffsetHours11: ${dstOffsetHours11} hours`);

const isoDateDay12 = getIsoDateWithOffsetDynamic(year, month, day, 12);
console.log("isoDateDay12:", isoDateDay12);
let dstOffsetHours12 = (new Date(isoDateDay12)).getUTCHours();
console.log(`dstOffsetHours12: ${dstOffsetHours12} hours`);

const isoDateDay13 = getIsoDateWithOffsetDynamic(year, month, day, 13);
console.log("isoDateDay13:", isoDateDay13);
let dstOffsetHours13 = (new Date(isoDateDay13)).getUTCHours();
console.log(`dstOffsetHours13: ${dstOffsetHours13} hours`);

const isoDateDay14 = getIsoDateWithOffsetDynamic(year, month, day, 14);
console.log("isoDateDay14:", isoDateDay14);
let dstOffsetHours14 = (new Date(isoDateDay14)).getUTCHours();
console.log(`dstOffsetHours14: ${dstOffsetHours14} hours`);

const isoDateDay15 = getIsoDateWithOffsetDynamic(year, month, day, 15);
console.log("isoDateDay15:", isoDateDay15);
let dstOffsetHours15 = (new Date(isoDateDay15)).getUTCHours();
console.log(`dstOffsetHours15: ${dstOffsetHours15} hours`);

const isoDateDay16 = getIsoDateWithOffsetDynamic(year, month, day, 16);
console.log("isoDateDay16:", isoDateDay16);
let dstOffsetHours16 = (new Date(isoDateDay16)).getUTCHours();
console.log(`dstOffsetHours16: ${dstOffsetHours16} hours`);

const isoDateDay30 = getIsoDateWithOffsetDynamic(year, month, day, 30);
console.log("isoDateDay30:", isoDateDay30);
let dstOffsetHours30 = (new Date(isoDateDay30)).getUTCHours();
console.log(`dstOffsetHours30: ${dstOffsetHours30} hours`);

console.log(`dstOffsetHours: ${dstOffsetHours} hours`);
let DST = null;
if (dstOffsetHours === 6) {
    DST = false;
} else if (dstOffsetHours === 5) {
    DST = true;
}
console.log("DST: ", DST);

console.log("UTILS ====================================================");

// ==========================================
// For Type = 28
// ==========================================

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let todayDayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const WEDNESDAY = 3;

// Check if today is Wednesday
let isTodayWednesday = todayDayOfWeek === WEDNESDAY;
console.log('isTodayWednesday: ', isTodayWednesday);

// Calculate last Wednesday
let daysSinceWednesday = (todayDayOfWeek + 7 - WEDNESDAY) % 7;
if (daysSinceWednesday === 0) daysSinceWednesday = 7; // if today is Wednesday, last Wednesday = 7 days ago

let lastWednesday = new Date(dateObj);
lastWednesday.setDate(lastWednesday.getDate() - daysSinceWednesday);

// Calculate this Wednesday
let daysUntilWednesday = (WEDNESDAY - todayDayOfWeek + 7) % 7;

let thisWednesday = new Date(dateObj);
thisWednesday.setDate(thisWednesday.getDate() + daysUntilWednesday);

// Next Wednesdays
let datetimeLastWednesday = formatDate(lastWednesday);
let datetimeThisWednesday = formatDate(thisWednesday);
let datetimeWeek1Wednesday = formatDate(addDays(thisWednesday, 7));
let datetimeWeek2Wednesday = formatDate(addDays(thisWednesday, 14));
let datetimeWeek3Wednesday = formatDate(addDays(thisWednesday, 21));
let datetimeWeek4Wednesday = formatDate(addDays(thisWednesday, 28));
let datetimeWeek5Wednesday = formatDate(addDays(thisWednesday, 35));
let datetimeWeek6Wednesday = formatDate(addDays(thisWednesday, 42));
let datetimeWeek7Wednesday = formatDate(addDays(thisWednesday, 49));

console.log('datetimeLastWednesday: ', datetimeLastWednesday);
console.log('datetimeThisWednesday: ', datetimeThisWednesday);
console.log('datetimeWeek1Wednesday: ', datetimeWeek1Wednesday);
console.log('datetimeWeek2Wednesday: ', datetimeWeek2Wednesday);
console.log('datetimeWeek3Wednesday: ', datetimeWeek3Wednesday);
console.log('datetimeWeek4Wednesday: ', datetimeWeek4Wednesday);
console.log('datetimeWeek5Wednesday: ', datetimeWeek5Wednesday);
console.log('datetimeWeek6Wednesday: ', datetimeWeek6Wednesday);
console.log('datetimeWeek7Wednesday: ', datetimeWeek7Wednesday);

const datetimeLastWednesdayISO = getIsoDateWithOffsetDynamic(datetimeLastWednesday.split('-')[2], datetimeLastWednesday.split('-')[0], datetimeLastWednesday.split('-')[1], 0);
console.log("datetimeLastWednesdayISO :", datetimeLastWednesdayISO);

const datetimeWeek1WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek1Wednesday.split('-')[2], datetimeWeek1Wednesday.split('-')[0], datetimeWeek1Wednesday.split('-')[1], 0);
console.log("datetimeWeek1WednesdayISO:", datetimeWeek1WednesdayISO);

const datetimeThisWednesdayISO = getIsoDateWithOffsetDynamic(datetimeThisWednesday.split('-')[2], datetimeThisWednesday.split('-')[0], datetimeThisWednesday.split('-')[1], 0);
console.log("datetimeThisWednesdayISO:", datetimeThisWednesdayISO);

const datetimeWeek2WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek2Wednesday.split('-')[2], datetimeWeek2Wednesday.split('-')[0], datetimeWeek2Wednesday.split('-')[1], 0);
console.log("datetimeWeek2WednesdayISO:", datetimeWeek2WednesdayISO);

const datetimeWeek3WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek3Wednesday.split('-')[2], datetimeWeek3Wednesday.split('-')[0], datetimeWeek3Wednesday.split('-')[1], 0);
console.log("datetimeWeek3WednesdayISO:", datetimeWeek3WednesdayISO);

const datetimeWeek4WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek4Wednesday.split('-')[2], datetimeWeek4Wednesday.split('-')[0], datetimeWeek4Wednesday.split('-')[1], 0);
console.log("datetimeWeek4WednesdayISO:", datetimeWeek4WednesdayISO);

const datetimeWeek5WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek5Wednesday.split('-')[2], datetimeWeek5Wednesday.split('-')[0], datetimeWeek5Wednesday.split('-')[1], 0);
console.log("datetimeWeek5WednesdayISO:", datetimeWeek5WednesdayISO);

const datetimeWeek6WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek6Wednesday.split('-')[2], datetimeWeek6Wednesday.split('-')[0], datetimeWeek6Wednesday.split('-')[1], 0);
console.log("datetimeWeek6WednesdayISO:", datetimeWeek6WednesdayISO);

const datetimeWeek7WednesdayISO = getIsoDateWithOffsetDynamic(datetimeWeek7Wednesday.split('-')[2], datetimeWeek7Wednesday.split('-')[0], datetimeWeek7Wednesday.split('-')[1], 0);
console.log("datetimeWeek7WednesdayISO:", datetimeWeek7WednesdayISO);

let stageDateTime = null;
if (isTodayWednesday) {
    stageDateTime = datetimeThisWednesdayISO;
} else {
    stageDateTime = datetimeLastWednesdayISO;
}
console.log("stageDateTime:", stageDateTime);

let view28DaysAnyway = urlParams.get('view28DaysAnyway') || "false";
console.log('view28DaysAnyway: ', view28DaysAnyway);

console.log("UTILS ====================================================");


function getIsoDateWithOffsetDynamic(year, month, day, offset) {
    // Create base UTC date first
    const date = new Date(Date.UTC(year, month - 1, day, 6, 0, 0, 0));

    // Adjust for the offset in days FIRST
    date.setUTCDate(date.getUTCDate() + offset);

    // Now detect DST for the target day, not today
    const chicagoParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        timeZoneName: 'short'
    }).formatToParts(date);

    const tzName = chicagoParts.find(part => part.type === 'timeZoneName')?.value;

    if (tzName === 'CDT') {
        date.setUTCHours(5); // DST
    } else {
        date.setUTCHours(6); // Standard
    }

    return date.toISOString();
}

function convertTo6AMCST(isoDateToday, offsetHour) {
    // Parse the input date
    let date = new Date(isoDateToday);

    // Add 6 hours (6 * 60 * 60 * 1000 ms)
    date = new Date(date.getTime() + offsetHour * 60 * 60 * 1000);

    // Return the new ISO string
    return date.toISOString();
}

function viewData(widgetId, lake, datetime) {
    // Define the URL to open in a new tab
    let url = null;
    if (cda === "internal" || cda === "coop") {
        url = `${documentRoot}/mvs/lake/widget_${widgetId}_test.html?office=MVS&lake=${lake}&datetime=${datetime}`;
    } else {
        if (isReports) {
            url = `${documentRoot}/mvs/reports/lake?office=MVS&lake=${lake}&datetime=${datetime}&widget=${widgetId}`;
        } else if (isDataEntry) {
            url = `${documentRoot}/mvs/data-entry/lake?office=MVS&lake=${lake}&datetime=${datetime}&widget=${widgetId}`;
        }
    }
    // Open the URL in a new tab
    window.open(url, '_blank');
}

function showMainSpinner(outputDiv, widget, message = null) {
    if (!outputDiv) return;

    // prevent duplicate spinner
    if (document.getElementById(`loadingMainSpinner-${widget}`)) return;

    const wrapper = document.createElement("div");
    wrapper.id = `loadingMainSpinner-${widget}`;
    wrapper.style.textAlign = "center";
    wrapper.style.padding = "20px";

    // =========================
    // Spinner Image
    // =========================
    const spinner = document.createElement("img");

    if (cda === "internal" || cda === "coop") {
        spinner.src = `/mvs/lake/images/loading4.gif`;
    } else if (cda === "dev" || cda === "test" || cda === "prod") {
        spinner.src = `/mvs/lake/images/loading4.gif`;
    } else if (cda === "public") {
        spinner.src = `/mvs/lake/images/loading4.gif`;
    } else if (cda === "local") {
        if (isMvsPublic === true) {
            spinner.src = `/office/mvs/images/loading4.gif`;
        } else if (isReports === true) {
            spinner.src = `/mvs/reports/public/images/loading4.gif`;
        } else if (isDataEntry === true) {
            spinner.src = `/mvs/data-entry/public/images/loading4.gif`;
        }

    } else if (cda === "public-dev" || cda === "public-test" || cda === "public-prod") {
        spinner.src = `/office/mvs/images/loading4.gif`;
    }

    spinner.className = "loading-main-spinner";
    spinner.style.display = "block";
    spinner.style.margin = "0 auto";

    wrapper.appendChild(spinner);

    // =========================
    // Optional Message
    // =========================
    if (message) {
        const text = document.createElement("div");
        text.textContent = message;

        text.style.marginTop = "12px";
        text.style.padding = "10px 14px";
        text.style.backgroundColor = "#fff3cd";  // light warning yellow
        text.style.border = "1px solid #ffeeba";
        text.style.borderRadius = "6px";
        text.style.color = "#856404";
        text.style.fontWeight = "600";
        text.style.fontSize = "14px";
        text.style.fontFamily = "Arial, sans-serif";
        text.style.display = "inline-block";
        text.style.textAlign = "center";

        wrapper.appendChild(text);
    }

    outputDiv.appendChild(wrapper);
}

function hideMainSpinner(widget) {
    const spinner = document.getElementById(`loadingMainSpinner-${widget}`);
    if (spinner) spinner.remove();
}

function convertUTCToCST_MMDDYYYY_HHMM(isoString) {
    const date = new Date(isoString);

    const options = {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(date);

    const lookup = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return `${lookup.month}-${lookup.day}-${lookup.year} ${lookup.hour}:${lookup.minute}`;
}

function convertCSTToUTC_MMDDYYYY_HHMM(cstString) {
    const [datePart, timePart] = cstString.split(' ');
    const [month, day, year] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    // Create a date string in the format YYYY-MM-DDTHH:mm
    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00`;

    // Create a Date object from the formatted date (in local timezone)
    const localDate = new Date(formattedDate);

    // Convert it to UTC using toISOString
    return localDate.toISOString();
}

function showCDANotice(element, cda) {
    const isCoop = cda === "coop";

    const link = isCoop
        ? "https://wm.mvs.ds.usace.army.mil/mvs/index/index.html"
        : "https://wm-mvscoop.mvk.ds.usace.army.mil/mvs/index/index.html";

    const label = isCoop ? "T7" : "COOP";

    element.innerHTML = `
        <div style="
            text-align:center;
            padding:12px;
            color:#ff4500 !important;
            font-weight:bold;
            border:1px solid #ff4500;
            background:#fff5f2;
            border-radius:4px;
        ">
            No data available or server is down.
            <a href="${link}" style="color:#ff4500 !important; text-decoration:underline;">
                Switch to ${label}
            </a>.
            If the issue persists, contact the Data Manager.
        </div>
    `;
}