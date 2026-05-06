import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());
    const MOD = 1000000000n; // 10^9 (注意: 10^9 + 7 ではない)

    // 戦略:
    // フィボナッチ数列 a_1 = a_2 = 1, a_n = a_{n-1} + a_{n-2} の第 N 項を
    // mod 10^9 で求める。N ≤ 10^18 なので O(N) の素朴ループは不可。
    //
    // 行列の繰り返し二乗法を使う。フィボナッチの遷移は 2x2 行列で表せて、
    //   [a_{n+1}]   [1 1] [a_n    ]
    //   [a_n    ] = [1 0] [a_{n-1}]
    // なので M = [[1,1],[1,0]] に対し
    //   M^n = [[a_{n+1}, a_n], [a_n, a_{n-1}]]
    // となる。よって M^(N-1) を計算すれば左上の要素が a_N。
    //
    // 行列積: O(1) (2x2 固定)、繰り返し二乗法: O(log N)。
    //
    // 数値型について:
    //   要素は MOD 未満 (< 10^9) だが、行列積で (10^9)^2 = 10^18 の中間値が出る。
    //   safe integer 上限 (≈ 9*10^15) を超えるため BigInt が必要。
    //   N も 10^18 なので BigInt。
    //
    // 出力について:
    //   問題文に「先頭ゼロは付けない」とあるが、BigInt#toString は元々
    //   先頭ゼロを付けないので、そのまま出力すれば要件を満たす。

    // 2x2 行列を flat な [a, b, c, d] = [[a,b],[c,d]] として扱う
    type Mat = [bigint, bigint, bigint, bigint];

    const mul = (A: Mat, B: Mat): Mat => {
        const [a, b, c, d] = A;
        const [e, f, g, h] = B;
        return [
            (a * e + b * g) % MOD,
            (a * f + b * h) % MOD,
            (c * e + d * g) % MOD,
            (c * f + d * h) % MOD,
        ];
    };

    // 行列の繰り返し二乗法 M^exp mod MOD
    const matpow = (M: Mat, exp: bigint): Mat => {
        // 単位行列 I
        let result: Mat = [1n, 0n, 0n, 1n];
        let base: Mat = M;
        while (exp > 0n) {
            if (exp & 1n) result = mul(result, base);
            base = mul(base, base);
            exp >>= 1n;
        }
        return result;
    };

    // M = [[1,1],[1,0]]
    const M: Mat = [1n, 1n, 1n, 0n];

    // a_N = (M^(N-1))[0][0]
    const Mn = matpow(M, N - 1n);
    const ans = Mn[0];

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
