import dayjs from "dayjs";
import { useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(number, precision) {
  return Number(number).toFixed(precision);
}

export default function Table({
  title,
  subTitle,
  heading,
  content,
  order = "desc",
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
    <div className="gww-px-4 gww-sm:px-6 gww-lg:px-8">
      <div className="gww-sm:flex gww-sm:items-center">
        <div className="gww-sm:flex-auto">
          {title && (
            <h1 className="gww-text-base gww-font-semibold gww-leading-6 gww-text-gray-900">
              {title}
            </h1>
          )}
          {subTitle && (
            <p className="gww-mt-2 gww-text-sm gww-text-gray-700">{subTitle}</p>
          )}
        </div>
      </div>
      <div className="gww-mt-8 gww-flow-root">
        <div className="gww--mx-4 gww--my-2 gww-overflow-x-auto gww-sm:-mx-6 gww-lg:-mx-8">
          <div className="gww-inline-block gww-min-w-full gww-py-2 gww-align-middle gww-sm:px-6 gww-lg:px-8">
            <table className="gww-min-w-full gww-divide-y gww-divide-gray-300">
              <thead>
                <tr>
                  {heading.map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="gww-py-3.5 gww-pl-4 gww-pr-3 gww-text-left gww-text-sm gww-font-semibold gww-text-gray-900 gww-sm:pl-3"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="gww-bg-white">
                {sortedContent.map((dataPoint) => (
                  <tr key={dataPoint[0]} className="gww-even:bg-gray-50">
                    <td className="gww-whitespace-nowrap gww-py-4 gww-pl-4 gww-pr-3 gww-text-sm gww-font-medium gww-text-gray-900 gww-sm:pl-3">
                      {dayjs(dataPoint[0]).format(dateFormat)}
                    </td>
                    <td className="gww-whitespace-nowrap gww-px-3 gww-py-4 gww-text-sm gww-text-gray-500">
                      {formatNumber(dataPoint[1], precision)}
                    </td>
                    <td className="gww-whitespace-nowrap gww-px-3 gww-py-4 gww-text-sm gww-text-gray-500">
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
