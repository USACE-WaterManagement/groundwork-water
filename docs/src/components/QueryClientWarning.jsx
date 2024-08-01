import { Card, Text } from "@usace/groundwork";
import { IoWarning } from "react-icons/io5";

const QueryClientWarning = () => {
  return (
    <Card className="gw-my-2">
      <IoWarning className="gw-float-start gw-text-2xl gw-mr-2 gw-text-gray-700" />
      <Text>
        Use of the groundwork data hooks requires that your application be
        wrapped in a QueryClientProvider. Refer to the{" "}
        <a href="/docs/react-query" className="gw-underline">
          Getting Started - React-Query
        </a>{" "}
        page.
      </Text>
    </Card>
  );
};

export { QueryClientWarning };
export default QueryClientWarning;
