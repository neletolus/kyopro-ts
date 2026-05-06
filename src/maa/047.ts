import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [N, M] = lines[0]!.split(" ").map(Number) as [number, number];

    // 隣接リストを構築
    const graph: number[][] = Array.from({ length: N + 1 }, () => []);
    for (let i = 1; i <= M; i++) {
        const [a, b] = lines[i]!.split(" ").map(Number) as [number, number];
        graph[a]!.push(b);
        graph[b]!.push(a);
    }

    // 各頂点の色 (-1: 未訪問, 0 or 1: 色)
    const color = new Array<number>(N + 1).fill(-1);

    // 連結成分ごとにBFSで2色塗り分け
    // キューは配列+headポインタで管理(shiftはO(N)で遅いため)
    const queue = new Array<number>(N);

    for (let start = 1; start <= N; start++) {
        if (color[start] !== -1) continue;

        // BFS開始
        color[start] = 0;
        let head = 0;
        let tail = 0;
        queue[tail++] = start;

        while (head < tail) {
            const v = queue[head++]!;
            const c = color[v]!;
            const nextColor = 1 - c;

            const neighbors = graph[v]!;
            for (let i = 0; i < neighbors.length; i++) {
                const u = neighbors[i]!;
                if (color[u] === -1) {
                    // 未訪問なら反対の色で塗る
                    color[u] = nextColor;
                    queue[tail++] = u;
                } else if (color[u] === c) {
                    // 同じ色の隣接頂点が存在 → 二部グラフではない
                    console.log("No");
                    return;
                }
                // color[u] === nextColor の場合は問題なし
            }
        }
    }

    console.log("Yes");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());