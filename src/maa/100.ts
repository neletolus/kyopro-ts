import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const Q = parseInt(lines[0]!, 10);

    // 戦略 (3x3 行列累乗):
    // 1 秒後の状態は線形変換:
    //   a' = a(1 - X) + bY
    //   b' = b(1 - Y) + cZ
    //   c' = c(1 - Z) + aX
    // 行列で書くと M = [[1-X, Y, 0], [0, 1-Y, Z], [X, 0, 1-Z]] となり
    // T 秒後の状態ベクトルは M^T * [1, 1, 1]^T。
    //
    // 行列の T 乗を繰り返し二乗法で計算: 1 クエリあたり O(27 * log T)。
    // Q ≤ 10^4, log_2(10^7) ≈ 24 なので合計 ~6*10^6 演算で十分高速。
    //
    // 浮動小数誤差: 各列の和が 1 (質量保存) のため繰り返し乗算でも要素は [0, 1] に
    // 収まり、誤差が指数的に増大しない。24 回程度の乗算で 10^-7 程度の誤差は許容範囲。
    //
    // 出力: Q 行が大きいので配列に貯めて一括出力。

    type Mat = Float64Array; // 長さ 9、行優先 [r*3+c]

    const matMul = (A: Mat, B: Mat, R: Mat) => {
        for (let i = 0; i < 3; i++) {
            const a0 = A[i * 3]!;
            const a1 = A[i * 3 + 1]!;
            const a2 = A[i * 3 + 2]!;
            for (let j = 0; j < 3; j++) {
                R[i * 3 + j] = a0 * B[j]! + a1 * B[3 + j]! + a2 * B[6 + j]!;
            }
        }
    };

    const matPow = (M: Mat, n: number): Mat => {
        // 単位行列で初期化
        const result = new Float64Array(9);
        result[0] = 1;
        result[4] = 1;
        result[8] = 1;
        const base = new Float64Array(M);
        const tmp = new Float64Array(9);
        let e = n;
        while (e > 0) {
            if (e & 1) {
                matMul(result, base, tmp);
                result.set(tmp);
            }
            matMul(base, base, tmp);
            base.set(tmp);
            e = Math.floor(e / 2);
        }
        return result;
    };

    const out: string[] = new Array(Q);
    for (let q = 0; q < Q; q++) {
        const parts = lines[q + 1]!.split(/\s+/);
        const X = parseFloat(parts[0]!);
        const Y = parseFloat(parts[1]!);
        const Z = parseFloat(parts[2]!);
        const T = parseInt(parts[3]!, 10);

        const M = new Float64Array([1 - X, Y, 0, 0, 1 - Y, Z, X, 0, 1 - Z]);
        const P = matPow(M, T);

        // v0 = [1, 1, 1] なので a' = 行 0 の和、b' = 行 1 の和、c' = 行 2 の和
        const a = P[0]! + P[1]! + P[2]!;
        const b = P[3]! + P[4]! + P[5]!;
        const c = P[6]! + P[7]! + P[8]!;
        out[q] = `${a} ${b} ${c}`;
    }
    process.stdout.write(out.join("\n") + "\n");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
