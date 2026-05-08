import * as fs from "fs";

const main = (input: string) => {
    const N = parseInt(input.trim(), 10);

    // 戦略 (貪欲法):
    // 額面が大きい順 (10000, 5000, 1000) に取れるだけ使う。
    // 10000 = 5000 * 2 = 1000 * 10、5000 = 1000 * 5 と倍数関係になっているため、
    // 大きい額面を 1 枚減らして小さい額面で補う場合は枚数が必ず増える。
    // よって貪欲解が最小となる。
    //
    // N は 1000 の倍数なので k = N / 1000 として、
    //   10000 札: floor(k / 10), 残り r1 = k % 10
    //   5000 札:  floor(r1 / 5), 残り r2 = r1 % 5
    //   1000 札:  r2
    //
    // 計算量: O(1)。

    const k = N / 1000;
    const c10000 = Math.floor(k / 10);
    const r1 = k % 10;
    const c5000 = Math.floor(r1 / 5);
    const c1000 = r1 % 5;
    console.log(c10000 + c5000 + c1000);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
