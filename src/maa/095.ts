import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    let lp = 0;
    const N = parseInt(lines[lp++]!.trim(), 10);

    // 戦略 (クラスごとの累積和):
    // 1 組と 2 組それぞれに対し、prefix sum (S1[i], S2[i]) を作成する。
    //   S_c[i] = (1..i 番目の生徒のうちクラス c に属する者の点数合計)
    // クエリ [L, R] に対し、答えは S_c[R] - S_c[L-1]。
    //
    // 計算量: 前処理 O(N)、各クエリ O(1)、合計 O(N + Q)。
    // N, Q ≤ 10^5 で十分高速。
    //
    // I/O: 出力は Q 行 (最大 10^5) と多いので配列に貯めて一括出力。

    const S1 = new Int32Array(N + 1);
    const S2 = new Int32Array(N + 1);
    for (let i = 1; i <= N; i++) {
        const [cStr, pStr] = lines[lp++]!.split(/\s+/);
        const c = parseInt(cStr!, 10);
        const p = parseInt(pStr!, 10);
        S1[i] = S1[i - 1]! + (c === 1 ? p : 0);
        S2[i] = S2[i - 1]! + (c === 2 ? p : 0);
    }

    const Q = parseInt(lines[lp++]!.trim(), 10);
    const out: string[] = new Array(Q);
    for (let j = 0; j < Q; j++) {
        const [lStr, rStr] = lines[lp++]!.split(/\s+/);
        const L = parseInt(lStr!, 10);
        const R = parseInt(rStr!, 10);
        const a = S1[R]! - S1[L - 1]!;
        const b = S2[R]! - S2[L - 1]!;
        out[j] = `${a} ${b}`;
    }
    process.stdout.write(out.join("\n") + "\n");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
