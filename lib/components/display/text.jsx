import { clsx } from "clsx";
import { Prism } from "react-syntax-highlighter";
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// https://github.com/react-syntax-highlighter/react-syntax-highlighter?tab=readme-ov-file#light-build
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import only the languages we need
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('json', json);

export function Code({
  className,
  syntaxHighlight = false,
  language = "jsx",
  ...props
}) {
  const codeClassName = clsx(
    "gw-whitespace-pre gw-rounded gw-border gw-border-zinc-950/10 gw-bg-zinc-950/[2.5%] gw-px-0.5 gw-text-sm gw-font-medium gw-text-zinc-950 sm:gw-text-[0.8125rem] dark:gw-border-white/20 dark:gw-bg-white/5 dark:gw-text-white",
    className
  );
  {console.log(SyntaxHighlighter.supportedLanguages)}
  return syntaxHighlight ? (
    <Prism language={language} {...props} className={codeClassName} />
  ) : (
    <code {...props} className={codeClassName} />
  );
}
