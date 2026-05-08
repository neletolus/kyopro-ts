import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [nStr, mStr] = lines[0]!.split(/\s+/);
    const N = parseInt(nStr!, 10);
    const M = parseInt(mStr!, 10);

    // 戦略 (BFS で最短距離):
    // 各辺 (a,b) は |age(a) - age(b)| ≤ 1 を意味する。age(1) = 0 が固定。
    //
    // 任意の経路 1 → v で 1 辺ごとに年齢差は 1 以下なので
    //   age(v) ≤ age(1) + (経路長) = (経路長)
    // 最も厳しい上限は最短経路長 dist(1, v)。
    //
    // 一方、age(v) := dist(1, v) と置くと、任意の辺 (u, w) について
    // BFS 距離の性質より |dist(1, u) - dist(1, w)| ≤ 1 が成り立つので
    // この割当は全条件を満たす実現可能解。
    //
    // よって人 i の最大年齢 = min(120, dist(1, i))。
    // (連結成分外なら BFS で到達不可、その場合は 120 が上限)
    //
    // 計算量: O(N + M)。
    //
    // I/O 高速化:
    //   入力 M 行と出力 N 行が大きいので、入力は一括分割、
    //   出力は配列に貯めて process.stdout.write で一括出力する。

    // 隣接リストを CSR 形式で構築 (高速化)
    const head = new Int32Array(N + 2).fill(0); // 各頂点の隣接開始位置
    const A = new Int32Array(M);
    const B = new Int32Array(M);
    for (let i = 0; i < M; i++) {
        const [a, b] = lines[i + 1]!.split(/\s+/);
        const ai = parseInt(a!, 10);
        const bi = parseInt(b!, 10);
        A[i] = ai;
        B[i] = bi;
        head[ai + 1]!++;
        head[bi + 1]!++;
    }
    for (let v = 1; v <= N; v++) head[v + 1] = head[v + 1]! + head[v]!;
    const adj = new Int32Array(2 * M);
    const cursor = new Int32Array(N + 2);
    for (let v = 0; v <= N + 1; v++) cursor[v] = head[v]!;
    for (let i = 0; i < M; i++) {
        const a = A[i]!;
        const b = B[i]!;
        adj[cursor[a]!++] = b;
        adj[cursor[b]!++] = a;
    }

    // BFS from vertex 1
    const INF = -1;
    const dist = new Int32Array(N + 1).fill(INF);
    dist[1] = 0;
    const queue = new Int32Array(N + 1);
    let qh = 0;
    let qt = 0;
    queue[qt++] = 1;
    while (qh < qt) {
        const v = queue[qh++]!;
        const dv = dist[v]!;
        const start = head[v]!;
        const end = head[v + 1]!;
        for (let k = start; k < end; k++) {
            const u = adj[k]!;
            if (dist[u] === INF) {
                dist[u] = dv + 1;
                queue[qt++] = u;
            }
        }
    }

    const out: string[] = new Array(N);
    for (let i = 1; i <= N; i++) {
        if (dist[i] === INF) {
            // 1 から到達不能な頂点は age 上限 120 で自由
            out[i - 1] = "120";
        } else {
            out[i - 1] = String(Math.min(120, dist[i]!));
        }
    }
    process.stdout.write(out.join("\n") + "\n");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
