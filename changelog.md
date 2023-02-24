# changelog

## 0.7.0

- **break**: remove the type `ClientId` and make it a plain string

## 0.6.0

- **break**: change `LogLevel` from an enum to a string type union,
  change its default to `info`, and add `toLogLevelValue` to convert it to a number
  ([#11](https://github.com/feltjs/util/pull/11))

## 0.5.3

- change all `$lib/` paths to be direct
  ([commit](https://github.com/feltjs/util/commit/c845c45a89a75cb4d2b56c4cde1bc0d4ef090f8a))

## 0.5.2

- fix published version for @feltjs this time for real
  ([#9](https://github.com/feltjs/util/pull/9))

## 0.5.1

- fix published version for @feltjs

## 0.5.0

- **break**: remove `$lib/env`
  ([#7](https://github.com/feltjs/util/pull/7))
- **break**: default log level to `import.meta.env.PUBLIC_LOG_LEVEL`
  instead of the obsolete `VITE_LOG_LEVEL`
  ([#7](https://github.com/feltjs/util/pull/7))
- **break**: remove exports `DEFAULT_LOG_LEVEL` and `ENV_LOG_LEVEL` from `$lib/log`
  ([#7](https://github.com/feltjs/util/pull/7))

## 0.4.1

- add `toNext` to `$lib/array`
  ([#5](https://github.com/feltjs/util/pull/5))

## 0.4.0

- **break**: rename `$lib/random-alea` from `$lib/random-seeded`
  and `toRandomAlea` from `toRandomSeeded`

## 0.3.0

- **break**: remove `toUuid`, use platform `crypto.randomUUID` instead
- remove `@lukeed/uuid` as a peer dep
- add `kleur` as a peer dep

## 0.2.1

- fix exports
  ([#3](https://github.com/feltjs/util/pull/3))

## 0.2.0

- **break**: require fully qualified imports for almost everything
  ([#2](https://github.com/feltjs/util/pull/2))
- **break**: change `getJsonType` in `$lib/json` to return `undefined` instead of throwing
  ([#2](https://github.com/feltjs/util/pull/2))
- **break**: rename camelCase filenames to dash-case,
  `$lib/path-parsing` from `$lib/pathParsing` and
  `$lib/random-seeded` from `$lib/randomSeed`
  ([#2](https://github.com/feltjs/util/pull/2))

## 0.1.0

- publish
  ([#1](https://github.com/feltjs/util/pull/1))
