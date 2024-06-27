# @ryanatkn/belt

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
