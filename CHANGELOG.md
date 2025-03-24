# @ryanatkn/belt

## 0.30.0

### Minor Changes

- rename `Thunk` from `Lazy` and `unthunk` from `lazy` ([5e36e11](https://github.com/ryanatkn/belt/commit/5e36e11))

## 0.29.1

### Patch Changes

- add `Class_Constructor` to `types.ts` ([dc8f0b9](https://github.com/ryanatkn/belt/commit/dc8f0b9))

## 0.29.0

### Minor Changes

- change `is_editable` to match all inputs except hidden ones ([4889274](https://github.com/ryanatkn/belt/commit/4889274))

### Patch Changes

- add `is_interactive` ([4889274](https://github.com/ryanatkn/belt/commit/4889274))

## 0.28.0

### Minor Changes

- disable colors by default for better runtime compat - ([1972e95](https://github.com/ryanatkn/belt/commit/1972e95))
  call `set_colors(styleText)` from `print.ts`,
  in Node `import {styleText} from 'node:util';`

## 0.27.6

### Patch Changes

- add `strip_ansi` string util ([ffb7587](https://github.com/ryanatkn/belt/commit/ffb7587))

## 0.27.5

### Patch Changes

- export `st` from `print.ts` ([95fe446](https://github.com/ryanatkn/belt/commit/95fe446))

## 0.27.4

### Patch Changes

- tweak logging outputs again ([2cc4100](https://github.com/ryanatkn/belt/commit/2cc4100))
- tweak logging outputs once more ([2e2fb84](https://github.com/ryanatkn/belt/commit/2e2fb84))

## 0.27.3

### Patch Changes

- tweak logging outputs ([d292845](https://github.com/ryanatkn/belt/commit/d292845))

## 0.27.2

### Patch Changes

- change the debug char ([6876ebc](https://github.com/ryanatkn/belt/commit/6876ebc))

## 0.27.1

### Patch Changes

- improve log symbols and consistency ([28371a1](https://github.com/ryanatkn/belt/commit/28371a1))

## 0.27.0

### Minor Changes

- add `esm-env` optional dep and default logger to debug ([9c8d8af](https://github.com/ryanatkn/belt/commit/9c8d8af))

## 0.26.1

### Patch Changes

- improve `Json` types, adding `Json_Primitive`, `Json_Object`, and `Json_Array` ([9db9a1d](https://github.com/ryanatkn/belt/commit/9db9a1d))

## 0.26.0

### Minor Changes

- remove `obtainable` ([#39](https://github.com/ryanatkn/belt/pull/39))

## 0.25.3

### Patch Changes

- add more docs ([ddcda63](https://github.com/ryanatkn/belt/commit/ddcda63))

## 0.25.2

### Patch Changes

- add optional peer dep `@types/node` to fix disabled TS `skipLibCheck` ([578f632](https://github.com/ryanatkn/belt/commit/578f632))

## 0.25.1

### Patch Changes

- add logo ([#37](https://github.com/ryanatkn/belt/pull/37))
- add `throttle` ([#38](https://github.com/ryanatkn/belt/pull/38))

## 0.25.0

### Minor Changes

- rework the `Logger` API ([#36](https://github.com/ryanatkn/belt/pull/36))
- remove `$lib/styletext.ts` ([#36](https://github.com/ryanatkn/belt/pull/36))
- move `print_log_label` to `$lib/print.ts` from `$lib/log.ts` ([#36](https://github.com/ryanatkn/belt/pull/36))
- bump required node version to `20.17` ([#36](https://github.com/ryanatkn/belt/pull/36))

## 0.24.12

### Patch Changes

- add `unreachable` error helper ([b794c07](https://github.com/ryanatkn/belt/commit/b794c07))

## 0.24.11

### Patch Changes

- fix: exit on uncaught exceptions by default ([8e2e91a](https://github.com/ryanatkn/belt/commit/8e2e91a))

## 0.24.10

### Patch Changes

- add `despawn_all` to `process.ts` ([#35](https://github.com/ryanatkn/belt/pull/35))
- fix `attach_process_error_handlers` API to only handle exceptions ([#35](https://github.com/ryanatkn/belt/pull/35))

## 0.24.9

### Patch Changes

- fix `embed_json` for multiline strings ([dac5852](https://github.com/ryanatkn/belt/commit/dac5852))

## 0.24.8

### Patch Changes

- change `embed_json` to support multiline strings ([d173206](https://github.com/ryanatkn/belt/commit/d173206))

## 0.24.7

### Patch Changes

- improve `slugify` ([#34](https://github.com/ryanatkn/belt/pull/34))

  - add the arg `map_special_characters` to optionally disable the expensive special character mappings
  - improve performance with benchmarks

## 0.24.6

### Patch Changes

- add `slugify` to `paths.ts` ([c77cbe2](https://github.com/ryanatkn/belt/commit/c77cbe2))

## 0.24.5

### Patch Changes

- improve hsl parsing to allow hsl prefix ([#33](https://github.com/ryanatkn/belt/pull/33))

## 0.24.4

### Patch Changes

- publish src files ([9af61b0](https://github.com/ryanatkn/belt/commit/9af61b0))
- add tsconfig `sourceRoot` ([459eb8a](https://github.com/ryanatkn/belt/commit/459eb8a))

## 0.24.3

### Patch Changes

- enable tsconfig `declaration` and `declarationMap` ([cbe3e31](https://github.com/ryanatkn/belt/commit/cbe3e31))

## 0.24.2

### Patch Changes

- add `embed_json` helper for embedding parsed json strings in js ([f5c02c0](https://github.com/ryanatkn/belt/commit/f5c02c0))

## 0.24.1

### Patch Changes

- fix timings type to correctly include `undefined` for unfinished ones ([603bfe4](https://github.com/ryanatkn/belt/commit/603bfe4))

## 0.24.0

### Minor Changes

- rename `UUID_MATCHER` from `uuid_matcher` for consistency ([f974a64](https://github.com/ryanatkn/belt/commit/f974a64))

### Patch Changes

- add `sideEffects` to `package.json` ([8f8c5bd](https://github.com/ryanatkn/belt/commit/8f8c5bd))

## 0.23.0

### Minor Changes

- remove `kleur` dependency for Node's `styleText` and wrap it with `$lib/styletext.ts` ([#29](https://github.com/ryanatkn/belt/pull/29))

### Patch Changes

- upgrade gro with correctly formatted exports ([744b984](https://github.com/ryanatkn/belt/commit/744b984))

## 0.22.0

### Minor Changes

- support `node@20.12` and later ([8ee3346](https://github.com/ryanatkn/belt/commit/8ee3346))

## 0.21.1

### Patch Changes

- fix hsl parsing for modern comma-less form ([963c536](https://github.com/ryanatkn/belt/commit/963c536))

## 0.21.0

### Minor Changes

- upgrade `node@22.3` ([#28](https://github.com/ryanatkn/belt/pull/28))
- rename `count_graphemes` from `to_grapheme_count` and use `Intl.Segmenter` without a fallback ([f9f62e0](https://github.com/ryanatkn/belt/commit/f9f62e0))

### Patch Changes

- add `count_iterator` ([b02e33a](https://github.com/ryanatkn/belt/commit/b02e33a))

## 0.20.10

### Patch Changes

- add `format_url` and module `$lib/url.ts` ([1843c6c](https://github.com/ryanatkn/belt/commit/1843c6c))

## 0.20.9

### Patch Changes

- fix `is_editable` ([ab395cd](https://github.com/ryanatkn/belt/commit/ab395cd))

## 0.20.8

### Patch Changes

- add `inside_editable` and tweak `is_editable` logic to use `getAttribute` ([8dc7d81](https://github.com/ryanatkn/belt/commit/8dc7d81))

## 0.20.7

### Patch Changes

- fix contentEditable detection in `is_editable` ([8ed886d](https://github.com/ryanatkn/belt/commit/8ed886d))

## 0.20.6

### Patch Changes

- add `$lib/async.ts#is_promise` ([a5d3bb6](https://github.com/ryanatkn/belt/commit/a5d3bb6))

## 0.20.5

### Patch Changes

- change `parse_hsl_string` to parse values with alpha ([37e7094](https://github.com/ryanatkn/belt/commit/37e7094))

## 0.20.4

### Patch Changes

- add `$lib/colors.ts` ([#27](https://github.com/ryanatkn/belt/pull/27))

## 0.20.3

### Patch Changes

- use '\_' for print number separator instead of ',' ([9ef6700](https://github.com/ryanatkn/belt/commit/9ef6700))

## 0.20.2

### Patch Changes

- relax fetch_value token type to accept null ([a14e4ee](https://github.com/ryanatkn/belt/commit/a14e4ee))

## 0.20.1

### Patch Changes

- rename to belt ([a8ac0af](https://github.com/ryanatkn/belt/commit/a8ac0af))

## 0.20.0

### Minor Changes

- move orgs to @ryanatkn from @grogarden ([#26](https://github.com/ryanatkn/belt/pull/26))

## 0.19.3

### Patch Changes

- improve some array types to handle readonly arrays ([23e739c](https://github.com/ryanatkn/belt/commit/23e739c))

## 0.19.2

### Patch Changes

- add `Pick_Union` and `Keyof_Union` type helpers ([6e6ac53](https://github.com/ryanatkn/belt/commit/6e6ac53))

## 0.19.1

### Patch Changes

- add `Array_Element` type helper ([940ec97](https://github.com/ryanatkn/belt/commit/940ec97))

## 0.19.0

### Minor Changes

- remove `print_causes` ([#25](https://github.com/ryanatkn/belt/pull/25))

### Patch Changes

- change `print_ms` to include separators at thousands ([#25](https://github.com/ryanatkn/belt/pull/25))
- support custom colors for printing values ([#25](https://github.com/ryanatkn/belt/pull/25))
- change print_ms to include separators at thousands was provided ([#25](https://github.com/ryanatkn/belt/pull/25))

## 0.18.3

### Patch Changes

- return headers from `fetch_value` ([#24](https://github.com/ryanatkn/belt/pull/24))

## 0.18.2

### Patch Changes

- add a default 'content-type' header for `fetch_value` ([2126d03](https://github.com/ryanatkn/belt/commit/2126d03))

## 0.18.1

### Patch Changes

- add `fetch_value` ([#22](https://github.com/ryanatkn/belt/pull/22))

## 0.18.0

### Minor Changes

- remove random_char ([fc99da6](https://github.com/ryanatkn/belt/commit/fc99da6))

## 0.17.0

### Minor Changes

- unpublish package.ts ([6ff3df5](https://github.com/ryanatkn/belt/commit/6ff3df5))

## 0.16.1

### Patch Changes

- add `random_char` helper ([8353169](https://github.com/ryanatkn/belt/commit/8353169))

## 0.16.0

### Minor Changes

- rename to `Proper_Snakes` ([#21](https://github.com/ryanatkn/belt/pull/21))

## 0.15.4

### Patch Changes

- add `public: true,` to `package.json` ([47e32d6](https://github.com/ryanatkn/belt/commit/47e32d6))

## 0.15.3

### Patch Changes

- upgrade `@ryanatkn/gro` which adds `modules` to `package.ts` ([4b0fc13](https://github.com/ryanatkn/belt/commit/4b0fc13))

## 0.15.2

### Patch Changes

- add shuffle ([5c6dd69](https://github.com/ryanatkn/belt/commit/5c6dd69))

## 0.15.1

### Patch Changes

- publish $routes/package.ts ([753a787](https://github.com/ryanatkn/belt/commit/753a787))

## 0.15.0

### Minor Changes

- fix global_spawn name ([530641a](https://github.com/ryanatkn/belt/commit/530641a))

### Patch Changes

- deprecate obtainable ([d123ff9](https://github.com/ryanatkn/belt/commit/d123ff9))

## 0.14.0

### Minor Changes

- fix some snake_case ([#20](https://github.com/ryanatkn/belt/pull/20))
- bump node engine to 20.10 ([#20](https://github.com/ryanatkn/belt/pull/20))
- upgrade to @ryanatkn/gro@0.86 from @feltjs/gro@0.83 ([#20](https://github.com/ryanatkn/belt/pull/20))
- add `spawn_out` to process ([#20](https://github.com/ryanatkn/belt/pull/20))

## 0.13.1

### Patch Changes

- fix exports ([d62b1bf](https://github.com/ryanatkn/belt/commit/d62b1bf))

## 0.13.0

### Minor Changes

- missed a spot renaming create_stopwatch ([e373d3a](https://github.com/ryanatkn/belt/commit/e373d3a))

## 0.12.0

### Minor Changes

- switch to `snake_case` ([#19](https://github.com/ryanatkn/belt/pull/19))

## 0.11.0

### Minor Changes

- increment timing keys instead of throwing ([#18](https://github.com/ryanatkn/belt/pull/18))

## 0.10.1

### Patch Changes

- fix PUBLIC_LOG_LEVEL env var usage ([286aa46](https://github.com/ryanatkn/belt/commit/286aa46))
- move to belt.ryanatkn.com from util.felt.dev ([db08052](https://github.com/ryanatkn/belt/commit/db08052))

## 0.10.0

### Minor Changes

- upgrade gro ([#17](https://github.com/ryanatkn/belt/pull/17))
- rename to `@ryanatkn/belt` from `@feltjs/util` ([#17](https://github.com/ryanatkn/belt/pull/17))

## 0.9.1

- add `noop_async` and `resolved` function helpers
  ([commit](https://github.com/ryanatkn/belt/commit/a1f53ec07e50ffdb9763e1fcaf1a02af97302157))

## 0.9.0

- **break**: support only deep imports
  ([#16](https://github.com/ryanatkn/belt/pull/16))
- **break**: remove `nulls` and `undefineds` from `$lib/object.ts`
  ([#16](https://github.com/ryanatkn/belt/pull/16))

## 0.8.3

- fix `is_editable` to return `true` only for actually editable inputs
  ([#15](https://github.com/ryanatkn/belt/pull/15))

## 0.8.2

- add `is_iframed` helper to `$lib/dom.ts`
  ([#14](https://github.com/ryanatkn/belt/pull/14))

## 0.8.1

- loosen the types of `EMPTY_OBJECT` and `swallow`
  ([#13](https://github.com/ryanatkn/belt/pull/13))

## 0.8.0

- rename log's `trace` to `debug`
  ([#12](https://github.com/ryanatkn/belt/pull/12))

## 0.7.5

- fix root exports to omit modules with Node dependencies
  ([commit](https://github.com/ryanatkn/belt/commit/7fb6fd1279df284bbb319a984c299018d4472c80))

## 0.7.4

- fix root exports to not use `$lib`
  ([commit](https://github.com/ryanatkn/belt/commit/ae12e44814b2331883820413080ea9570d57fa5c))

## 0.7.3

- publish everything from the root
  ([commit](https://github.com/ryanatkn/belt/commit/8a7b3b0e16908b27f52563c9b3151eda47615ba5))

## 0.7.2

- add `handle_target_value` to `$lib/dom.ts`
  ([commit](https://github.com/ryanatkn/belt/commit/37d99fc73c577229ae5c5fc87dde8d238950826e))

## 0.7.1

- make `select` elements count for `is_editable`
  ([commit](https://github.com/ryanatkn/belt/commit/202026ad248b0f337d84ff3521948fd299104d6e))

## 0.7.0

- **break**: remove the type `ClientId` and make it a plain string
  ([commit](https://github.com/ryanatkn/belt/commit/b02ffa709e08b56d15988be4292928a24893695f))

## 0.6.0

- **break**: change `Log_Level` from an enum to a string type union,
  change its default to `info`, and add `to_log_level_value` to convert it to a number
  ([#11](https://github.com/ryanatkn/belt/pull/11))

## 0.5.3

- change all `$lib/` paths to be direct
  ([commit](https://github.com/ryanatkn/belt/commit/c845c45a89a75cb4d2b56c4cde1bc0d4ef090f8a))

## 0.5.2

- fix published version for @feltjs this time for real
  ([#9](https://github.com/ryanatkn/belt/pull/9))

## 0.5.1

- fix published version for @feltjs

## 0.5.0

- **break**: remove `$lib/env`
  ([#7](https://github.com/ryanatkn/belt/pull/7))
- **break**: default log level to `import.meta.env.PUBLIC_LOG_LEVEL`
  instead of the obsolete `VITE_LOG_LEVEL`
  ([#7](https://github.com/ryanatkn/belt/pull/7))
- **break**: remove exports `DEFAULT_LOG_LEVEL` and `ENV_LOG_LEVEL` from `$lib/log`
  ([#7](https://github.com/ryanatkn/belt/pull/7))

## 0.4.1

- add `to_next` to `$lib/array`
  ([#5](https://github.com/ryanatkn/belt/pull/5))

## 0.4.0

- **break**: rename `$lib/random-alea` from `$lib/random-seeded`
  and `create_random_alea` from `toRandomSeeded`

## 0.3.0

- **break**: remove `toUuid`, use platform `crypto.randomUUID` instead
- remove `@lukeed/uuid` as a peer dep
- add `kleur` as a peer dep

## 0.2.1

- fix exports
  ([#3](https://github.com/ryanatkn/belt/pull/3))

## 0.2.0

- **break**: require fully qualified imports for almost everything
  ([#2](https://github.com/ryanatkn/belt/pull/2))
- **break**: change `to_json_type` in `$lib/json` to return `undefined` instead of throwing
  ([#2](https://github.com/ryanatkn/belt/pull/2))
- **break**: rename camelCase filenames to dash-case,
  `$lib/path` from `$lib/pathParsing` and
  `$lib/random-seeded` from `$lib/randomSeed`
  ([#2](https://github.com/ryanatkn/belt/pull/2))

## 0.1.0

- publish
  ([#1](https://github.com/ryanatkn/belt/pull/1))
