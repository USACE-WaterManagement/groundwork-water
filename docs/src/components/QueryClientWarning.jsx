import Alert from "../pages/components/alert";

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
          <a href="/docs/react-query" className="underline">
            Getting Started - React-Query
          </a>{" "}
          page.
        </span>
      }
    />
  );
};

export { QueryClientWarning };
export default QueryClientWarning;
