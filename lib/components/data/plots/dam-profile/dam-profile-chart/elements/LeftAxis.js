import * as d3 from "d3";

import { curvedLine, createLine } from "./Lines.js";

const LeftAxis = (svg, damTop, damBottom) => {
  svg
    .append("g")
    .attr("class", "leftLine")
    .append("path")
    .attr(
      "d",
      curvedLine([
        [0, 100],
        [220, 100],
        [243, 130],
        [243, 150],
        [243, 560],
        [243, 560],
        [243, 560],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 7)
    .attr("fill", "none")
    .attr("stroke-linejoin", "miter");

  // Number Format
  var numFormat = d3.format(".2f");
  // Tick Scale
  var tickScale = d3.scaleLinear().domain([0, 17]).range([damTop, damBottom]);
  // @todo; consider more consistent scale, not based
  //        on the top/bottom of dam divided into 18 equal
  //        increments, as this creates unexpected tick
  //        values (e.g. 1.41, 1.52)
  svg.append("g").attr("class", "ticks");
  var length = 5;
  var strokeWidth = 4;
  for (var i = 0; i < 18; i++) {
    if (i % 2 === 0) {
      strokeWidth = 4;
      length = 15;
    } else {
      strokeWidth = 2;
      length = 10;
    }
    svg
      .select("g.ticks")
      .append("path")
      .attr("d", createLine(length))
      .attr("stroke-width", strokeWidth)
      .attr("stroke", "#B3B3B3")
      .attr("transform", "translate(" + (240 - length) + "," + (130 + i * 25.4) + ")");

    svg
      .select("g.ticks")
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("fill", "#b3b3b3")
      .attr("font-size", "12px")
      .attr("transform", "translate(" + 180 + "," + (135 + i * 25.4) + ")")
      .text(numFormat(tickScale(i)));
  }
};

export default LeftAxis;
