import dayjs from "dayjs";
import { useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(number, precision) {
  return Number(number).toFixed(precision);
}

export default function Table({
  h1,
  subTitle,
  heading,
  content,
  order="desc",
  precision = 4,
  dateFormat = "MM-DD-YYYY HH:mm",
  ...props
}) {
  // Use a memoized version of the content array to avoid unnecessary re-renders
  const sortedContent = useMemo(() => {
    return [...content].sort((a, b) => {
      if (a[1] < b[1]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[1] > b[1]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [content, order]);


  return (
    <div className="gw-px-4 gw-sm:px-6 gw-lg:px-8">
      <div className="gw-sm:flex gw-sm:items-center">
        <div className="gw-sm:flex-auto">
          {h1 && <h1 className="gw-text-base gw-font-semibold gw-leading-6 gw-text-gray-900">{h1}</h1>}
          {subTitle && <p className="gw-mt-2 gw-text-sm gw-text-gray-700">{subTitle}</p>}
        </div>
      </div>
      <div className="gw-mt-8 gw-flow-root">
        <div className="gw--mx-4 gw--my-2 gw-overflow-x-auto gw-sm:-mx-6 gw-lg:-mx-8">
          <div className="gw-inline-block gw-min-w-full gw-py-2 gw-align-middle gw-sm:px-6 gw-lg:px-8">
            <table className="gw-min-w-full gw-divide-y gw-divide-gray-300">
              <thead>
                <tr>
                {heading.map((heading) => (
                  <th scope="col" className="gw-py-3.5 gw-pl-4 gw-pr-3 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900 gw-sm:pl-3">
                    {heading}
                  </th>
                ))}
                </tr>
              </thead>
              <tbody className="gw-bg-white">
               
                {sortedContent.map((dataPoint) => (
                  <tr key={dataPoint[0]} className="gw-even:bg-gray-50">
                    <td className="gw-whitespace-nowrap gw-py-4 gw-pl-4 gw-pr-3 gw-text-sm gw-font-medium gw-text-gray-900 gw-sm:pl-3">
                      {dayjs(dataPoint[0]).format(dateFormat)}
                    </td>
                    <td className="gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500">
                      {formatNumber(dataPoint[1], precision)}
                    </td>
                    <td className="gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500">
                      {dataPoint[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}