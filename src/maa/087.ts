import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());

    // 戦略 (積の分離 + 等差数列の和):
    // Σ_{i=1..N} Σ_{j=1..N} ij = (Σ_{i=1..N} i) * (Σ_{j=1..N} j) = (N(N+1)/2)^2
    //
    // mod 10^9+7 を取って出力する。
    //
    // 数値型: N ≤ 10^9 より N(N+1) ≤ 10^18, その 2 乗は ~10^36 となるため BigInt を使用。
    //
    // 計算量: O(1)。

    const MOD = 1000000007n;
    const s = (N * (N + 1n)) / 2n; // 1+2+...+N
    const sm = s % MOD;
    const ans = (sm * sm) % MOD;
    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
