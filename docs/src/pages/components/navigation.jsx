const _className = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4";

export function Next({url, className={className}}) {
  return (
    <div className="inline-flex">
      <button className={`${_className + " " + className} rounded-r`}>
        <a href={url}>Next</a>
      </button>
    </div>
  );
}

export function Prev({url,  className={className}}) {
  return (
    <div className="inline-flex">
      <button className={`${_className + " " + className}  rounded-l`}>
        <a href={url}>Prev</a>
      </button>
    </div>
  );
}
