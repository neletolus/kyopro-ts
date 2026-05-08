const main = () => {
    const N = 100;

    // 戦略 (六角格子 / hexagonal packing):
    // 円を六角格子状 (中心間距離 d) に並べると、隣接対の中心間距離は d、
    // 円半径 R = d/2 が達成できる。中心は単位円内 (|center| ≤ 1 - R) になければならない。
    //
    // 二分探索で「半径 1 - d/2 の円内に hex 格子点が 100 個以上ある最大の d」を求める。
    // その d で 100 個の最も原点に近い格子点を選び、それを中心として出力する。
    // 結果として R = d/2、理論的に約 0.087 (1/5.75 ≈ 0.174 の 1/2) が得られる。
    //
    // 正方格子だと R ≈ 0.073 だが、hex 格子は ~1.16 倍密度があるため大きな R が出る。
    //
    // 出力: 指数表記禁止のため toFixed(10) を使用。

    const collect = (d: number): Array<[number, number, number]> => {
        const r = d / 2;
        const limit = 1 - r;
        const limit2 = limit * limit;
        const vstep = (d * Math.sqrt(3)) / 2;
        const rowsHalf = Math.ceil(limit / vstep) + 2;
        const colsHalf = Math.ceil(limit / d) + 2;
        const points: Array<[number, number, number]> = [];
        for (let row = -rowsHalf; row <= rowsHalf; row++) {
            const y = row * vstep;
            const offset = (row & 1) === 0 ? 0 : d / 2;
            for (let col = -colsHalf; col <= colsHalf; col++) {
                const x = col * d + offset;
                const d2 = x * x + y * y;
                if (d2 <= limit2) points.push([d2, x, y]);
            }
        }
        return points;
    };

    let lo = 0.05;
    let hi = 0.2;
    for (let it = 0; it < 100; it++) {
        const mid = (lo + hi) / 2;
        if (collect(mid).length >= N) lo = mid;
        else hi = mid;
    }

    const d = lo;
    const points = collect(d);
    points.sort((a, b) => a[0] - b[0]);
    const sel = points.slice(0, N);

    const out: string[] = [];
    for (const [, x, y] of sel) {
        out.push(`${x.toFixed(10)} ${y.toFixed(10)}`);
    }
    process.stdout.write(out.join("\n") + "\n");
};

main();
