# @feltcoop/util

> utilities for javascript in typescript 🦕🐋 [util.felt.dev](https://util.felt.dev)

## usage

usage: [`npm i @feltcoop/util`](https://www.npmjs.com/package/@feltcoop/util)

see [src/lib/index.ts](src/lib/index.ts)

```ts
import {type Result, unwrap} from '@feltcoop/util';
// or
import {type Result, unwrap} from '@feltcoop/util/result.js';
```

TODO docs:
[util.felt.dev](https://util.felt.dev)

## build

```bash
npm run build
# or
gro build
```

## test

For more see [uvu](https://github.com/lukeed/uvu)
and [`src/lib/example.test.ts`](src/lib/example.test.ts)

```bash
gro test
gro test filepattern1 filepatternB
gro test -- uvu --forwarded_args 'to uvu'
```

## deploy

[Deploy](https://github.com/feltcoop/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[ESLint](https://github.com/eslint/eslint) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[Felt](https://github.com/feltcoop/felt) ∙
[Gro](https://github.com/feltcoop/gro)
& [more](package.json)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

[MIT](LICENSE)
