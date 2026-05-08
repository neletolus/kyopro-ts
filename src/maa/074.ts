import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const A = lines[1]!.split(/\s+/).map((s) => BigInt(s));

    // 戦略 (寄与法):
    // S = Σ_{i<j} (A_j - A_i) について、各 A_k の寄与を数える。
    //   - A_k が大きい側 (j=k) として登場するペア数: k-1 個 (小さい i は 1..k-1)
    //   - A_k が小さい側 (i=k) として登場するペア数: N-k 個 (大きい j は k+1..N)
    //   よって A_k の係数 = (k-1) - (N-k) = 2k - N - 1
    //
    // ⇒ S = Σ_{k=1}^{N} A_k * (2k - N - 1)
    //
    // 計算量: O(N) (1 ループで合計)。
    //
    // 数値型について:
    //   N ≤ 2*10^5, A_k ≤ 10^6, 係数 ≤ N。総和は最大で
    //     ~ N * (N/2) * max(A) ≈ 2*10^16
    //   safe integer (≈ 9*10^15) を超えるので BigInt で計算する。

    const Nb = BigInt(N);
    let ans = 0n;
    for (let k = 1; k <= N; k++) {
        const coef = 2n * BigInt(k) - Nb - 1n;
        ans += A[k - 1]! * coef;
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
