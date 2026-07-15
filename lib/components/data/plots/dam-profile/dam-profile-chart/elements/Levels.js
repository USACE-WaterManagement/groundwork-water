import { createLine, straightLine } from "./Lines.js";
const debug = parseInt(import.meta.env.VITE_APP_DEBUG);

const Levels = (svg, damScale, damTop, damBottom, levels = []) => {
  // short circuit
  if (!levels.length || !damTop || isNaN(damBottom) || !damScale) {
    if (debug) {
      console.log("Unable to draw dam profile levels");
      console.log(levels);
    }
    // console.log(damScale);
    return;
  }

  const x = { left: 160, right: 410 };
  const length = 290;
  const radius = 4;

  var baseModifier = Math.abs(Math.round((damTop - damBottom) * 0.17));

  var moveByModifier = Math.max(
    27,
    Math.abs(Math.round((damTop - damBottom) * baseModifier > 65 ? 0.055 : 0.073)),
  );

  // Default Level Properties if not speficied
  const _levels = levels.map((l) => ({
    side:
      l.name === "Top of Surcharge" || l.name === "Spillway Crest" ? "right" : "left", // default; labels will be on left side of image
    showLine: true,
    ...l,
  }));

  // reverse order sort
  // making sure no undefined values
  var lineData = _levels
    .filter((l) => l.value)
    .sort((a, b) => {
      return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
    });

  //Check if the text and lines are too close, and then re-position
  let priorVal = -1,
    priorMod = 0,
    priorSide = "left";
  lineData.forEach((d, i) => {
    const valueDiff = Math.abs(priorVal - d.value);
    // add second previous value check in case there's a group of levels
    let secondPriorItem = i >= 2 ? lineData[i - 2] : null;
    let secondPriorVal = secondPriorItem?.value;
    let secondPriorMod = secondPriorItem?.modifier;
    const secondValueDiff = secondPriorVal - d.value;
    const isReset =
      (d.side === "right" && priorSide === "left") ||
      priorVal === -1 ||
      valueDiff > baseModifier ||
      (priorSide !== d.side && secondValueDiff > baseModifier - 5);
    const effectivelyEqual = valueDiff < 2;
    const hasExistingMod = priorMod !== 0;

    if (isReset) {
      [d.modifier, d.lineType, priorMod, priorVal] = [0, "straight", 0, d.value];
    } else {
      const modStep = hasExistingMod
        ? priorMod + moveByModifier
        : // here check prior side
          priorSide !== d.side
          ? moveByModifier + (!isNaN(secondPriorMod) ? secondPriorMod : 0)
          : moveByModifier;
      const nextPrior =
        !hasExistingMod && !effectivelyEqual
          ? d.value - moveByModifier
          : !hasExistingMod && effectivelyEqual
            ? d.value - baseModifier
            : hasExistingMod && !effectivelyEqual
              ? d.value - baseModifier
              : d.value - (priorMod + moveByModifier);

      [d.modifier, d.lineType, priorMod, priorVal] = [
        modStep,
        "angled",
        modStep,
        nextPrior,
      ];
    }
    [secondPriorVal, priorVal, priorSide] = [priorVal, d.value, d.side];
  });

  var lines = svg
    .selectAll("g.dashedLines")
    .data(lineData, (d) => `${d.name}-${d.value}`)
    .enter()
    .append("g")
    .attr("class", "dashedLines");

  lines
    .append("path")
    .attr("d", (d) => {
      if (d.lineType === "straight") {
        return d.showLine ? createLine(length) : createLine(20);
      } else {
        return d.showLine
          ? d.side === "left"
            ? straightLine([
                [0, d.modifier],
                [20, 0],
                [length, 0],
              ])
            : straightLine([
                [0, 0],
                [length - 20, 0],
                [length, d.modifier],
              ])
          : straightLine([
              [0, d.modifier],
              [d.modifier, 0],
            ]);
      }
    })
    .attr("transform", (d) => `translate(${x[d.side]},${damScale(d.value)})`)
    .attr("stroke", "#FF0000")
    .attr("fill", "none")
    .style("stroke-dasharray", ("3", "3"));

  //create red dot at the end of the dashed line
  lines
    .append("circle")
    .attr("r", radius)
    .attr("cx", (d) => (d.side === "left" ? x[d.side] : x[d.side] + length))
    .attr("cy", (d) => damScale(d.value) + d.modifier)
    .attr("fill", "#FF0000");

  lines
    .append("text")
    .attr("text-anchor", (d) => (d.side === "left" ? "end" : "start"))
    .attr("x", (d) => (d.side === "left" ? x[d.side] - 10 : x[d.side] + length + 10))
    .attr("y", (d) => damScale(d.value) + d.modifier + radius - 4.5)
    .attr("font-family", "sans-serif")
    .attr("fill", "#FF0000")
    .attr("font-size", "1.0em")
    .text((d) => d.name);

  lines
    .append("text")
    .attr("text-anchor", (d) => (d.side === "left" ? "end" : "start"))
    .attr("x", (d) => (d.side === "left" ? x[d.side] - 10 : x[d.side] + length + 10))
    .attr("y", (d) => damScale(d.value) + d.modifier + radius + 10)
    .attr("font-family", "sans-serif")
    .attr("fill", "#000000")
    .attr("font-size", "1.em")
    .text((d) => `${d.value}'`);
};
export default Levels;
