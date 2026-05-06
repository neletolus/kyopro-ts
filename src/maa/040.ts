import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const N = Number(lines[0]);
    const A = lines[1]!.split(" ").map(BigInt) as bigint[];
    const M = Number(lines[2]);

    // 各駅の位置 (駅 1 を原点 0 km とした座標) を累積和で求める
    // position[i] = A[0] + A[1] + ... + A[i-2]  (1-indexed)
    const position: bigint[] = new Array(N + 1).fill(0n);
    for (let i = 2; i <= N; i++) {
        position[i] = position[i - 1]! + A[i - 2]!;
    }

    // 経由駅を順に辿り、各区間の距離 |pos[curr] - pos[prev]| を加算
    let totalKm = 0n;
    let prev = Number(lines[3]);
    for (let j = 1; j < M; j++) {
        const curr = Number(lines[3 + j]);
        const diff = position[curr]! - position[prev]!;
        totalKm += diff < 0n ? -diff : diff;
        prev = curr;
    }

    console.log((totalKm).toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());