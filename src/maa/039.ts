import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [N, Q] = lines[0]!.split(" ").map(Number) as [number, number];

    // いもす法用の差分配列 (1-indexed で扱うため長さ N+2)
    const diff: number[] = new Array(N + 2).fill(0);

    for (let q = 0; q < Q; q++) {
        const [L, R, X] = lines[1 + q]!.split(" ").map(Number) as [number, number, number];
        diff[L]! += X;
        diff[R + 1]! -= X;
    }

    // 累積和を取って各区画の積雪量を求める
    const snow: number[] = new Array(N + 1).fill(0);
    for (let i = 1; i <= N; i++) {
        snow[i] = snow[i - 1]! + diff[i]!;
    }

    // 隣り合う区画の積雪量を比較
    const output: string[] = [];
    for (let i = 1; i < N; i++) {
        if (snow[i]! > snow[i + 1]!) {
            output.push(">");
        } else if (snow[i]! === snow[i + 1]!) {
            output.push("=");
        } else {
            output.push("<");
        }
    }

    console.log(output.join(""));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());