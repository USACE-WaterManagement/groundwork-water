
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table({h1, subTitle, heading, content, ...props}) {
  return (
    <div className={`gw-px-4 gw-sm:px-6 gw-lg:px-8 ${props?.className}`}>
      <div className="gw-sm:flex gw-sm:items-center">
        <div className="gw-sm:flex-auto">
          <h1 className="gw-text-base gw-font-semibold gw-leading-6 gw-text-gray-900">
            {h1}
          </h1>
          <p className="gw-mt-2 text-sm gw-text-gray-700">{subTitle}</p>
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="gw-mt-8 gw-flow-root">
        <div className="gw--mx-4 gw--my-2 gw-sm:-mx-6 lg:-mx-8">
          <div className="gw-inline-block gw-min-w-full gw-py-2 gw-align-middle">
            <table className="gw-min-w-full gw-border-separate gw-border-spacing-0">
              <thead>
                {heading.forEach((col) => {
                  return (
                    <tr>
                      <th
                        scope="col"
                        className="gw-sticky gw-top-0 gw-z-10 gw-border-b gw-border-gray-300 gw-bg-white gw-bg-opacity-75 gw-py-3.5 gw-pl-4 gw-pr-3 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900 gw-backdrop-blur gw-backdrop-filter gw-sm:pl-6 gw-lg:pl-8"
                      >
                        {col}
                      </th>
                    </tr>
                  );
                })}
              </thead>
              <tbody>
                {content.map((row, r_idx) => (
                  <tr
                    key={`tr.${r_idx}`}
                    className={classNames(
                      r_idx !== row.length - 1
                        ? "gw-border-b gw-border-gray-200"
                        : "",
                      "gw-whitespace-nowrap gw-py-4 gw-pl-4 gw-pr-3 gw-text-sm gw-font-medium gw-text-gray-900 gw-sm:pl-6 gw-lg:pl-8"
                    )}
                  >
                    {row.map((col, c_idx) => {
                      return (
                        <td
                          key={`td.${r_idx}.${c_idx}`}
                          className="gw-px-4 gw-py-4 gw-whitespace-nowrap gw-text-sm gw-text-gray-900"
                        >
                          {col}
                        </td>
                      );
                    })}
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
