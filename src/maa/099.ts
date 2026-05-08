import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const N = parseInt(lines[0]!.trim(), 10);

    // 戦略 (辺の貢献):
    // 木のある辺 e を取り除くと、木は大きさ s と N - s の 2 つの部分に分かれる。
    // e は s * (N - s) 組の頂点ペアの最短経路に含まれる (一方の部分から他方への
    // すべての経路が e を通るため)。長さ 1 なのでこの辺の答えへの寄与は s * (N - s)。
    //
    // 全辺について寄与を合計すれば総和。
    //
    // 部分木サイズは根 1 からの DFS で求める。子 v のサイズが s_v なら、
    // (v, parent(v)) 辺の寄与は s_v * (N - s_v)。
    //
    // N が最大 10^5 なので再帰だとスタック深さが問題。iterative な後行順 DFS で実装。
    //
    // 隣接リストは CSR 形式で構築。
    //
    // 計算量: O(N)。
    //
    // 数値型: 各辺の寄与最大 (N/2)^2 = 2.5*10^9、辺数 N-1 ≈ 10^5、総和最大 ~2.5*10^14 で
    // Number.MAX_SAFE_INTEGER (~9*10^15) に収まる。

    // CSR 形式の隣接リスト構築
    const head = new Int32Array(N + 2);
    const M = N - 1;
    const eA = new Int32Array(M);
    const eB = new Int32Array(M);
    for (let i = 0; i < M; i++) {
        const [a, b] = lines[i + 1]!.split(/\s+/);
        const ai = parseInt(a!, 10);
        const bi = parseInt(b!, 10);
        eA[i] = ai;
        eB[i] = bi;
        head[ai + 1]!++;
        head[bi + 1]!++;
    }
    for (let v = 1; v <= N; v++) head[v + 1] = head[v + 1]! + head[v]!;
    const adj = new Int32Array(2 * M);
    const cursor = new Int32Array(N + 2);
    for (let v = 0; v <= N + 1; v++) cursor[v] = head[v]!;
    for (let i = 0; i < M; i++) {
        const a = eA[i]!;
        const b = eB[i]!;
        adj[cursor[a]!++] = b;
        adj[cursor[b]!++] = a;
    }

    // Iterative DFS: 訪問順序を order[] に記録、後で逆順に部分木サイズを集計
    const parent = new Int32Array(N + 1);
    const order = new Int32Array(N);
    let oi = 0;
    const stack = new Int32Array(N);
    let sp = 0;
    parent[1] = 0;
    stack[sp++] = 1;
    while (sp > 0) {
        const v = stack[--sp]!;
        order[oi++] = v;
        const start = head[v]!;
        const end = head[v + 1]!;
        for (let k = start; k < end; k++) {
            const u = adj[k]!;
            if (u !== parent[v]) {
                parent[u] = v;
                stack[sp++] = u;
            }
        }
    }

    // 後ろから処理して部分木サイズを集計
    const size = new Int32Array(N + 1);
    let ans = 0;
    for (let i = oi - 1; i >= 0; i--) {
        const v = order[i]!;
        let s = 1;
        const start = head[v]!;
        const end = head[v + 1]!;
        for (let k = start; k < end; k++) {
            const u = adj[k]!;
            if (u !== parent[v]) s += size[u]!;
        }
        size[v] = s;
        if (v !== 1) {
            // 辺 (v, parent[v]) の寄与
            ans += s * (N - s);
        }
    }

    console.log(ans);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
