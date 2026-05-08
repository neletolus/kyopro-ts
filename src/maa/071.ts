import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const a: bigint[] = new Array(N);
    const b: bigint[] = new Array(N);
    const c: bigint[] = new Array(N);
    for (let i = 0; i < N; i++) {
        const [ai, bi, ci] = lines[i + 1]!.split(/\s+/);
        a[i] = BigInt(ai!);
        b[i] = BigInt(bi!);
        c[i] = BigInt(ci!);
    }

    // 戦略 (2 変数 LP の頂点列挙):
    // 制約 a_i x + b_i y ≤ c_i (a_i, b_i, c_i > 0) の下で x+y の最大化。
    // 問題の保証より、最適解は x, y > 0 の象限内にあり、実行可能領域の
    // 頂点 (= 2 本の制約の交点) で達成される。
    //
    // よって全ペア (i, j) について連立方程式
    //   a_i x + b_i y = c_i
    //   a_j x + b_j y = c_j
    // を解いて交点 (x, y) を得る (det = a_i*b_j - a_j*b_i ≠ 0 のとき):
    //   x = (c_i*b_j - c_j*b_i) / det
    //   y = (a_i*c_j - a_j*c_i) / det
    //
    // 交点が x≥0, y≥0 を満たし、かつ全ての他の制約も満たすなら実行可能頂点。
    // その中で x+y が最大のものが答え。
    //
    // 計算量: O(N^3)、N=500 で約 1.25*10^8 回。十分間に合う。
    //
    // 数値精度:
    //   a*b は最大 10^18 で safe integer (≈9*10^15) を超えるため、
    //   det / 分子の計算は BigInt で完全精度に。
    //   実行可能性チェックも不等式 a_k x + b_k y ≤ c_k を det 倍して
    //     det > 0: a_k*xnum + b_k*ynum ≤ c_k*det
    //   とすれば BigInt で厳密に評価できる (det を正に正規化済み)。
    //   最終答えだけ Number に変換 (相対誤差 ~2^-52 で 10^-6 余裕)。

    let bestNum = 0n; // 最良の (xnum + ynum)
    let bestDen = 1n; // 最良の det (常に > 0 になるよう正規化)
    let found = false;

    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            let det = a[i]! * b[j]! - a[j]! * b[i]!;
            if (det === 0n) continue;

            let xnum = c[i]! * b[j]! - c[j]! * b[i]!;
            let ynum = a[i]! * c[j]! - a[j]! * c[i]!;

            // det を正に正規化 (符号を分子に押し付ける)
            if (det < 0n) {
                det = -det;
                xnum = -xnum;
                ynum = -ynum;
            }

            // x ≥ 0, y ≥ 0
            if (xnum < 0n || ynum < 0n) continue;

            // 他の制約の実行可能性チェック (det > 0 なので向き反転なし)
            //   a_k * xnum + b_k * ynum ≤ c_k * det
            let feasible = true;
            for (let k = 0; k < N; k++) {
                const lhs = a[k]! * xnum + b[k]! * ynum;
                const rhs = c[k]! * det;
                if (lhs > rhs) {
                    feasible = false;
                    break;
                }
            }
            if (!feasible) continue;

            // (xnum + ynum) / det が x+y。比較は cross multiplication で:
            //   bestNum/bestDen < (xnum+ynum)/det
            //   ⇔ bestNum * det < (xnum+ynum) * bestDen   (両 den > 0)
            const sumNum = xnum + ynum;
            if (!found || bestNum * det < sumNum * bestDen) {
                bestNum = sumNum;
                bestDen = det;
                found = true;
            }
        }
    }

    // BigInt → Number に変換 (相対誤差 < 2^-52)
    const ans = Number(bestNum) / Number(bestDen);
    console.log(ans.toFixed(10));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
