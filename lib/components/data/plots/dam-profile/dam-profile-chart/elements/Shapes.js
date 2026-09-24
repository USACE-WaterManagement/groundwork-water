//import * as d3 from 'd3';
import { straightLine } from "./Lines";

//create arrows at x and y coordinate. rotate by rotation degrees
const createArrow = (svg, x, y, rotation) => {
  return svg
    .append("path")
    .attr(
      "d",
      straightLine([
        [4, 0],
        [6, 0],
        [6, 20],
        [10, 20],
        [5, 28],
        [0, 20],
        [4, 20],
      ]),
    )
    .attr("fill", "#000000")
    .attr("transform", "translate(" + x + "," + y + ") rotate(" + rotation + ")");
};

export { createArrow };
