# @feltcoop/util

> utilities for javascript in typescript 🦕🐋 [util.felt.dev](https://util.felt.dev)

## usage

> [`npm i -D @feltcoop/util`](https://www.npmjs.com/package/@feltcoop/util)

```ts
// a few things are exported from the root:
import {type Result, unwrap} from '@feltcoop/util';
// most are available at their full module path:
import {type Result, unwrap} from '@feltcoop/util/result.js';
import {randomInt} from '@feltcoop/util/random.js'; // etc
```

see the available modules at [util.felt.dev](https://util.felt.dev)
and [src/lib/exports](src/lib/exports.ts)

## design

- includes utilities to fill in for the modern web platform
- all typescript, no svelte
- zero non-platform dependencies (some modules depend on platform features of the browser and Node)

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

depends on [`kleur`](https://github.com/lukeed/kleur)

made with [Svelte](https://github.com/sveltejs/svelte) ∙
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
