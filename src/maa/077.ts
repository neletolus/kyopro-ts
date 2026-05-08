import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const X = new Array<number>(N);
    const Y = new Array<number>(N);
    for (let i = 0; i < N; i++) {
        const [xs, ys] = lines[i + 1]!.split(/\s+/);
        X[i] = parseInt(xs!, 10);
        Y[i] = parseInt(ys!, 10);
    }

    // 戦略 (次元分離 + 寄与法):
    // マンハッタン距離は |x_1 - x_2| + |y_1 - y_2| のように x と y で分離可能。
    //   Σ_{i<j} (|X_i - X_j| + |Y_i - Y_j|)
    // = Σ_{i<j} |X_i - X_j| + Σ_{i<j} |Y_i - Y_j|
    //
    // 各次元については 076 と同じく
    //   ソート → Σ_{k=1}^{N} A_k * (2k - N - 1)
    // で計算可能 (O(N log N))。
    //
    // 計算量: O(N log N)。
    //
    // 数値型について:
    //   |座標| ≤ 10^5、N ≤ 2*10^5 なので各次元の合計は最大
    //     ~ N^2 * |coord|_max ≈ 4*10^15
    //   safe integer (≈ 9*10^15) ぎりぎり。x+y で 8*10^15。BigInt で安全に。

    const sumDim = (vals: number[]): bigint => {
        vals.sort((a, b) => a - b);
        const Nb = BigInt(vals.length);
        let s = 0n;
        for (let k = 1; k <= vals.length; k++) {
            const coef = 2n * BigInt(k) - Nb - 1n;
            s += BigInt(vals[k - 1]!) * coef;
        }
        return s;
    };

    const ans = sumDim(X) + sumDim(Y);
    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
