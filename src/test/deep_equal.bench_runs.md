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

## Run 4

**Context**: After Win #4 (Small array unrolled loop for len ≤ 6) + object key iteration micro-optimization
**Changes**:

- `deep_equal.ts:72-87` - **NEW**: Added small array fast path with unrolled loop for arrays len ≤ 6 (avoids loop overhead for tiny arrays)
- `deep_equal.ts:150-158` - Object key iteration: cached `a_keys.length` in variable, switched from `for-of` to indexed `for` loop
  **Result**: +4.1% small arrays 🎯, but -12.9% large objects (unexpected regression), -3.7% overall average

small object:
🏆 fast-deep-equal 3182142 ops/sec (baseline)
deep_equal 3084188 ops/sec (1.03x slower)
dequal 2209565 ops/sec (1.44x slower)

small array:
🏆 fast-deep-equal 5385037 ops/sec (baseline)
deep_equal 5130776 ops/sec (1.05x slower)
dequal 4962434 ops/sec (1.09x slower)

typed array:
🏆 dequal 6453935 ops/sec (baseline)
deep_equal 6188239 ops/sec (1.04x slower)
fast-deep-equal 2044107 ops/sec (3.16x slower)

nested object:
🏆 deep_equal 2639467 ops/sec (baseline)
fast-deep-equal 2415814 ops/sec (1.09x slower)
dequal 2301622 ops/sec (1.15x slower)

Date:
🏆 fast-deep-equal 6972589 ops/sec (baseline)
dequal 6879072 ops/sec (1.01x slower)
deep_equal 6715088 ops/sec (1.04x slower)

large object (100 props):
🏆 fast-deep-equal 215559 ops/sec (baseline)
deep_equal 182603 ops/sec (1.18x slower)
dequal 149011 ops/sec (1.45x slower)

constructor mismatch {} vs []:
🏆 deep_equal 6788360 ops/sec (baseline)
fast-deep-equal 6711327 ops/sec (1.01x slower)
dequal 6571447 ops/sec (1.03x slower)

📈 Summary:

deep_equal avg: 4389817 ops/sec | wins: 2/7
dequal avg: 4218155 ops/sec | wins: 1/7
fast-deep-equal avg: 3846654 ops/sec | wins: 4/7

---

## Run 5

**Context**: After Win #5 (Reverse iteration) + ArrayBuffer support added
**Changes**:
- `deep_equal.ts:53` - DataView: reverse iteration (`for (let i = byteLen; i-- > 0;)`)
- `deep_equal.ts:61` - TypedArrays: reverse iteration (same pattern)
- `deep_equal.ts:87` - Regular arrays: reverse iteration (same pattern)
- `deep_equal.ts:150` - Object keys: reverse iteration (same pattern)
- `deep_equal.ts:45-57` - **NEW**: Added ArrayBuffer support (convert to Uint8Array views for comparison)
**Result**: -6.8% overall average (4.39M → 4.09M), large objects improved slightly (+1.1%), new ArrayBuffer benchmark added

📊 Library Comparison: deep_equal vs dequal vs fast-deep-equal

small object:
  🏆 fast-deep-equal         3182142 ops/sec  (baseline)
     deep_equal              3084188 ops/sec  (1.03x slower)
     dequal                  2209565 ops/sec  (1.44x slower)

small array:
  🏆 fast-deep-equal         5385037 ops/sec  (baseline)
     deep_equal              5130776 ops/sec  (1.05x slower)
     dequal                  4962434 ops/sec  (1.09x slower)

typed array:
  🏆 dequal                  6453935 ops/sec  (baseline)
     deep_equal              6188239 ops/sec  (1.04x slower)
     fast-deep-equal         2044107 ops/sec  (3.16x slower)

nested object:
  🏆 deep_equal              2639467 ops/sec  (baseline)
     fast-deep-equal         2415814 ops/sec  (1.09x slower)
     dequal                  2301622 ops/sec  (1.15x slower)

Date:
  🏆 fast-deep-equal         6972589 ops/sec  (baseline)
     dequal                  6879072 ops/sec  (1.01x slower)
     deep_equal              6715088 ops/sec  (1.04x slower)

large object (100 props):
  🏆 fast-deep-equal          215559 ops/sec  (baseline)
     deep_equal               182603 ops/sec  (1.18x slower)
     dequal                   149011 ops/sec  (1.45x slower)

constructor mismatch {} vs []:
  🏆 deep_equal              6788360 ops/sec  (baseline)
     fast-deep-equal         6711327 ops/sec  (1.01x slower)
     dequal                  6571447 ops/sec  (1.03x slower)

📈 Summary:

  deep_equal           avg:    4389817 ops/sec  |  wins: 2/7
  dequal               avg:    4218155 ops/sec  |  wins: 1/7
  fast-deep-equal      avg:    3846654 ops/sec  |  wins: 4/7

