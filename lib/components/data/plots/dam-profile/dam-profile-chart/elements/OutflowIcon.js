import { straightLine } from "./Lines.js";

const OutflowIcon = (svg, outflow, outflowTotals = [], position = { x: 0, y: 0 }) => {
  //   const outflowCircle = {
  //     dam: { x: 600, y: 360 },
  //     lock: { x: 1000, y: 360 },
  //     lockTurbine: { x: 1000, y: 360 },
  //     turbine: { x: 600, y: 360 },
  //   };
  // Note: arrow coordinates are relative to the position provided to OutflowIcon
  //       Absolute coordinates for SVG are calculated using position coordinates
  const arrow = [
    [20, -5],
    [55, -5],
    [55, -20],
    [80, 0],
    [55, 20],
    [55, 5],
    [20, 5],
  ];
  // circle
  svg
    .append("g")
    .attr("class", "outflowIcon")
    .append("circle")
    .attr("r", 25)
    .attr("cx", position.x)
    .attr("cy", position.y)
    .attr("fill", "#0F4868");
  // arrow
  svg
    .select("g.outflowIcon")
    .append("path")
    .attr(
      "d",
      straightLine(
        arrow.map((point) => [point[0] + position.x, point[1] + position.y]),
      ),
    )
    .attr("fill", "#0F4868");
  // label 'OUT'
  svg
    .select("g.outflowIcon")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", position.x)
    .attr("dy", position.y + 5)
    .attr("fill", "#fff")
    .attr("font-family", "sans-serif")
    .text("OUT");

  // label value
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", 710)
    .attr("dy", 325)
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.2em")
    .attr("class", "outflowText")
    .text(
      outflow !== null && !isNaN(outflow)
        ? outflow.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          }) + " cfs"
        : "Not Available",
    );
  outflowTotals?.map((level, i) => {
    const { value, name } = level;
    svg
      .append("g")
      .attr("class", "labelText")
      .append("text")
      .attr("text-anchor", "left")
      .attr("dx", 680)
      .attr("dy", 405 + i * 20)
      .attr("font-family", "sans-serif")
      .attr("font-size", ".8em")
      .attr("class", "outflowText")
      .text(
        value !== null && !isNaN(value)
          ? value.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }) +
              " cfs - " +
              name
          : null,
      );
  });
};

export default OutflowIcon;
