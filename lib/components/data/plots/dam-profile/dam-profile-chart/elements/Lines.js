import * as d3 from "d3";

const curvedLine = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(d3.curveBasis);

const straightLine = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1]);

const createLine = (length) => {
  return straightLine([
    [0, 0],
    [length, 0],
  ]);
};

export { createLine, curvedLine, straightLine };
