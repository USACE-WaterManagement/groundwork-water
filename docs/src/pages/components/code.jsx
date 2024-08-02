import { clsx } from "clsx";
import SyntaxHighlighter, { syntaxStyle } from "../../utils/SyntaxHighlighter";
import CopyButton from "../../components/CopyButton";

export function Code({
  className,
  language,
  inline = false,
  enableCopy = true,
  ...props
}) {
  const codeClassName = clsx(
    "whitespace-pre rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-4 py-1 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white",
    className
  );

  return (
    <div className={`relative mt-3 mb-3 ${inline ? "inline-block" : "block"}`}>
      <div
        className={`relative ${inline ? "inline-flex" : "flex"} items-start`}
      >
        {language && (
          <div className="relative top-3 right-0 bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-tr rounded-bl">
            {language.toUpperCase()}
          </div>
        )}
        <div className="mr-2 mt-1 flex-shrink-0">
          {language ? (
            <SyntaxHighlighter
              language={language}
              style={syntaxStyle}
              {...props}
              className={codeClassName}
            >
              {props?.children}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={codeClassName}>
              {props?.children}
            </code>
          )}
        </div>
        {enableCopy && (
          <div className="flex-grow">
            <CopyButton text={String(props.children)} />
          </div>
        )}
      </div>
    </div>
  );
}
