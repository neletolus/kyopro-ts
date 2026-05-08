const main = () => {
    // 戦略 (Cayley グラフ Z_n × {±1, ±k}):
    // 各頂点 i ∈ Z_n に対し i ± 1, i ± k を辺で結ぶ 4 正則グラフ。
    // 直径は L1 ノルム ball-of-radius-4 が Z_n を覆うかで決まる。
    //   |a| + |b| ≤ 4 を満たす (a, b) は 1 + 4 + 8 + 12 + 16 = 41 個。
    // n = 41, k = 9 で a + 9b mod 41 が L1 ball から Z_41 への全単射になり、
    // 41 頂点すべてが原点から距離 4 以内に到達可能 → 直径 ≤ 4。
    //
    // (検証: 各 (a, b) について a + 9b mod 41 を列挙すると 0..40 が漏れなく出る)
    //
    // 多重辺・自己ループなし: 1, 9, -1 ≡ 40, -9 ≡ 32 はすべて異なる非零値。
    // gcd(9, 41) = 1 なので step-9 は Hamilton 閉路、step-1 とは辺が重複しない。
    //
    // 頂点数 N = 41 → 4100 点。

    const N = 41;
    const K = 9;
    const edges: Array<[number, number]> = [];
    // Step-1 サイクル (各 i について i と (i+1)%N を結ぶ、無向で重複なく N 辺)
    for (let i = 0; i < N; i++) {
        edges.push([i + 1, ((i + 1) % N) + 1]);
    }
    // Step-K サイクル (gcd(K, N) = 1 で同様に N 辺、step-1 と重複なし)
    for (let i = 0; i < N; i++) {
        edges.push([i + 1, ((i + K) % N) + 1]);
    }

    const out: string[] = [];
    out.push(`${N} ${edges.length}`);
    for (const [a, b] of edges) out.push(`${a} ${b}`);
    process.stdout.write(out.join("\n") + "\n");
};

main();
