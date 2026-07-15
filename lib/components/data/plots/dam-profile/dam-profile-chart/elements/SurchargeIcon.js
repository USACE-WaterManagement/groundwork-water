import { straightLine } from "./Lines.js";

const SurchargeIcon = (svg, surcharge, position = { x: 570, y: 120 }) => {
  // Note: arrow coordinates are relative to the position provided to OutflowIcon
  //       Absolute coordinates for SVG are calculated using position coordinates
  const arrow = [
    [-5, 10],
    [-5, 40],
    [-20, 40],
    [0, 60],
    [20, 40],
    [5, 40],
    [5, 10],
  ];
  svg
    .append("g")
    .attr("class", "surchargeIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", position.x)
    .attr("cy", position.y)
    .attr("fill", "#66AAD7");

  svg
    .select("g.surchargeIcon")
    .append("path")
    .attr(
      "d",
      straightLine(
        arrow.map((point) => [point[0] + position.x, point[1] + position.y]),
      ),
    )
    .attr("fill", "#66AAD7");
  svg
    .select("g.surchargeIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", 570)
    .attr("dy", 126)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("SUR");

  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 605)
    .attr("dy", 124)
    .attr("class", "surchargeText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(!isNaN(surcharge) ? surcharge + " cfs" : "");
};

export default SurchargeIcon;
