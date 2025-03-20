export function getSeason() {
  var today = new Date();
  var summer_start = new Date("April 15, " + today.getFullYear().toString());
  var summer_end = new Date("November 30, " + today.getFullYear().toString());

  //to prevent the season from switching to Winter on Nov 30th, set the hour
  summer_end.setHours(24);

  var season = "";

  if (
    today.valueOf() >= summer_start.valueOf() &&
    today.valueOf() <= summer_end.valueOf()
  ) {
    season = "summer";
  } else {
    season = "winter";
  }

  return season;
}

export function getLastValueIndex(dataArray) {
  //Some null values are returned for recent missing data.
  //Find and return the index for the most recent value
  let arraySize = dataArray.length - 1;
  if (arraySize < 1) {
    return 0;
  }
  while (arraySize > 0) {
    if (!dataArray[arraySize][1]) {
      arraySize = arraySize - 1;
    } else {
      return arraySize;
    }
  }
  return 0;
}
