# changelog

## 0.4.1

- add `toNext` to `$lib/array`
  ([#5](https://github.com/feltcoop/felt/pull/5))

## 0.4.0

- **break**: rename `$lib/random-alea` from `$lib/random-seeded`
  and `toRandomAlea` from `toRandomSeeded`

## 0.3.0

- **break**: remove `toUuid`, use platform `crypto.randomUUID` instead
- remove `@lukeed/uuid` as a peer dep
- add `kleur` as a peer dep

## 0.2.1

- fix exports
  ([#3](https://github.com/feltcoop/felt/pull/3))

## 0.2.0

- **break**: require fully qualified imports for almost everything
  ([#2](https://github.com/feltcoop/felt/pull/2))
- **break**: change `getJsonType` in `$lib/json` to return `undefined` instead of throwing
  ([#2](https://github.com/feltcoop/felt/pull/2))
- **break**: rename camelCase filenames to dash-case,
  `$lib/path-parsing` from `$lib/pathParsing` and
  `$lib/random-seeded` from `$lib/randomSeed`
  ([#2](https://github.com/feltcoop/felt/pull/2))

## 0.1.0

- publish
  ([#1](https://github.com/feltcoop/felt/pull/1))
