# changelog

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
- **break**: change `getJsonType` in `json.ts` to return `undefined` instead of throwing
  ([#2](https://github.com/feltcoop/felt/pull/2))
- **break**: rename camelCase filenames to dash-case,
  `path-parsing.ts` from `pathParsing.ts` and
  `random-seeded.ts` from `randomSeed.ts`
  ([#2](https://github.com/feltcoop/felt/pull/2))

## 0.1.0

- publish
  ([#1](https://github.com/feltcoop/felt/pull/1))
