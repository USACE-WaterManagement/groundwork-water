import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';


// https://github.com/react-syntax-highlighter/react-syntax-highlighter?tab=readme-ov-file#light-build

// import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
// import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';

import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';

// SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('json', json);

export default SyntaxHighlighter;
export { coy as syntaxStyle };
