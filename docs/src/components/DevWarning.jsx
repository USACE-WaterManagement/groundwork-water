export default function DevWarning({primary="NOTICE:", secondary="This is a development version of the Groundwork Water React Components and is under active development."}) {
    return (
      <div className="gw-w-full gw-mx-auto gw-px-4 gw-box-border gw-max-w-screen">
        <div className="gw-text-center gw-flex gw-justify-between gw-items-center">
          <span className="sm:gw-w-[94px] gw-shrink-0 "></span>
          <div
            className="gw-w-full gw-text-white sm:gw-text-usace-black"
            style={{ order: "2" }}
          >
            <span className="gw-text-lg sm:gw-text-sm gw-font-semibold sm:gw-font-bold gw-leading-4 sm:gw-leading-normal gw-block sm:gw-inline gw-mr-1">
              {primary}
            </span>
            <span className="gw-text-md sm:gw-text-sm gw-mt-2 sm:gw-mt-0 gw-font-thin sm:gw-font-normal gw-block sm:gw-inline">
              {secondary}
            </span>
          </div>
        </div>
      </div>
    );
}