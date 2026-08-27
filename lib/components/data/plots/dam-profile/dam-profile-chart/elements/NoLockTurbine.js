import { straightLine } from "./Lines.js";
import { createArrow } from "./Shapes.js";

const noLockTurbine = (svg) => {
  //bottom of lock
  svg
    .append("g")
    .attr("class", "lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [240, 560],
        [300, 560],
        [300, 610],
        [840, 560],
        [1209, 560],
        [1209, 640],
        [240, 640],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  var lockGradient = svg
    .select("defs")
    .append("linearGradient")
    .attr("id", "LockGradient")
    .attr("x1", "0%")
    .attr("x2", "50%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .attr("gradientUnits", "userSpaceOnUse");
  lockGradient.append("stop").attr("offset", "40%").attr("stop-color", "#DCF1F9");
  lockGradient.append("stop").attr("offset", "80%").attr("stop-color", "#82B8DC");
  //create water underneath lock (with the above gradient)
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [300, 559],
        [830, 559],
        [830, 610],
        [300, 610],
      ]),
    )
    .attr("fill", "url(#LockGradient)");
  //create arrows in the water
  createArrow(svg, 310, 570, 0);
  createArrow(svg, 520, 605, -90);
  createArrow(svg, 787, 590, 180);
  createArrow(svg, 822, 590, 180);
  //water outside of lock
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [611, 510],
        [611, 560],
        [1210, 560],
        [1210, 510],
      ]),
    )
    .attr("fill", "#85BBDF");
  //rectangle below dam
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [330, 560],
        [330, 590],
        [770, 590],
        [770, 560],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3")
    .attr("stroke-linejoin", "bevel");
  //separator between outlet arrows
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [795, 560],
        [805, 560],
        [805, 590],
        [795, 590],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
  //grey region separating tailwater from outlet
  svg
    .select("g.lock")
    .append("path")
    .attr(
      "d",
      straightLine([
        [830, 560],
        [850, 560],
        [1020, 560],
        [1020, 590],
        [830, 590],
      ]),
    )
    .attr("stroke", "#B3B3B3")
    .attr("stroke-width", 2)
    .attr("fill", "#B3B3B3");
};

export default noLockTurbine;
