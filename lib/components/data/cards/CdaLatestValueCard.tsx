import { Card, gwMerge, Skeleton } from "@usace/groundwork";
import { MdErrorOutline } from "react-icons/md";
import { PiClockThin } from "react-icons/pi";
import useCdaLatestValue from "../hooks/useCdaLatestValue";

interface CdaLatestValueCardProps {
  label?: string;
  tsId: string;
  office: string;
  unit?: string;
  digits?: number;
  className?: string;
  cdaUrl?: string;
  datum?: string;
}

const CdaLatestValueCard = ({
  label,
  tsId,
  office,
  unit,
  digits = 0,
  className,
  cdaUrl,
  datum = "EN",
  ...props
}: CdaLatestValueCardProps) => {
  const { data, isPending, isError } = useCdaLatestValue({
    tsId,
    office,
    unit,
    cdaUrl,
  });

  const noData = !isPending && !data;

  const cls = gwMerge("gww-w-96", className);

  return (
    <Card className={cls} {...props}>
      <div className="gww-flex gww-items-center gww-justify-between">
        <p className="gww-font-lg gww-truncate gww-text-lg gww-font-medium gww-text-black">
          {label ?? tsId}
        </p>
        {isPending ? (
          <Skeleton className="gww-w-20" />
        ) : isError || noData ? (
          <span className="gww-text-lg">
            <MdErrorOutline />
          </span>
        ) : data ? (
          <CardValue
            value={data.value}
            units={data.units ?? ""}
            digits={digits}
            datum={datum}
          />
        ) : null}
      </div>
      <div className="gww-mt-2 gww-flex gww-justify-between">
        {isPending ? (
          <Skeleton className="gww-w-48" />
        ) : isError ? (
          <span className="gww-text-red-500">Error retrieving data</span>
        ) : noData ? (
          <span>No data found</span>
        ) : data ? (
          <>
            <CardTimestamp datetime={new Date(data.datetime)} />
            {/* {change ? <Parameter24hrChange change={change} /> : customBotRight} */}
          </>
        ) : null}
      </div>
    </Card>
  );
};

interface CardTimestampProps {
  datetime: Date;
}

const CardTimestamp = ({ datetime }: CardTimestampProps) => {
  return (
    <div className="gww-sm:flex">
      <p className="gww-flex gww-items-center gww-text-sm gww-text-gray-500">
        <PiClockThin
          className="gww-mr-1.5 gww-h-5 gww-w-5 gww-flex-shrink-0 gww-text-gray-600"
          aria-hidden="true"
        />
        {datetime ? (
          <time dateTime={datetime.toISOString()}>
            {datetime &&
              datetime.toLocaleString("en-US", {
                day: "numeric",
                year: "numeric", // numeric, 2-digit
                month: "short", // numeric, 2-digit, long, short, narrow
                hour: "numeric", // numeric, 2-digit
                minute: "numeric", // numeric, 2-digit
                // second: 'numeric', // numeric, 2-digit
                timeZoneName: "short",
              })}
          </time>
        ) : (
          <span>-</span>
        )}
      </p>
    </div>
  );
};

interface CardValueProps {
  value: number;
  units: string;
  digits: number;
  datum: string;
}

const CardValue = ({ value, units, digits = 0, datum = "EN" }: CardValueProps) => {
  if (!Number.isFinite(digits)) {
    console.error("CardValue: 'digits' prop must be a finite number. Using default value of 0.");
    digits = 0;
  }
  const roundedValue = typeof value === "number" ? (
    digits >= 0 ? (
      value // No rounding needed for positive digits
    ) : (
      Math.round(value / Math.pow(10, Math.abs(digits))) * Math.pow(10, Math.abs(digits))
    )
  ) : null; // Or some other default if 'value' is not a number

  const formattedValue = typeof roundedValue === "number" ? (
    digits >= 0 ? (
      roundedValue.toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })
    ) : (
      roundedValue.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    )
  ) : "-";

  return (
    <div className="gww-ml-2 gww-flex gww-flex-shrink-0">
      <p className="gww-inline-flex gww-px-2 gww-text-lg gww-font-semibold gww-leading-5 gww-text-black">
        {formattedValue}
        <span className="gww-ml-1 gww-text-sm gww-font-normal gww-text-gray-400">
          {units}
        </span>
        {datum !== null && typeof datum === 'string' && (
          <span className="gww-ml-1 gww-text-sm gww-font-normal gww-text-gray-400">
            {datum}
          </span>
        )}
      </p>
    </div>
  );
};

export { CdaLatestValueCard };
export default CdaLatestValueCard;
