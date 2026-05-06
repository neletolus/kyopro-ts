import * as fs from "fs";

const main = (input: string) => {
    const [nStr, xStr, yStr] = input.trim().split(/\s+/);
    const N = parseInt(nStr!, 10);
    const X = parseInt(xStr!, 10);
    const Y = parseInt(yStr!, 10);

    // 戦略:
    // (0,0) から N 回ちょうどの上下左右移動で (X,Y) に到達できるかの判定。
    //
    // 1) 到達可能距離 (マンハッタン距離):
    //    最短でも |X| + |Y| 回の移動が必要なので、
    //      |X| + |Y| ≤ N
    //    でなければ不可能。
    //
    // 2) パリティ:
    //    1 回の移動で座標和 (x+y) の偶奇は必ず反転する。
    //    よって N 回後の (x+y) の偶奇は N の偶奇と一致する必要がある。
    //    すなわち
    //      (|X| + |Y|) ≡ N (mod 2)
    //    でなければ不可能 (|X|+|Y| と X+Y は偶奇が一致するので絶対値で OK)。
    //
    // 余りの 2k 回は同じ場所を 2 手かけて往復すれば消化できる ((右,左) など)
    // ので、上記 2 条件を満たせば必ず到達可能。
    //
    // 数値型について:
    //   |X|+|Y| ≤ 2*10^9 で safe integer に十分収まるため number で OK。

    const dist = Math.abs(X) + Math.abs(Y);

    if (dist <= N && (N - dist) % 2 === 0) {
        console.log("Yes");
    } else {
        console.log("No");
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
