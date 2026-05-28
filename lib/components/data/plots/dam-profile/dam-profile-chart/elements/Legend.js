import { straightLine } from "./Lines.js";

const Legend = (svg) => {
  svg
    .append("g")
    .attr("class", "legend")
    .append("text")
    .attr("dx", 1020)
    .attr("dy", 60)
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.5em")
    .text("Legend");
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 70],
        [1220, 70],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("fill", "#B3B3B3")
    .attr("stroke-width", 3);
  //create lake level icon
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 90],
        [1010, 80],
        [1020, 80],
        [1020, 90],
        [1010, 90],
      ]),
    )
    .attr("fill", "#DCF1F9")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 90)
    .attr("font-family", "sans-serif")
    .text("Current Lake Level");
  //create tail water icon
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 100],
        [1010, 110],
        [1020, 110],
        [1020, 100],
        [1010, 100],
      ]),
    )
    .attr("fill", "#83BADF")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 110)
    .attr("font-family", "sans-serif")
    .text("Tail Water");
  //create inflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 130)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1009)
    .attr("dy", 134)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "12px")
    .text("IN");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 135)
    .attr("font-family", "sans-serif")
    .text("Inflow");
  //create surcharge icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 160)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 164)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("SUR");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 165)
    .attr("font-family", "sans-serif")
    .text("Surcharge Release");
  //create outflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 190)
    .attr("fill", "#0F4868");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 194)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("OUT");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 195)
    .attr("font-family", "sans-serif")
    .text("Outflow");
};

export default Legend;
