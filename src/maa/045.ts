import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [N, M] = lines[0]!.split(" ").map(Number) as [number, number];

    // cnt[v] = 頂点 v に隣接する頂点のうち、v より番号が小さいものの個数
    const cnt = new Array<number>(N + 1).fill(0);

    for (let i = 1; i <= M; i++) {
        const [a, b] = lines[i]!.split(" ").map(Number) as [number, number];
        // 番号の大きい方にとって、相手は「自分より小さい隣接頂点」
        if (a < b) {
            cnt[b]!++;
        } else {
            cnt[a]!++;
        }
    }

    // cnt[v] === 1 となる頂点の個数を数える
    let answer = 0;
    for (let v = 1; v <= N; v++) {
        if (cnt[v] === 1) answer++;
    }

    console.log(answer);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());