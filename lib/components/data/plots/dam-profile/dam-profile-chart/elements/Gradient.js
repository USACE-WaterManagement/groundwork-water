import * as d3 from "d3";
import { straightLine } from "./Lines.js";

const Gradient = (svg, damScale, min, max) => {
  // short circuit
  if (!damScale || !min || !max) {
    return;
  }
  // console.log('--Gradient--');
  // console.log(`svg: ${svg}`);
  // console.log(`damScale: ${damScale}`);
  // console.log(`min: ${min}`);
  // console.log(`max: ${max}`);
  // console.log('---');
  const colors = [
    { level: 0.0, color: "red" },
    { level: 0.2, color: "yellow" },
    { level: 0.3, color: "yellow" },
    { level: 0.4, color: "green" },
  ];
  const labels = [0, 20, 40, 60, 80, 100];

  if (!isNaN(max) && !isNaN(min)) {
    const bottom = damScale(min);
    const top = damScale(max);
    // gradientScale:
    //   returns pixel space values, given a real dam value
    const gradientScale = d3.scaleOrdinal(
      labels, // domain
      [bottom, top], // range
    );
    const height = bottom - top;

    // Set Axis on Right Side
    d3.axisRight(gradientScale);

    //create the actual gradient with green: 60%, yellow: 60-75%, and red: 85-100%
    var middleGradient = svg
      .select("defs")
      .append("linearGradient")
      .attr("id", "MiddleGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    colors.forEach((c) => {
      middleGradient
        .append("stop")
        .attr("offset", c.level * 100 + "%")
        .attr("stop-color", c.color);
    });

    svg
      .append("g")
      .attr("class", "middleGradient")
      .append("path")
      .attr(
        "d",
        straightLine([
          [445, top],
          [460, top],
          [460, bottom],
          [445, bottom],
          [445, top],
        ]),
      )
      .attr("fill", "url(#MiddleGradient)");

    //create percentage marks
    if (Math.abs(top - bottom) > 40) {
      // Add All Labels
      labels.forEach((d, i) => {
        svg
          .select("g.middleGradient")
          .append("text")
          .attr("x", 465)
          .attr("y", top + 5 + i * (height / 5))
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .text(d + "%");
      });
    } else {
      // Add First And Last Label
      svg
        .select("g.middleGradient")
        .append("text")
        .attr("x", 465)
        .attr("y", top + 5)
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .text(labels[0] + "%");

      svg
        .select("g.middleGradient")
        .append("text")
        .attr("x", 465)
        .attr("y", top + 5 + (labels.length - 1) * (height / 5))
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .text(labels[labels.length - 1] + "%");
    }
  }
};

export default Gradient;
