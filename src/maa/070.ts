import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [nStr, kStr] = lines[0]!.split(/\s+/);
    const N = parseInt(nStr!, 10);
    const K = parseInt(kStr!, 10);
    const xs = new Array<number>(N);
    const ys = new Array<number>(N);
    for (let i = 0; i < N; i++) {
        const [xs_, ys_] = lines[i + 1]!.split(/\s+/);
        xs[i] = parseInt(xs_!, 10);
        ys[i] = parseInt(ys_!, 10);
    }

    // 戦略 (全列挙):
    // 最適な軸並行長方形の 4 辺は、それぞれいずれかの入力点を通っていてよい
    // (そうでなければ辺をその方向に縮めて面積を減らせる)。
    //
    // よって左/右の x 境界、下/上の y 境界をすべての点の座標から選び、
    // 各長方形について「内部 (辺上含む) の点数 ≥ K」を満たす最小面積を求める。
    //
    // 計算量:
    //   x 境界の組合せ O(N^2)、y 境界の組合せ O(N^2)、各組合せで点数を O(N) で
    //   数える → 合計 O(N^5) ≈ 50^5/4 ≈ 8*10^7。N=50 なら十分高速。
    //
    // 制約より x_i, y_i は全て相異なるので、長方形の左右の x が同じ
    // (= 1 列に並んだ点しか含まない) では K ≥ 2 を満たせない。
    // よって 4 重ループ内で xL < xR かつ yB < yT のときだけ評価する。
    //
    // 数値型について:
    //   座標 ≤ 10^9 なので辺の長さ ≤ 2*10^9。面積は最大 4*10^18 で
    //   safe integer (≈ 9*10^15) を超える → BigInt で持つ。

    let best: bigint | null = null;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const xL = xs[i]!;
            const xR = xs[j]!;
            if (xL >= xR) continue;
            for (let k = 0; k < N; k++) {
                for (let l = 0; l < N; l++) {
                    const yB = ys[k]!;
                    const yT = ys[l]!;
                    if (yB >= yT) continue;

                    let cnt = 0;
                    for (let p = 0; p < N; p++) {
                        const px = xs[p]!;
                        const py = ys[p]!;
                        if (px >= xL && px <= xR && py >= yB && py <= yT) {
                            cnt++;
                        }
                    }
                    if (cnt >= K) {
                        const area = BigInt(xR - xL) * BigInt(yT - yB);
                        if (best === null || area < best) best = area;
                    }
                }
            }
        }
    }

    console.log(best!.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
