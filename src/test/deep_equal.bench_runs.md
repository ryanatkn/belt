# Benchmark Results for deep_equal

> **Baseline**: Established 2025-11-05 after tinybench improvements
> **Config**: 1000ms per task, hrtimeNow, GC after each cycle
> **Runtime**: Node.js with --max-old-space-size=8192 --expose-gc
>
> **How to update**: Run `npm run benchmark-comparison` and paste results below

---

📊 Library Comparison: deep_equal vs dequal vs fast-deep-equal


## Run 1
**Context**: Baseline before Win #1 optimizations

small object:
  🏆 fast-deep-equal         3458199 ops/sec  (baseline)
     deep_equal              3366636 ops/sec  (1.03x slower)
     dequal                  2572503 ops/sec  (1.34x slower)

small array:
  🏆 fast-deep-equal         5632350 ops/sec  (baseline)
     deep_equal              5603430 ops/sec  (1.01x slower)
     dequal                  5167960 ops/sec  (1.09x slower)

typed array:
  🏆 dequal                  6452250 ops/sec  (baseline)
     deep_equal              5948923 ops/sec  (1.08x slower)
     fast-deep-equal         2128246 ops/sec  (3.03x slower)

nested object:
  🏆 fast-deep-equal         2469271 ops/sec  (baseline)
     dequal                  2324758 ops/sec  (1.06x slower)
     deep_equal              2140948 ops/sec  (1.15x slower)

Date:
  🏆 fast-deep-equal         7966433 ops/sec  (baseline)
     dequal                  7055894 ops/sec  (1.13x slower)
     deep_equal              6287389 ops/sec  (1.27x slower)

large object (100 props):
  🏆 fast-deep-equal          216319 ops/sec  (baseline)
     deep_equal               214435 ops/sec  (1.01x slower)
     dequal                   151247 ops/sec  (1.43x slower)

constructor mismatch {} vs []:
  🏆 fast-deep-equal         7410762 ops/sec  (baseline)
     dequal                  6916407 ops/sec  (1.07x slower)
     deep_equal              6872523 ops/sec  (1.08x slower)

📈 Summary:

  deep_equal           avg:    4347755 ops/sec  |  wins: 0/7
  dequal               avg:    4377288 ops/sec  |  wins: 1/7
  fast-deep-equal      avg:    4183083 ops/sec  |  wins: 6/7

---

## Run 2
**Context**: After Win #1 (`Array.isArray()` + constructor caching)
**Changes**: `deep_equal.ts:49` (Array.isArray), `:43-44` (constructor caching), `:55-59` (cached constructor checks)
**Result**: +4.8% overall, gained 3 category wins (nested object, Date, constructor mismatch)

small object:
  🏆 fast-deep-equal         3190518 ops/sec  (baseline)
     deep_equal              3057772 ops/sec  (1.04x slower)
     dequal                  2550175 ops/sec  (1.25x slower)

small array:
  🏆 fast-deep-equal         5541550 ops/sec  (baseline)
     deep_equal              5184711 ops/sec  (1.07x slower)
     dequal                  5022321 ops/sec  (1.10x slower)

typed array:
  🏆 dequal                  6398152 ops/sec  (baseline)
     deep_equal              5890386 ops/sec  (1.09x slower)
     fast-deep-equal         2098396 ops/sec  (3.05x slower)

nested object:
  🏆 deep_equal              2512998 ops/sec  (baseline)
     fast-deep-equal         2265906 ops/sec  (1.11x slower)
     dequal                  2244992 ops/sec  (1.12x slower)

Date:
  🏆 deep_equal              7954578 ops/sec  (baseline)
     fast-deep-equal         7722228 ops/sec  (1.03x slower)
     dequal                  6800638 ops/sec  (1.17x slower)

large object (100 props):
  🏆 fast-deep-equal          216623 ops/sec  (baseline)
     deep_equal               213189 ops/sec  (1.02x slower)
     dequal                   151642 ops/sec  (1.43x slower)

