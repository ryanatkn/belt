# @ryanatkn/belt

[<img src="static/logo.svg" alt="a green sauropod wearing a brown utility belt" align="right" width="256" height="256">](https://belt.ryanatkn.com/)

> utility belt for JS 🦕 ancient not extinct

> [belt.ryanatkn.com](https://belt.ryanatkn.com)

design:

- zero dependency kitchen-sink utilities library - sorry, I wish it weren't so, JS made me do it
- mix of JS module environments - browser-only, Node-only, universal
- mostly small pure functions
- all TypeScript, for styles and Svelte and SvelteKit
  see <a href="https://github.com/fuz-dev/fuz">@ryanatkn/fuz</a>
- complements the modern web platform, drops legacy quickly
- kinda minimal in many ways but also not, treeshakes well

## usage

> [`npm i -D @ryanatkn/belt`](https://www.npmjs.com/package/@ryanatkn/belt)

```ts
// import full module paths:
import {type Result, unwrap} from '@ryanatkn/belt/result.js';
import {random_int} from '@ryanatkn/belt/random.js';
```

docs are a work in progress -
see the available modules at [belt.ryanatkn.com](https://belt.ryanatkn.com) and
[/src/routes/package.ts](https://github.com/ryanatkn/belt/blob/main/src/routes/package.ts),
I recommend reading the source code for now or asking an AI

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

My sister Lisa helped me with the logo -
[instagram.com/lisaeatkinson](https://www.instagram.com/lisaeatkinson/) -
she's a designer and currently looking for work

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

[MIT](LICENSE)
