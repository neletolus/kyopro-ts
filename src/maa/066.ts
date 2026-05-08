import * as fs from "fs";

const main = (input: string) => {
    const [nStr, kStr] = input.trim().split(/\s+/);
    const N = BigInt(nStr!);
    const K = BigInt(kStr!);

    // 戦略 (余事象 + 場合分け):
    // 黒・白・灰の 3 枚に 1〜N の整数を入れ、3 ペアの絶対差のうち少なくとも
    // 1 つが K 以上になる組合せ数を求める。
    //
    // 余事象: 3 ペア全てが K 未満 ⇔ max - min ≤ K-1。
    // d = K - 1 として、レンジ ≤ d となる順序付き三つ組 (b, w, g) ∈ [1,N]^3 の
    // 個数 Bad を求め、答えは N^3 - Bad。
    //
    // Bad の計算 (min を m で固定):
    //   min = m となる三つ組は、3 値が全て [m, min(m+d, N)] にあり、かつ
    //   そのうち少なくとも 1 つが m。窓の幅を L とすると寄与は L^3 - (L-1)^3。
    //
    //   - m ≤ N - d のとき L = d + 1 (窓が右端に達しない):
    //       (N - d) 個の m が、それぞれ (d+1)^3 - d^3 を寄与。
    //   - m = N-d+1, ..., N のとき L = N - m + 1 で 1 から d まで:
    //       Σ_{j=1}^{d} (j^3 - (j-1)^3) = d^3   (望遠鏡和)
    //
    //   よって
    //     Bad = (N - d) * ((d+1)^3 - d^3) + d^3
    //
    //   K = 1 (d = 0) のとき: Bad = N * (1 - 0) + 0 = N
    //   (すなわち 3 枚とも同じ数になる N 通りが「差全部 0 < 1」の組合せ)。
    //
    // 答え:
    //   ans = N^3 - Bad
    //
    // 数値型について:
    //   N ≤ 10^5 なので N^3 ≤ 10^15 で safe integer (≈ 9*10^15) ぎりぎり。
    //   立方計算で一時的に超える可能性もあるので BigInt で扱う。

    const d = K - 1n;
    const cube = (x: bigint): bigint => x * x * x;

    const bad = (N - d) * (cube(d + 1n) - cube(d)) + cube(d);
    const ans = cube(N) - bad;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
