import { createRef, useEffect } from "react";
import { useConnect } from "redux-bundler-hook";
import DamProfileChart from "./dam-profile-chart/dam-profile-chart";

function DamProfile({ info }) {
  const ref = createRef(); // element where DamProfileChart will be rendered

  useEffect(() => {
    DamProfileChart(info, ref.current);
  });

  return (
    <div className="p-2 shadow dark:bg-orange-50 dark:invert">
      <svg
        ref={ref}
        aria-hidden={true}
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 1240 660"
      ></svg>
    </div>
  );
}

export default DamProfile;
