import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const T = Number(lines[0]);
    const N = Number(lines[1]);

    // いもす法用の差分配列
    // 従業員 i は時刻 t+0.5 (L_i ≤ t+0.5 ≤ R_i ⇔ L_i ≤ t ≤ R_i-1) に在籍
    // → diff[L_i] += 1, diff[R_i] -= 1
    const diff: number[] = new Array(T + 1).fill(0);
    for (let i = 0; i < N; i++) {
        const [L, R] = lines[2 + i]!.split(" ").map(Number) as [number, number];
        diff[L]! += 1;
        diff[R]! -= 1;
    }

    // 累積和を取りながら各時刻 t+0.5 の人数を求める
    const output: string[] = new Array(T);
    let count = 0;
    for (let t = 0; t < T; t++) {
        count += diff[t]!;
        output[t] = String(count);
    }

    console.log(output.join("\n"));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());