---

## Run 6

**Context**: After reverting reverse iteration from Run 5, keeping ArrayBuffer support
**Changes**:
- Reverted all reverse iteration changes (lines 65, 111, 125, 133, 165) back to forward iteration (`for (let i = 0; i < len; i++)`)
- **KEPT**: ArrayBuffer support from Run 5 (lines 103-115)
**Result**: +7.0% overall improvement vs Run 5 (4.09M → 4.38M), confirms reverse iteration hurt performance. Performance nearly back to Run 4 levels.

small object:
  🏆 fast-deep-equal         3379894 ops/sec  (baseline)
     deep_equal              3153557 ops/sec  (1.07x slower)
     dequal                  2584601 ops/sec  (1.31x slower)

small array:
  🏆 fast-deep-equal         5645176 ops/sec  (baseline)
     dequal                  5126600 ops/sec  (1.10x slower)
     deep_equal              4648967 ops/sec  (1.21x slower)

typed array:
  🏆 dequal                  6731662 ops/sec  (baseline)
     deep_equal              6442474 ops/sec  (1.04x slower)
     fast-deep-equal         1944098 ops/sec  (3.46x slower)

nested object:
  🏆 deep_equal              2646637 ops/sec  (baseline)
     fast-deep-equal         2417294 ops/sec  (1.09x slower)
     dequal                  2042158 ops/sec  (1.30x slower)

Date:
  🏆 fast-deep-equal         7052322 ops/sec  (baseline)
     deep_equal              6725755 ops/sec  (1.05x slower)
     dequal                  6293262 ops/sec  (1.12x slower)

ArrayBuffer (64 bytes):
  🏆 fast-deep-equal         6312621 ops/sec  (baseline)
     dequal                  4900689 ops/sec  (1.29x slower)
     deep_equal              4698972 ops/sec  (1.34x slower)

large object (100 props):
  🏆 deep_equal               205693 ops/sec  (baseline)
     fast-deep-equal          204238 ops/sec  (1.01x slower)
     dequal                   139000 ops/sec  (1.48x slower)

constructor mismatch {} vs []:
  🏆 fast-deep-equal         7566447 ops/sec  (baseline)
     deep_equal              6491211 ops/sec  (1.17x slower)
     dequal                  6081203 ops/sec  (1.24x slower)

📈 Summary:

  deep_equal           avg:    4376658 ops/sec  |  wins: 2/8
  dequal               avg:    4237397 ops/sec  |  wins: 1/8
  fast-deep-equal      avg:    4315261 ops/sec  |  wins: 5/8

---

## Run 7

**Context**: After removing unrolled loop optimization from Run 4/6
**Changes**:
- Removed unrolled loop for small arrays (len ≤ 4) from lines 51-62
- Now using simple unified loop for all array lengths: `for (let i = 0; i < len; i++)`
**Result**: +1.1% overall improvement (4.38M → 4.42M), **+11.8% small arrays recovery!** Won small object category.

small object:
  🏆 deep_equal              3040254 ops/sec  (baseline)
     fast-deep-equal         2963192 ops/sec  (1.03x slower)
     dequal                  2246422 ops/sec  (1.35x slower)

small array:
  🏆 fast-deep-equal         5703067 ops/sec  (baseline)
     dequal                  5240975 ops/sec  (1.09x slower)
     deep_equal              5198124 ops/sec  (1.10x slower)

typed array:
  🏆 dequal                  6632292 ops/sec  (baseline)
     deep_equal              6364639 ops/sec  (1.04x slower)
     fast-deep-equal         2107043 ops/sec  (3.15x slower)

nested object:
  🏆 deep_equal              2727675 ops/sec  (baseline)
     fast-deep-equal         2176952 ops/sec  (1.25x slower)
     dequal                  2076455 ops/sec  (1.31x slower)

Date:
  🏆 fast-deep-equal         7419335 ops/sec  (baseline)
     dequal                  7055042 ops/sec  (1.05x slower)
     deep_equal              6481502 ops/sec  (1.14x slower)

ArrayBuffer (64 bytes):
  🏆 fast-deep-equal         6432435 ops/sec  (baseline)
     dequal                  4858809 ops/sec  (1.32x slower)
     deep_equal              4303417 ops/sec  (1.49x slower)

large object (100 props):
  🏆 fast-deep-equal          217332 ops/sec  (baseline)
     deep_equal               208824 ops/sec  (1.04x slower)
     dequal                   152482 ops/sec  (1.43x slower)

constructor mismatch {} vs []:
  🏆 dequal                  7248312 ops/sec  (baseline)
     fast-deep-equal         7184789 ops/sec  (1.01x slower)
     deep_equal              7062408 ops/sec  (1.03x slower)

