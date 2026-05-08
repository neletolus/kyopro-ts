import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [nStr, mStr] = lines[0]!.split(/\s+/);
    const N = parseInt(nStr!, 10);
    const M = parseInt(mStr!, 10);

    // 戦略 (Dijkstra による最短経路):
    // |x_A - x_B| ≤ C は x_B ≤ x_A + C かつ x_A ≤ x_B + C を意味する。
    // 重み C の無向辺と見なすと、x_1 = 0 のもとで任意の経路 1 = v_0, v_1, ..., v_k = N について
    //   x_N ≤ x_1 + (経路上の重み合計) = (重み合計)
    // が成り立つ。最も厳しい上界は最短経路長 dist(1, N)。
    //
    // dist(1, N) を達成する割当 x_v := dist(1, v) は実現可能解であることが
    // 三角不等式 (Dijkstra の最短距離の性質) から従う:
    //   任意の辺 (u, w, c) について |dist(1, u) - dist(1, w)| ≤ c。
    //
    // よって答えは dist(1, N)。N に到達不能なら x_N は任意に大きく取れるので -1。
    //
    // 計算量: O((N + M) log N)。N ≤ 10^5, M ≤ 5*10^5。
    //
    // 数値型: 経路長は最大 M * max(C) ≈ 5*10^5 * 10^9 = 5*10^14。
    // Number.MAX_SAFE_INTEGER ≈ 9*10^15 に収まるので number で OK。

    // CSR 形式の隣接リスト構築
    const head = new Int32Array(N + 2);
    const A = new Int32Array(M);
    const B = new Int32Array(M);
    const C = new Float64Array(M);
    for (let i = 0; i < M; i++) {
        const parts = lines[i + 1]!.split(/\s+/);
        const a = parseInt(parts[0]!, 10);
        const b = parseInt(parts[1]!, 10);
        const c = parseInt(parts[2]!, 10);
        A[i] = a;
        B[i] = b;
        C[i] = c;
        head[a + 1]!++;
        head[b + 1]!++;
    }
    for (let v = 1; v <= N; v++) head[v + 1] = head[v + 1]! + head[v]!;
    const adjTo = new Int32Array(2 * M);
    const adjW = new Float64Array(2 * M);
    const cursor = new Int32Array(N + 2);
    for (let v = 0; v <= N + 1; v++) cursor[v] = head[v]!;
    for (let i = 0; i < M; i++) {
        const a = A[i]!;
        const b = B[i]!;
        const c = C[i]!;
        const pa = cursor[a]!++;
        adjTo[pa] = b;
        adjW[pa] = c;
        const pb = cursor[b]!++;
        adjTo[pb] = a;
        adjW[pb] = c;
    }

    // Dijkstra (二分ヒープ、距離と頂点の並列配列)
    const INF = Number.POSITIVE_INFINITY;
    const dist = new Float64Array(N + 1).fill(INF);
    dist[1] = 0;

    const cap = 2 * M + 4;
    const heapD = new Float64Array(cap);
    const heapV = new Int32Array(cap);
    let hs = 0;

    const push = (d: number, v: number) => {
        let i = hs++;
        heapD[i] = d;
        heapV[i] = v;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heapD[p]! <= heapD[i]!) break;
            const td = heapD[p]!;
            const tv = heapV[p]!;
            heapD[p] = heapD[i]!;
            heapV[p] = heapV[i]!;
            heapD[i] = td;
            heapV[i] = tv;
            i = p;
        }
    };
    const pop = (): [number, number] => {
        const rd = heapD[0]!;
        const rv = heapV[0]!;
        hs--;
        if (hs > 0) {
            heapD[0] = heapD[hs]!;
            heapV[0] = heapV[hs]!;
            let i = 0;
            while (true) {
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                let s = i;
                if (l < hs && heapD[l]! < heapD[s]!) s = l;
                if (r < hs && heapD[r]! < heapD[s]!) s = r;
                if (s === i) break;
                const td = heapD[s]!;
                const tv = heapV[s]!;
                heapD[s] = heapD[i]!;
                heapV[s] = heapV[i]!;
                heapD[i] = td;
                heapV[i] = tv;
                i = s;
            }
        }
        return [rd, rv];
    };

    push(0, 1);
    while (hs > 0) {
        const [d, v] = pop();
        if (d > dist[v]!) continue;
        const start = head[v]!;
        const end = head[v + 1]!;
        for (let k = start; k < end; k++) {
            const u = adjTo[k]!;
            const nd = d + adjW[k]!;
            if (nd < dist[u]!) {
                dist[u] = nd;
                push(nd, u);
            }
        }
    }

    if (dist[N] === INF) {
        console.log(-1);
    } else {
        console.log(dist[N]);
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
