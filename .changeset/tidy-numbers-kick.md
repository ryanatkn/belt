---
'@ryanatkn/belt': minor
---

disable colors by default for better runtime compat -
call `set_colors(styleText)` from `print.ts`,
in Node `import {styleText} from 'node:util';`
