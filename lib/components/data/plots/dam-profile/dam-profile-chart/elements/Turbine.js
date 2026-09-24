import { straightLine, curvedLine } from "./Lines.js";

const Turbine = (svg) => {
  //create top part of turbine
  svg
    .append("g")
    .attr("class", "turbine")
    .append("path")
    .attr(
      "d",
      straightLine([
        [565, 440],
        [565, 430],
        [575, 430],
        [575, 425],
        [595, 425],
        [595, 430],
        [605, 430],
        [605, 440],
        [590, 440],
        [590, 540],
        [580, 540],
        [580, 440],
      ]),
    )
    .attr("stroke", "#606063")
    .attr("stroke-width", 2)
    .attr("fill", "#606063");

  //create circular part of turbine
  svg
    .select("g.turbine")
    .append("path")
    .attr(
      "d",
      curvedLine([
        [580, 540],
        [560, 560],
        [570, 570],
        [600, 570],
        [610, 560],
        [590, 540],
      ]),
    )
    .attr("stroke", "#606063")
    .attr("stroke-width", 2)
    .attr("fill", "#606063");
  //create bottom part of turbine
  svg
    .select("g.turbine")
    .append("path")
    .attr(
      "d",
      straightLine([
        [580, 590],
        [580, 575],
        [583, 575],
        [583, 560],
        [587, 560],
        [587, 575],
        [590, 575],
        [590, 575],
        [590, 590],
      ]),
    )
    .attr("stroke", "#606063")
    .attr("stroke-width", 2)
    .attr("fill", "#606063");
  //create turbine propeller part 1
  svg
    .select("g.turbine")
    .append("path")
    .attr(
      "d",
      curvedLine([
        [575, 595],
        [580, 598],
        [590, 592],
        [595, 595],
        [590, 598],
        [580, 592],
        [575, 595],
      ]),
    )
    .attr("stroke", "#8D8986")
    .attr("stroke-width", 2)
    .attr("fill", "#8D8986");
  //create turbine propeller part 2
  svg
    .select("g.turbine")
    .append("path")
    .attr(
      "d",
      straightLine([
        [584, 590],
        [586, 590],
        [586, 600],
        [586, 600],
        [584, 600],
        [584, 600],
      ]),
    )
    .attr("stroke", "#221E1F")
    .attr("stroke-width", 2)
    .attr("fill", "#221E1F");
};

export default Turbine;
