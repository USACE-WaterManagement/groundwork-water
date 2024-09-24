import { Card, Text } from "@usace/groundwork";
import { IoWarning } from "react-icons/io5";

const QueryClientWarning = () => {
  return (
    <Card className="my-2 flex">
      <IoWarning size="1.5rem" className="flex-none mr-2 text-gray-700" />
      <Text>
        Use of the groundwork data hooks requires that your application be
        wrapped in a QueryClientProvider. Refer to the{" "}
        <a href="/docs/react-query" className="underline">
          Getting Started - React-Query
        </a>{" "}
        page.
      </Text>
    </Card>
  );
};

export { QueryClientWarning };
export default QueryClientWarning;
