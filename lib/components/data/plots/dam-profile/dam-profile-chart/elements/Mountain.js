import { straightLine } from "./Lines.js";

const Mountain = (svg) => {
  svg
    .append("g")
    .attr("class", "mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [10, 100],
        [20, 60],
        [35, 45],
        [40, 35],
        [60, 25],
        [75, 65],
        [90, 70],
        [110, 100],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  //draw mountain accent 1
  svg
    .select("g.mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [20, 100],
        [25, 90],
        [22, 75],
        [30, 55],
        [27, 75],
        [40, 90],
        [40, 100],
      ]),
    )
    .attr("fill", "#58595D");
  //draw mountain accent 2
  svg
    .select("g.mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [60, 72],
        [95, 100],
        [85, 100],
        [70, 90],
        [65, 92],
      ]),
    )
    .attr("fill", "#58595D");
  // draw mountain accent 3
  svg
    .select("g.mountain")
    .append("path")
    .attr(
      "d",
      straightLine([
        [60, 60],
        [55, 40],
        [63, 55],
        [62, 57],
        [70, 65],
      ]),
    )
    .attr("fill", "#58595D");
};

export default Mountain;
