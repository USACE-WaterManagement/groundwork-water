import { straightLine } from "./Lines.js";

const WaterLevel = (svg, damScale, waterLevel) => {
  svg.append("g").attr("class", "water-level");
  // water level line
  svg
    .select("g.water-level")
    .append("path")
    .attr(
      "d",
      straightLine([
        [247, damScale(waterLevel)],
        [247, 560],
        [409, 560],
        [409, damScale(waterLevel)],
      ]),
    )
    .attr("fill", "#DCF1F9");
  // water level label (e.g. 12')
  svg
    .select("g.water-level")
    .append("text")
    .attr("text-anchor", "start")
    .attr("dx", 250)
    .attr("dy", damScale(waterLevel) + 20)
    .attr("fill", "#666666")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .text(function () {
      return waterLevel + "'";
    });
};

export default WaterLevel;
