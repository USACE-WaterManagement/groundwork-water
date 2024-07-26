import { Button } from "@usace/groundwork";

const _className =
  "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 border-none";

export function Next({ url, className = { className } }) {
  return (
    <div className="inline-flex">
      <Button
        className={`${_className + " " + className} rounded-r`}
        href={url}
      >
        Next
      </Button>
    </div>
  );
}

export function Prev({ url, className = { className } }) {
  return (
    <div className="inline-flex">
      <Button
        className={`${_className + " " + className}  rounded-l`}
        href={url}
      >
        Prev
      </Button>
    </div>
  );
}
