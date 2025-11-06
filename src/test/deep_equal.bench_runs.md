# Benchmark Results for deep_equal

> **Baseline**: Established 2025-11-05 after tinybench improvements
> **Config**: 1000ms per task, hrtimeNow, GC after each cycle
> **Runtime**: Node.js with --max-old-space-size=8192 --expose-gc
>
> **How to update**: Run `npm run benchmark-comparison` and paste results below

---

📊 Library Comparison: deep_equal vs dequal vs fast-deep-equal


## Run 1

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