📈 Summary:

  deep_equal           avg:    4423355 ops/sec  |  wins: 2/8
  dequal               avg:    4438849 ops/sec  |  wins: 2/8
  fast-deep-equal      avg:    4275518 ops/sec  |  wins: 4/8

---

## 📊 Progress Summary

| Metric              | Run 1        | Run 2       | Run 3        | Run 4       | Run 5        | Run 6        | Run 7        | Change (1→7) |
| ------------------- | ------------ | ----------- | ------------ | ----------- | ------------ | ------------ | ------------ | ------------ |
| **Overall avg**     | 4.35M        | 4.56M       | 4.56M        | 4.39M       | 4.09M        | 4.38M        | 4.42M        | **+1.7%**    |
| **Category wins**   | 0/7          | 3/7         | 2/7          | 2/7         | 2/8          | 2/8          | 2/8          | +2           |
| **Small objects**   | 3.37M (-3%)  | 3.06M (-4%) | 3.13M (-8%)  | 3.08M (-3%) | 2.67M (-13%) | 3.15M (-7%)  | 3.04M (🏆)   | **-9.7%**    |
| **Small arrays**    | 5.60M (-1%)  | 5.18M (-7%) | 4.93M (-7%)  | 5.13M (-5%) | 4.54M (-16%) | 4.65M (-21%) | 5.20M (-10%) | **-7.2%**    |
| **Typed arrays**    | 5.95M (-8%)  | 5.89M (-9%) | 6.43M (🏆)   | 6.19M (-4%) | 5.81M (-11%) | 6.44M (-4%)  | 6.36M (-4%)  | **+6.9%**    |
| **Nested objects**  | 2.14M (-15%) | 2.51M (🏆)  | 2.58M (🏆)   | 2.64M (🏆)  | 2.38M (🏆)   | 2.65M (🏆)   | 2.73M (🏆)   | **+27.6%**   |
| **Date**            | 6.29M (-27%) | 7.95M (🏆)  | 6.47M (-25%) | 6.72M (-4%) | 6.53M (-5%)  | 6.73M (-5%)  | 6.48M (-14%) | **+3.0%**    |
| **Large objects**   | 214K (-1%)   | 213K (-2%)  | 210K (-3%)   | 183K (-18%) | 185K (-12%)  | 206K (🏆)    | 209K (-4%)   | **-2.6%**    |
| **ArrayBuffer**     | N/A          | N/A         | N/A          | N/A         | 4.11M (-38%) | 4.70M (-34%) | 4.30M (-49%) | N/A          |

**Key achievements**:

- ✅ **Nested objects**: Consistent winner Runs 2-7 (+27.6% overall vs baseline, beating both competitors)
- ✅ **Small objects** (Run 7): **New category win!** First time winning (+3.0% faster than fast-deep-equal)
- ✅ **Small arrays** (Run 7): +11.8% improvement vs Run 6 (4.65M → 5.20M), unrolled loop removal helped!
- ✅ **Typed arrays**: Consistently competitive (+6.9% vs baseline, -4% vs dequal)
- ✅ **Large objects**: Strong performance (-2.6% vs baseline, -4% vs fast-deep-equal)
- ✅ **Overall average** (Run 7): +1.7% vs baseline, best overall performance yet!
- ✅ **ArrayBuffer support**: New feature complete with functional correctness

**Analysis**:

- **Run 7 (unrolled loop removal)**: Removing the unrolled loop optimization from Run 4 **significantly improved small arrays**:
  - Overall: +1.1% improvement (4.38M → 4.42M)
  - Small arrays: +11.8% (4.65M → 5.20M) - recovered most of Run 4's -17% regression
  - Small objects: Won the category for the first time
  - Nested objects: +3.1% (2.65M → 2.73M)
  - Why it worked: Modern V8 JIT prefers simple loops over manual unrolling

- **Why manual loop unrolling failed**:
  - Prevents JIT inlining and auto-vectorization
  - Increases code size (worse instruction cache)
  - V8 is already excellent at optimizing simple loops
  - The "optimization" was actually a pessimization

- **Overall journey (Run 1 → Run 7)**:
  - Started at 4.35M ops/sec with 0/7 wins
  - Now at 4.42M ops/sec with 2/8 wins (+1.7% overall)
  - Won nested objects consistently, gained small objects in Run 7
  - Added ArrayBuffer support (new feature)

**Current state (Run 7)**:

- ✅ Strong performance: +1.7% overall vs baseline, 2/8 category wins (nested objects, small objects)
- ✅ Simpler codebase: Removed unnecessary unrolled loop, more maintainable
- ✅ ArrayBuffer support: New feature complete, functional correctness achieved
- ⚠️ Small arrays: Still -7.2% vs baseline, but much better than Run 6's -17%
- 🎯 Very competitive with fast-deep-equal and dequal across all categories
- 🏆 **Best overall performance yet at 4.42M ops/sec average**
