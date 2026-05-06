import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());
    const MOD = 1000000007n; // 10^9 + 7

    // 戦略:
    // 漸化式 a_1 = a_2 = 1, a_n = 2*a_{n-1} + a_{n-2} の第 N 項 (mod 10^9+7) を求める。
    // N ≤ 10^18 なので O(N) ループは不可 → 行列の繰り返し二乗法。
    //
    // 遷移を行列で書くと
    //   [a_{n+1}]   [2 1] [a_n    ]
    //   [a_n    ] = [1 0] [a_{n-1}]
    // よって M = [[2,1],[1,0]] とおくと
    //   [a_n, a_{n-1}]^T = M^(n-2) * [a_2, a_1]^T = M^(n-2) * [1, 1]^T
    //
    // 第 N 項は M^(N-2) を計算して 0 行目と [1,1] の内積を取れば良い:
    //   a_N = M^(N-2)[0][0] + M^(N-2)[0][1]
    //
    // 制約 N ≥ 3 より N-2 ≥ 1 なので exp は常に正。
    //
    // 計算量: 行列積 O(1) (2x2) × 繰り返し二乗法 O(log N) ≈ 60 回。
    //
    // 数値型について:
    //   各要素は MOD 未満 (< 10^9) だが、行列積の中間値で
    //   (10^9)^2 + (10^9)^2 ≈ 2*10^18 が現れて safe integer を超える。
    //   よって BigInt が必要。N も 10^18 なので BigInt で扱う。

    type Mat = [bigint, bigint, bigint, bigint]; // [[a,b],[c,d]]

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
        let result: Mat = [1n, 0n, 0n, 1n]; // 単位行列
        let base: Mat = M;
        while (exp > 0n) {
            if (exp & 1n) result = mul(result, base);
            base = mul(base, base);
            exp >>= 1n;
        }
        return result;
    };

    // M = [[2,1],[1,0]]
    const M: Mat = [2n, 1n, 1n, 0n];

    // a_N = M^(N-2)[0][0] * a_2 + M^(N-2)[0][1] * a_1 = Mn[0] + Mn[1]
    const Mn = matpow(M, N - 2n);
    const ans = (Mn[0] + Mn[1]) % MOD;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