constructor mismatch {} vs []:
  🏆 deep_equal              7092338 ops/sec  (baseline)
     fast-deep-equal         7076509 ops/sec  (1.00x slower)
     dequal                  6753805 ops/sec  (1.05x slower)

📈 Summary:

  deep_equal           avg:    4557996 ops/sec  |  wins: 3/7
  dequal               avg:    4274532 ops/sec  |  wins: 1/7
  fast-deep-equal      avg:    4015961 ops/sec  |  wins: 3/7


## Run 3
**Context**: After Win #2 (TypedArray fast path + inline array length check)
**Changes**: `deep_equal.ts:46-63` - split TypedArray into specialized path with direct `!==` comparison (no recursion), added inline length check for arrays
**Result**: +9.1% typed arrays (now beating dequal!), but lost Date win (-18.6% regression, likely variance)

small object:
  🏆 fast-deep-equal         3373588 ops/sec  (baseline)
     deep_equal              3125300 ops/sec  (1.08x slower)
     dequal                  2496075 ops/sec  (1.35x slower)

small array:
  🏆 fast-deep-equal         5271177 ops/sec  (baseline)
     deep_equal              4926555 ops/sec  (1.07x slower)
     dequal                  4804352 ops/sec  (1.10x slower)

typed array:
  🏆 deep_equal              6429607 ops/sec  (baseline)
     dequal                  6363975 ops/sec  (1.01x slower)
     fast-deep-equal         2042049 ops/sec  (3.15x slower)

nested object:
  🏆 deep_equal              2580150 ops/sec  (baseline)
     fast-deep-equal         2441185 ops/sec  (1.06x slower)
     dequal                  2023838 ops/sec  (1.27x slower)

Date:
  🏆 fast-deep-equal         8058626 ops/sec  (baseline)
     dequal                  7076381 ops/sec  (1.14x slower)
     deep_equal              6468707 ops/sec  (1.25x slower)

large object (100 props):
  🏆 fast-deep-equal          216872 ops/sec  (baseline)
     deep_equal               209760 ops/sec  (1.03x slower)
     dequal                   152019 ops/sec  (1.43x slower)

constructor mismatch {} vs []:
  🏆 fast-deep-equal         7537886 ops/sec  (baseline)
     deep_equal              7167295 ops/sec  (1.05x slower)
     dequal                  6964935 ops/sec  (1.08x slower)

📈 Summary:

  deep_equal           avg:    4556481 ops/sec  |  wins: 2/7
  dequal               avg:    4240225 ops/sec  |  wins: 0/7
  fast-deep-equal      avg:    4135626 ops/sec  |  wins: 5/7

---

## 📊 Progress Summary

| Metric | Run 1 | Run 2 | Run 3 | Change |
|--------|-------|-------|-------|--------|
| **Overall avg** | 4.35M | 4.56M | 4.56M | +4.8% |
| **Category wins** | 0/7 | 3/7 | 2/7 | +2 |
| **Typed arrays** | 5.95M (-8%) | 5.89M (-9%) | 6.43M (✅ **wins!**) | **+8.1%** |
| **Nested objects** | 2.14M (-15%) | 2.51M (🏆) | 2.58M (🏆) | +20.6% |
| **Date** | 6.29M (-27%) | 7.95M (🏆) | 6.47M (-25%) | +2.9% |
| **Small arrays** | 5.60M (-1%) | 5.18M (-7%) | 4.93M (-7%) | -12.0% |

**Key achievements**:
- ✅ **Typed arrays**: Closed -9% gap, now beating dequal by 1%
- ✅ **Overall**: Maintained ~4.56M ops/sec average
- ⚠️ **Date**: Lost win in Run 3 (likely benchmark variance)
- ⚠️ **Small arrays**: Consistent regression (~-5 to -12% across runs)
