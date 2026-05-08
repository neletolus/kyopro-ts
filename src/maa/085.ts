import * as fs from "fs";

const main = (input: string) => {
    const [nStr, xStr, yStr] = input.trim().split(/\s+/);
    const N = parseInt(nStr!, 10);
    const X = parseInt(xStr!, 10);
    const Y = parseInt(yStr!, 10);

    // 戦略 (3 重ループ + d を式から決定):
    // a, b, c をそれぞれ 1..N で全探索。
    // a + b + c + d = X より d = X - a - b - c が一意に決まる。
    // 1 ≤ d ≤ N かつ a*b*c*d = Y を満たすかを確認。
    //
    // 計算量: O(N^3)。N ≤ 300 で 2.7*10^7 程度。
    //
    // 枝刈り:
    //   - a*b*c > Y なら abcd ≥ abc (d ≥ 1) より必ず Y を超える → 内側ループ break。
    //   - X < 4 または X > 4N の場合は和が達成不能 → 即 No。
    //
    // 数値型: 積の最大は N^4 = 300^4 = 8.1*10^9 で Number.MAX_SAFE_INTEGER (~9*10^15) に
    // 収まる。Y ≤ 10^9 との比較も問題なし。

    if (X < 4 || X > 4 * N) {
        console.log("No");
        return;
    }

    for (let a = 1; a <= N; a++) {
        if (a > Y) break;
        for (let b = 1; b <= N; b++) {
            const ab = a * b;
            if (ab > Y) break;
            for (let c = 1; c <= N; c++) {
                const abc = ab * c;
                if (abc > Y) break;
                const d = X - a - b - c;
                if (d < 1 || d > N) continue;
                if (abc * d === Y) {
                    console.log("Yes");
                    return;
                }
            }
        }
    }
    console.log("No");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
