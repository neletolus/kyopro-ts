import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());
    const MOD = 1000000007n; // 10^9 + 7

    // 戦略:
    // トリボナッチ数列 a_1=1, a_2=1, a_3=2, a_n = a_{n-1}+a_{n-2}+a_{n-3} (n≥4)
    // の第 N 項 (mod 10^9+7) を求める。N ≤ 10^18 なので O(N) ループは不可
    // → 行列の繰り返し二乗法を 3x3 に拡張する。
    //
    // 遷移を行列で書くと
    //   [a_{n+1}]   [1 1 1] [a_n    ]
    //   [a_n    ] = [1 0 0] [a_{n-1}]
    //   [a_{n-1}]   [0 1 0] [a_{n-2}]
    // M = [[1,1,1],[1,0,0],[0,1,0]] とおくと
    //   [a_n, a_{n-1}, a_{n-2}]^T = M^(n-3) * [a_3, a_2, a_1]^T
    //                             = M^(n-3) * [2, 1, 1]^T
    // よって
    //   a_N = M^(N-3)[0][0]*2 + M^(N-3)[0][1]*1 + M^(N-3)[0][2]*1
    //
    // 制約 N ≥ 4 より N-3 ≥ 1 なので exp は常に正。
    //
    // 計算量: 3x3 行列積は 27 回の掛け算で O(1)、繰り返し二乗法 O(log N) ≈ 60。
    // 全体 ≈ 1600 回程度の BigInt 演算で十分高速。
    //
    // 数値型について:
    //   行列積の中間値で (10^9)^2 * 3 ≈ 3*10^18 が現れて safe integer を超える。
    //   よって BigInt が必要。N も 10^18 なので BigInt で扱う。

    // 3x3 行列を flat な長さ 9 配列で扱う: M[i][j] = m[3*i + j]
    type Mat = bigint[];

    const mul = (A: Mat, B: Mat): Mat => {
        const C: Mat = new Array<bigint>(9);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let s = 0n;
                for (let k = 0; k < 3; k++) {
                    s += A[3 * i + k]! * B[3 * k + j]!;
                }
                C[3 * i + j] = s % MOD;
            }
        }
        return C;
    };

    // 行列の繰り返し二乗法 M^exp mod MOD
    const matpow = (M: Mat, exp: bigint): Mat => {
        // 単位行列
        let result: Mat = [1n, 0n, 0n, 0n, 1n, 0n, 0n, 0n, 1n];
        let base: Mat = M.slice();
        while (exp > 0n) {
            if (exp & 1n) result = mul(result, base);
            base = mul(base, base);
            exp >>= 1n;
        }
        return result;
    };

    // M = [[1,1,1],[1,0,0],[0,1,0]]
    const M: Mat = [1n, 1n, 1n, 1n, 0n, 0n, 0n, 1n, 0n];

    // M^(N-3) を計算し、0行目と [a_3, a_2, a_1] = [2, 1, 1] の内積
    const Mn = matpow(M, N - 3n);
    const ans = (Mn[0]! * 2n + Mn[1]! + Mn[2]!) % MOD;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
