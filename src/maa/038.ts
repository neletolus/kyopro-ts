import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [N, Q] = lines[0]!.split(" ").map(Number) as [number, number];
    const A = lines[1]!.split(" ").map(Number) as number[];

    // 累積和 S[i] = A[0] + A[1] + ... + A[i-1], S[0] = 0
    const S: number[] = new Array(N + 1).fill(0);
    for (let i = 0; i < N; i++) {
        S[i + 1] = S[i]! + A[i]!;
    }

    // 各質問は引き算 1 回で答える
    const output: string[] = [];
    for (let q = 0; q < Q; q++) {
        const [L, R] = lines[2 + q]!.split(" ").map(Number) as [number, number];
        output.push(String(S[R]! - S[L - 1]!));
    }

    console.log(output.join("\n"));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());