import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const A = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));

    // 戦略 (ソート + 寄与法):
    // ソートして A_1 ≤ A_2 ≤ ... ≤ A_N に並べると、i < j のとき
    //   |A_i - A_j| = A_j - A_i
    // となるので 074 と同じ問題に帰着。寄与法より
    //   Σ_{i<j} (A_j - A_i) = Σ_{k=1}^{N} A_k * (2k - N - 1)
    //
    // 計算量: O(N log N) (ソート) + O(N) (集計)。
    //
    // 数値型について:
    //   |A_i| ≤ 10^8、N ≤ 2*10^5 なので総和は最大で
    //     ~ N^2 * |A|_max ≈ 4*10^16
    //   safe integer (≈ 9*10^15) を超えるので合計は BigInt で。
    //   ソートは number 同士で行ってよい (絶対値小さい)。

    A.sort((x, y) => x - y);

    const Nb = BigInt(N);
    let ans = 0n;
    for (let k = 1; k <= N; k++) {
        const coef = 2n * BigInt(k) - Nb - 1n;
        ans += BigInt(A[k - 1]!) * coef;
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
