# @grogarden/util

## 0.15.4

### Patch Changes

- 47e32d6: add `public: true,` to `package.json`

## 0.15.3

### Patch Changes

- 4b0fc13: upgrade `@grogarden/gro` which adds `modules` to `package.ts`

## 0.15.2

### Patch Changes

- 5c6dd69: add shuffle

## 0.15.1

### Patch Changes

- 753a787: publish $lib/package.ts

## 0.15.0

### Minor Changes

- 530641a: fix global_spawn name

### Patch Changes

- d123ff9: deprecate obtainable

## 0.14.0

### Minor Changes

- be72efa: fix some snake_case
- be72efa: bump node engine to 20.7
- be72efa: upgrade to @grogarden/gro@0.86 from @feltjs/gro@0.83
- be72efa: add `spawn_out` to process

## 0.13.1

### Patch Changes

- d62b1bf: fix exports

## 0.13.0

### Minor Changes

- e373d3a: missed a spot renaming create_stopwatch

## 0.12.0

### Minor Changes

- 823d8ab: switch to `snake_case`

## 0.11.0

### Minor Changes

- d7f4dc9: increment timing keys instead of throwing

## 0.10.1

### Patch Changes

- 286aa46: fix PUBLIC_LOG_LEVEL env var usage
- db08052: move to util.grogarden.org from util.felt.dev

## 0.10.0

### Minor Changes

- 87109aa: upgrade gro
- 87109aa: rename to `@grogarden/util` from `@feltjs/util`

## 0.9.1

- add `noop_async` and `resolved` function helpers
  ([commit](https://github.com/grogarden/util/commit/a1f53ec07e50ffdb9763e1fcaf1a02af97302157))

## 0.9.0

- **break**: support only deep imports
  ([#16](https://github.com/grogarden/util/pull/16))
- **break**: remove `nulls` and `undefineds` from `$lib/object.ts`
  ([#16](https://github.com/grogarden/util/pull/16))

## 0.8.3

- fix `is_editable` to return `true` only for actually editable inputs
  ([#15](https://github.com/grogarden/util/pull/15))

## 0.8.2

- add `is_iframed` helper to `$lib/dom.ts`
  ([#14](https://github.com/grogarden/util/pull/14))

## 0.8.1

- loosen the types of `EMPTY_OBJECT` and `swallow`
  ([#13](https://github.com/grogarden/util/pull/13))

## 0.8.0

- rename log's `trace` to `debug`
  ([#12](https://github.com/grogarden/util/pull/12))

## 0.7.5

- fix root exports to omit modules with Node dependencies
  ([commit](https://github.com/grogarden/util/commit/7fb6fd1279df284bbb319a984c299018d4472c80))

## 0.7.4

- fix root exports to not use `$lib`
  ([commit](https://github.com/grogarden/util/commit/ae12e44814b2331883820413080ea9570d57fa5c))

## 0.7.3

- publish everything from the root
  ([commit](https://github.com/grogarden/util/commit/8a7b3b0e16908b27f52563c9b3151eda47615ba5))

## 0.7.2

- add `handle_target_value` to `$lib/dom.ts`
  ([commit](https://github.com/grogarden/util/commit/37d99fc73c577229ae5c5fc87dde8d238950826e))

## 0.7.1

- make `select` elements count for `is_editable`
  ([commit](https://github.com/grogarden/util/commit/202026ad248b0f337d84ff3521948fd299104d6e))

## 0.7.0

- **break**: remove the type `ClientId` and make it a plain string
  ([commit](https://github.com/grogarden/util/commit/b02ffa709e08b56d15988be4292928a24893695f))

## 0.6.0

- **break**: change `LogLevel` from an enum to a string type union,
  change its default to `info`, and add `to_log_level_value` to convert it to a number
  ([#11](https://github.com/grogarden/util/pull/11))

## 0.5.3

- change all `$lib/` paths to be direct
  ([commit](https://github.com/grogarden/util/commit/c845c45a89a75cb4d2b56c4cde1bc0d4ef090f8a))

## 0.5.2

- fix published version for @feltjs this time for real
  ([#9](https://github.com/grogarden/util/pull/9))

## 0.5.1

- fix published version for @feltjs

## 0.5.0

- **break**: remove `$lib/env`
  ([#7](https://github.com/grogarden/util/pull/7))
- **break**: default log level to `import.meta.env.PUBLIC_LOG_LEVEL`
  instead of the obsolete `VITE_LOG_LEVEL`
  ([#7](https://github.com/grogarden/util/pull/7))
- **break**: remove exports `DEFAULT_LOG_LEVEL` and `ENV_LOG_LEVEL` from `$lib/log`
  ([#7](https://github.com/grogarden/util/pull/7))

## 0.4.1

- add `to_next` to `$lib/array`
  ([#5](https://github.com/grogarden/util/pull/5))

## 0.4.0

- **break**: rename `$lib/random-alea` from `$lib/random-seeded`
  and `create_random_alea` from `toRandomSeeded`

## 0.3.0

- **break**: remove `toUuid`, use platform `crypto.randomUUID` instead
- remove `@lukeed/uuid` as a peer dep
- add `kleur` as a peer dep

## 0.2.1

- fix exports
  ([#3](https://github.com/grogarden/util/pull/3))

## 0.2.0

- **break**: require fully qualified imports for almost everything
  ([#2](https://github.com/grogarden/util/pull/2))
- **break**: change `to_json_type` in `$lib/json` to return `undefined` instead of throwing
  ([#2](https://github.com/grogarden/util/pull/2))
- **break**: rename camelCase filenames to dash-case,
  `$lib/path` from `$lib/pathParsing` and
  `$lib/random-seeded` from `$lib/randomSeed`
  ([#2](https://github.com/grogarden/util/pull/2))

## 0.1.0

- publish
  ([#1](https://github.com/grogarden/util/pull/1))
