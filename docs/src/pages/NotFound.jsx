import { Button, H2 } from "@usace/groundwork";

const BASE_URL = import.meta.env.BASE_URL;

function NotFound() {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-col justify-center items-center">
        <div>
          <H2 className="font-semibold">
            We cant find a page that matches {window.location.pathname}
          </H2>
        </div>
        <div className="flex gap-3 mt-8">
          <Button color="green" href={`${BASE_URL}#/`}>
            Go Home
          </Button>
          <Button color="teal" href={`${BASE_URL}#/docs`}>
            Go to Documentation
          </Button>
          <Button color="blue" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
