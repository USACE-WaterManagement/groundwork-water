import { clsx } from "clsx";
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import SyntaxHighlighter, { syntaxStyle } from '../../../../lib/components/utils/SyntaxHighlighter';

export function Code({
  className,
  language,
  ...props
}) {
  const codeClassName = clsx(
    "gw-whitespace-pre gw-rounded gw-border gw-border-zinc-950/10 gw-bg-zinc-950/[2.5%] gw-px-0.5 gw-text-sm gw-font-medium gw-text-zinc-950 sm:gw-text-[0.8125rem] dark:gw-border-white/20 dark:gw-bg-white/5 dark:gw-text-white",
    className
  );
  return language ? (
    <SyntaxHighlighter language={language} style={syntaxStyle} {...props} className={codeClassName} />
  ) : (
    <code {...props} className={codeClassName} />
  );
}
