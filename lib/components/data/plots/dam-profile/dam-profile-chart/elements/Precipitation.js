import { straightLine } from "./Lines.js";
// import * as d3 from 'd3';
const Precipitation = (svg, precip) => {
  svg
    .append("g")
    .attr("class", "precipitation")
    .append("path")
    .attr("transform", "translate(75,-10)")
    .attr("d", "M25,50 a10,10 0 1,1 0,-20 a15,15 0 0,1 40,0 a10,10 0 1,1 0,20 z")
    .attr("fill", "#58595D");

  svg
    .select("g.precipitation")
    .append("path")
    .attr(
      "d",
      straightLine([
        [100, 40],
        [90, 50],
      ]),
    )
    .attr("stroke", "#66AAD7")
    .attr("stroke-width", 3);
  svg
    .select("g.precipitation")
    .append("path")
    .attr(
      "d",
      straightLine([
        [115, 40],
        [105, 50],
      ]),
    )
    .attr("stroke", "#66AAD7")
    .attr("stroke-width", 3);
  svg
    .select("g.precipitation")
    .append("path")
    .attr(
      "d",
      straightLine([
        [130, 40],
        [120, 50],
      ]),
    )
    .attr("stroke", "#66AAD7")
    .attr("stroke-width", 3);
  // precipitation text label
  svg
    .append("g")
    .attr("class", "precipitationLabel")
    .append("text")
    .attr("text-anchor", "start")
    .attr("x", 107)
    .attr("y", 30)
    .attr("class", "precipText")
    .attr("font-family", "sans-serif")
    .attr("font-size", ".9em")
    .attr("fill", "white")
    .text("24 hr");
  svg
    .append("g")
    .attr("class", "precipitationLabel")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 160)
    .attr("dy", 35)
    .attr("class", "precipText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.3em")
    .text(
      precip !== null && !isNaN(precip)
        ? precip?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }) + " in"
        : "Not Available",
    );
};

export default Precipitation;
