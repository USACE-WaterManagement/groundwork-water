import { Link } from "@usace/groundwork";
import Alert from "../pages/components/alert";

const BASE_URL = import.meta.env.BASE_URL;

const QueryClientWarning = () => {
  return (
    <Alert
      className="my-2"
      status="warning"
      title="NOTE"
      message={
        <span>
          Use of this component requires that your application be wrapped in a
          QueryClientProvider. Refer to the{" "}
          <Link href={`${BASE_URL}/#/docs/react-query`} className="underline">
            Getting Started - React-Query
          </Link>{" "}
          page.
        </span>
      }
    />
  );
};

export { QueryClientWarning };
export default QueryClientWarning;
