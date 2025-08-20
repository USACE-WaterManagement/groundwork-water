import { Link } from "@usace/groundwork";
import Alert from "../pages/components/alert";

const CWMSTableInfo = () => {
  return (
    <Alert
      className="my-2"
      status="info"
      title="Heads Up!"
      message={
        <span>
          Want a simpler way to build a table of timeseries?{" "}
          <Link href="/docs/tables" className="underline">
            Checkout the CWMSTable component!
          </Link>{" "}
        </span>
      }
    />
  );
};

export { CWMSTableInfo };
export default CWMSTableInfo;
