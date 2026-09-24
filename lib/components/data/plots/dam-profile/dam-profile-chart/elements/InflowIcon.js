import { straightLine } from "./Lines.js";

const InflowIcon = (svg, inflow) => {
  svg
    .append("g")
    .attr("class", "inflowIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", 320)
    .attr("cy", 60)
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("path")
    .attr(
      "d",
      straightLine([
        [315, 70],
        [315, 100],
        [300, 100],
        [320, 120],
        [340, 100],
        [325, 100],
        [325, 70],
      ]),
    )
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("path")
    .attr(
      "d",
      straightLine([
        [60, 58],
        [320, 58],
        [320, 65],
        [60, 65],
      ]),
    )
    .attr("fill", "#66AAD7");
  svg
    .select("g.inflowIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", 320)
    .attr("dy", 67)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("IN");

  // inflow text label
  svg
    .append("g")
    .attr("class", "inflowLabel")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 350)
    .attr("dy", 65)
    .attr("class", "inflowText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.3em")
    .text(
      inflow !== null && !isNaN(inflow)
        ? inflow?.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          }) + " cfs"
        : "Not Available",
    );
};

export default InflowIcon;
