import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);
    const X: bigint[] = new Array(N);
    const Y: bigint[] = new Array(N);
    for (let i = 0; i < N; i++) {
        const [xs, ys] = lines[i + 1]!.split(/\s+/);
        X[i] = BigInt(xs!);
        Y[i] = BigInt(ys!);
    }
    const [aStr, bStr] = lines[N + 1]!.split(/\s+/);
    const A = BigInt(aStr!);
    const B = BigInt(bStr!);

    // 戦略 (Ray casting / 半直線交差判定):
    // 点 (A, B) から右方向 (x 増加方向) に水平な半直線を伸ばし、多角形の各辺との交点数を
    // 数える。交点数が奇数なら内部、偶数なら外部。
    //
    // 各辺 (x1, y1) - (x2, y2) について:
    //   - 端点が水平線 y = B に対して上下に分かれる ((y1 > B) !== (y2 > B)) ときのみ交差。
    //   - 交点の x 座標は x_int = x1 + (B - y1) * (x2 - x1) / (y2 - y1)。
    //   - A < x_int であれば右方向の半直線が交わる。
    //   - 浮動小数を避けるため、両辺に (y2 - y1) を掛けて整数比較に変換:
    //       y2 > y1 のとき: (A - x1)(y2 - y1) < (B - y1)(x2 - x1)
    //       y2 < y1 のとき: 不等号反転
    //   - (y1 > B) !== (y2 > B) の判定 (片側を等号扱い) により y1 == B の頂点で
    //     上下のいずれか一方のみカウントされるため、矛盾なく交点数の偶奇が定まる。
    //   - 問題文の保証: 点 (A, B) は辺上になく、内角は 180° ではないため境界例は出ない。
    //
    // 数値型: 座標差の積は最大 4*10^18 で Number.MAX_SAFE_INTEGER (~9*10^15) を超えるため
    // BigInt を使用。
    //
    // 計算量: O(N)。N ≤ 10^5。

    let inside = false;
    for (let i = 0; i < N; i++) {
        const j = i + 1 === N ? 0 : i + 1;
        const x1 = X[i]!;
        const y1 = Y[i]!;
        const x2 = X[j]!;
        const y2 = Y[j]!;
        const above1 = y1 > B;
        const above2 = y2 > B;
        if (above1 !== above2) {
            const lhs = (A - x1) * (y2 - y1);
            const rhs = (B - y1) * (x2 - x1);
            if (y2 > y1) {
                if (lhs < rhs) inside = !inside;
            } else {
                if (lhs > rhs) inside = !inside;
            }
        }
    }
    console.log(inside ? "INSIDE" : "OUTSIDE");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
