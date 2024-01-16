# @ryanatkn/util

> JS utilities to complement the modern web platform 🦕
> [util.ryanatkn.com](https://util.ryanatkn.com)

design:

- kitchen-sink utilities library - sorry, we wish it weren't so, JS made us do it
- mix of JS module environments - browser-only, Node-only, universal
- mostly small, pure functions
- near-zero non-platform third party dependencies,
  currently the one exception is [`kleur`](https://github.com/lukeed/kleur)
- all TypeScript, for styles and Svelte and SvelteKit
  see <a href="https://github.com/fuz-dev/fuz">@fuz.dev/fuz</a>
- complement the modern web platform, stay evergreen
- kinda minimal in many ways but also not

## usage

> [`npm i -D @ryanatkn/util`](https://www.npmjs.com/package/@ryanatkn/util)

```ts
// import full module paths:
import {type Result, unwrap} from '@ryanatkn/util/result.js';
import {random_int} from '@ryanatkn/util/random.js';
```

see the available modules at [util.ryanatkn.com](https://util.ryanatkn.com),
[src/lib/index.ts](src/lib/index.ts),
and [src/lib/exports.ts](src/lib/exports.ts)

## build

```bash
npm run build
# or
gro build
```

## test

For more see [`uvu`](https://github.com/lukeed/uvu)
and [Gro's test docs](https://github.com/feltjs/gro/blob/main/src/docs/test.md).

```bash
gro test
gro test filepattern1 filepatternB
gro test -- uvu --forwarded_args 'to uvu'
```

## deploy

[Deploy](https://github.com/feltjs/gro/blob/main/src/docs/deploy.md)
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
[FeltUI](https://github.com/fuz-dev/fuz) ∙
[Gro](https://github.com/feltjs/gro)
& [more](package.json)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

[MIT](LICENSE)
