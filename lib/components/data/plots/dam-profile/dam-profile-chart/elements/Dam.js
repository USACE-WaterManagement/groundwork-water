import { straightLine } from "./Lines.js";

const Dam = (svg) => {
  svg.append("g").attr("class", "dam");
  // Dam Embankment
  svg
    .select("g.dam")
    .append("path")
    .attr(
      "d",
      straightLine([
        [410, 561],
        [410, 150],
        [390, 150],
        [390, 130],
        [510, 130],
        [510, 150],
        [490, 170],
        [490, 210],
        [560, 440],
        [610, 440],
        [610, 561],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");

  // Dam Bottom
  svg
    .select("g.dam")
    .append("path")
    .attr("id", "bottom")
    .attr(
      "d",
      straightLine([
        [239, 560],
        [611, 560],
        [611, 590],
        [239, 590],
      ]),
    )
    .attr("fill", "#B3B3B3");
};

export default Dam;
