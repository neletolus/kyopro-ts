import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const A = lines[1]!.split(/\s+/).map((s) => BigInt(s));
    const MOD = 1000000007n;

    // 戦略 (寄与法 / 主役の数え上げ):
    // 入力 A はすでに昇順 (A_1 < A_2 < ... < A_N)。
    // 部分集合 S (空でない) の最大値は max(S) = A_i のとき、A_i ∈ S かつ
    // A_j ∈ S を満たす j はすべて j ≤ i。さらに max を A_i にするには
    // A_i は確定で含み、A_1,...,A_{i-1} は自由 (含む/含まない)、
    // A_{i+1},...,A_N は含まない。
    //
    // よって A_i (1-indexed) が最大値となる部分集合の個数は 2^(i-1)。
    //   Σ_{i=1}^{N} A_i * 2^(i-1)   (mod 10^9 + 7)
    //
    // 計算量: O(N)。2^(i-1) は逐次倍にして持つ。
    //
    // 数値型について:
    //   A_i ≤ 10^9 と pow2 (mod 後) ≤ 10^9 の積は 10^18 で safe integer 超え。
    //   よって BigInt で積算する。

    let ans = 0n;
    let pow2 = 1n; // 2^0
    for (let i = 0; i < N; i++) {
        ans = (ans + A[i]! * pow2) % MOD;
        pow2 = (pow2 * 2n) % MOD;
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
