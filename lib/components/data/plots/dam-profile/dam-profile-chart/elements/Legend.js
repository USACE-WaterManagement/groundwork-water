import { straightLine } from "./Lines.js";

const Legend = (svg) => {
  svg
    .append("g")
    .attr("class", "legend")
    .append("text")
    .attr("dx", 1020)
    .attr("dy", 95)
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.5em")
    .text("Legend");
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 105],
        [1220, 105],
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
        [1010, 125],
        [1010, 115],
        [1020, 115],
        [1020, 125],
        [1010, 125],
      ]),
    )
    .attr("fill", "#DCF1F9")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 125)
    .attr("font-family", "sans-serif")
    .text("Current Lake Level");
  //create tail water icon
  svg
    .select("g.legend")
    .append("path")
    .attr(
      "d",
      straightLine([
        [1010, 135],
        [1010, 145],
        [1020, 145],
        [1020, 135],
        [1010, 135],
      ]),
    )
    .attr("fill", "#83BADF")
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 1);
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 145)
    .attr("font-family", "sans-serif")
    .text("Tail Water");
  //create inflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 165)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1009)
    .attr("dy", 169)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "12px")
    .text("IN");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 170)
    .attr("font-family", "sans-serif")
    .text("Inflow");
  //create surcharge icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 195)
    .attr("fill", "#66AAD7");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 199)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("SUR");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 200)
    .attr("font-family", "sans-serif")
    .text("Surcharge Release");
  //create outflow icon
  svg
    .select("g.legend")
    .append("circle")
    .attr("r", 12)
    .attr("cx", 1015)
    .attr("cy", 225)
    .attr("fill", "#0F4868");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1005)
    .attr("dy", 229)
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text("OUT");
  svg
    .select("g.legend")
    .append("text")
    .attr("dx", 1030)
    .attr("dy", 230)
    .attr("font-family", "sans-serif")
    .text("Outflow");
};

export default Legend;
