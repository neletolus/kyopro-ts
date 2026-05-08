import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [, kStr] = lines[0]!.split(/\s+/);
    const K = parseInt(kStr!, 10);
    const A = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));

    // 戦略:
    // ちょうど K 回の ±1 操作で数列を全てゼロにできるか判定。
    //
    // 観察:
    //   各 A_i ≥ 0 なので、A_i を 0 にするには最低 A_i 回 (-1 を A_i 回) 必要。
    //   よって全要素をゼロにする最小操作数は S = ΣA_i。
    //
    //   操作数が S を超える場合、その差 K - S は「+1 してから -1 する」のように
    //   ペアで使い切る必要がある (どこかで +1 した分は別の操作で -1 して打ち消す
    //   必要がある)。
    //   従って K - S は偶数でなければならない。
    //
    // 判定:
    //   K >= S かつ (K - S) % 2 == 0 → Yes
    //   それ以外                       → No
    //
    // 数値型について:
    //   N, K, A_i ≤ 50 で S ≤ 2500 なので number で完全に収まる。

    const S = A.reduce((a, b) => a + b, 0);

    if (K >= S && (K - S) % 2 === 0) {
        console.log("Yes");
    } else {
        console.log("No");
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
