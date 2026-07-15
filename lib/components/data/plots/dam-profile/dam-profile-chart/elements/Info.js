const Info = (svg, text) => {
  svg.append("g").attr("class", "dam");
  svg
    .append("g")
    .attr("class", "labelText")
    .append("text")
    .attr("text-anchor", "end")
    .attr("dx", 1230)
    .attr("dy", 20)
    .attr("class", "infoText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.2em")
    .text(text);
};

export default Info;
