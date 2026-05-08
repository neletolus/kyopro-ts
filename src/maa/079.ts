import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());

    // 戦略 (構成的に上界を達成):
    // i mod P_i ≤ i - 1  (P_i ≤ i のとき) または ≤ i (P_i > i のとき余りは i 自身)
    // ただし i mod P_i = i となるのは P_i > i のときに限り、その値は i。
    //
    // 巡回置換 P_i = i+1 (i = 1..N-1), P_N = 1 を取ると、
    //   M_i = i mod (i+1) = i  (i = 1..N-1)
    //   M_N = N mod 1 = 0
    // 合計 = 1 + 2 + ... + (N-1) = N(N-1)/2
    //
    // これが上界であることも示せる:
    //   M_i ≤ i かつ M_i ≤ P_i - 1。
    //   M_i = i となる i は P_i > i を要するが、各値は permutation で 1 度しか現れず、
    //   どこかで P_j ≤ j となる j が必ずあり、合計は N(N-1)/2 を超えられない。
    //
    // 計算量: O(1)。N ≤ 10^9 なので積は最大 ~10^18 となり、BigInt を使用。

    const ans = (N * (N - 1n)) / 2n;
    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
