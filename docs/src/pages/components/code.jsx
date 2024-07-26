import { clsx } from "clsx";
import SyntaxHighlighter, {
  syntaxStyle,
} from "../../../../lib/components/utils/SyntaxHighlighter";
import CopyButton from "../../components/CopyButton";

export function Code({ className, language, enableCopy = true, ...props }) {
  const codeClassName = clsx(
    "gw-whitespace-pre gw-rounded gw-border gw-border-zinc-950/10 gw-bg-zinc-950/[2.5%] gw-px-0.5 gw-text-sm gw-font-medium gw-text-zinc-950 sm:gw-text-[0.8125rem] dark:gw-border-white/20 dark:gw-bg-white/5 dark:gw-text-white",
    className
  );

  return (
    <div className="gw-flex gw-flex-row gw-justify-start gw-space-between gw-items-center gw-gap-2 gw-mt-3 gw-mb-3">
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
        {enableCopy ? <CopyButton text={String(props.children)} /> : null}
    </div>
  );
}
