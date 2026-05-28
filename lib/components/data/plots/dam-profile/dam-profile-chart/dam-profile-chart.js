import * as d3 from "d3";

import Dam from "./elements/Dam.js";
import Gradient from "./elements/Gradient.js";
import InflowIcon from "./elements/InflowIcon.js";
import LeftAxis from "./elements/LeftAxis.js";
import Legend from "./elements/Legend.js";
import Mountain from "./elements/Mountain.js";
import OutflowIcon from "./elements/OutflowIcon.js";
import SurchargeIcon from "./elements/SurchargeIcon.js";
import WaterLevel from "./elements/WaterLevel.js";
import TailwaterLevel from "./elements/TailwaterLevel.js";
import Levels from "./elements/Levels.js";
import Turbine from "./elements/Turbine.js";
import Info from "./elements/Info.js";
import noLockTurbine from "./elements/NoLockTurbine.js";
import Precipitation from "./elements/Precipitation.js";

export default function DamProfileChart(info, dom) {
  if (!info) return null;
  const {
    infoText,
    pool,
    tail,
    inflow,
    outflow,
    surcharge,
    powerGeneration,
    dambottom,
    damtop,
    height = undefined,
    gradientBottom,
    gradientTop,
    browser,
    levels,
    latestTime,
    precip,
    outflowTotals,
  } = info;
  ////////////
  // D3 SCRIPT
  ////////////

  // var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  // var width = window.innerWidth - margin.left - margin.right; // Use the window's width
  // var height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  // var cWidth = 1240;
  // var cHeight = 650;

  // Dam Scale
  const damScale = d3.scaleLinear().domain([damtop, dambottom]).range([130, 560]);
  // Build SVG; Add to Chart
  var svg = d3.select(dom);

  // Clear any InnerHTML in the case that this function has already run against the provided dom
  svg.selectChildren().remove();

  // @todo; see if this is necessary
  if (height !== undefined) {
    svg.attr("height", height);
  }

  // Handle IE
  if (browser && browser.toUpperCase() === "IE") {
    svg.attr("style", "min-height: 660px");
  }

  svg.append("g").classed("svg-content-responsive", true);
  svg.append("defs");

  //////////////////////////
  // create line on the left
  // replaces drawTicks()
  //////////////////////////
  LeftAxis(svg, damtop, dambottom);

  ////////////////////////////
  // Draw Water Level
  // replaces drawWaterLevel()
  ////////////////////////////
  pool && WaterLevel(svg, damScale, pool);
  // display tailwater component regardless of value set or not
  TailwaterLevel(svg, damScale, tail);

  //////////////////////////
  // create center dam
  // Also includes code
  // previously in noLock()
  //////////////////////////
  Dam(svg);

  ////////////////////////////
  // Create Legend
  // replaces createLegend
  ////////////////////////////
  Legend(svg);

  ////////////////////////////
  // Icons
  ////////////////////////////
  InflowIcon(svg, inflow);
  OutflowIcon(svg, outflow, outflowTotals, { x: 700, y: 360 });
  surcharge && surcharge > 0 && SurchargeIcon(svg, surcharge);

  ////////////////////////////
  // Draw Mountain
  // replaces drawMountain
  ////////////////////////////
  Mountain(svg);
  precip && precip >= 0 && Precipitation(svg, precip);
  // @todo
  // need to abstract this concept into multiple visualizations
  // if (options.hasLock) {
  //   createLock();
  //   drawBoat();
  // } else {
  //   if (options.hasTurbine) {
  //     noLockTurbine();
  //   } else {
  //     noLock();
  //   }
  // }

  // @todo refactor turbine logic
  // if (options.hasTurbine) {
  //   createTurbine();
  // }

  // Note: PowerGeneration can be zero and we still want to show the turbine
  if (powerGeneration !== null && powerGeneration !== undefined) {
    noLockTurbine(svg);
    Turbine(svg);
  }

  //////////////////////////////////////
  // Middle Gradient
  // replaces createMiddleGradient(mode)
  // @todo; Get this working
  // @todo; Confirm desired behavior of
  //        drawn gradient scale
  //        (red, yellow, green)
  //////////////////////////////////////
  if (!isNaN(gradientBottom) || !isNaN(gradientTop)) {
    Gradient(svg, damScale, gradientBottom, gradientTop);
  }

  Levels(svg, damScale, damtop, dambottom, levels);

  const infoDate = new Date(latestTime).toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZoneName: "longGeneric",
  });

  Info(svg, `${infoText} - ${infoDate}`);
}
