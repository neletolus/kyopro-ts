import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [N, M] = lines[0]!.split(" ").map(Number) as [number, number];

    // 隣接リストを構築
    const adj: number[][] = Array.from({ length: N + 1 }, () => []);
    for (let i = 1; i <= M; i++) {
        const [a, b] = lines[i]!.split(" ").map(Number) as [number, number];
        adj[a]!.push(b);
        adj[b]!.push(a);
    }

    // BFS で頂点 1 からの最短距離を計算
    const dist = new Array<number>(N + 1).fill(-1);
    dist[1] = 0;

    // 配列をキューとして使う（head 方式で shift の O(N) を回避）
    const queue = new Array<number>(N);
    let head = 0;
    let tail = 0;
    queue[tail++] = 1;

    while (head < tail) {
        const v = queue[head++]!;
        for (const next of adj[v]!) {
            if (dist[next] === -1) {
                dist[next] = dist[v]! + 1;
                queue[tail++] = next;
            }
        }
    }

    // 出力（join で一括出力するのが高速）
    const out: string[] = [];
    for (let k = 1; k <= N; k++) {
        out.push(String(dist[k]));
    }
    console.log(out.join("\n"));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());