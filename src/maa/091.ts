import * as fs from "fs";

const main = (input: string) => {
    const [nStr, xStr] = input.trim().split(/\s+/);
    const N = parseInt(nStr!, 10);
    const X = parseInt(xStr!, 10);

    // 戦略 (a, b の二重ループで c を一意に決める):
    // 1 ≤ a < b < c ≤ N かつ a + b + c = X。
    // a, b を全探索すれば c = X - a - b が一意に定まるので、b < c ≤ N を確認すればよい。
    // (a < b は外側ループの範囲で保証)
    //
    // 計算量: O(N^2)。N ≤ 100 なので 10^4 で十分。

    let count = 0;
    for (let a = 1; a <= N; a++) {
        for (let b = a + 1; b <= N; b++) {
            const c = X - a - b;
            if (c > b && c <= N) count++;
        }
    }
    console.log(count);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
