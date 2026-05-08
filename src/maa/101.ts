import * as fs from "fs";

const main = (input: string) => {
    const N = parseInt(input.trim(), 10);
    const MOD = 1000000007;

    // 戦略 (組合せ数による直接計算):
    // m 個選んだボール (a_1 < a_2 < ... < a_m) について、a_{i+1} - a_i ≥ k は
    // b_i = a_i - (i - 1)(k - 1) と置換すると b_{i+1} - b_i ≥ 1 (狭義増加) と等価。
    // a_i ∈ [1, N] より b_i ∈ [1, N - (m-1)(k-1)]。
    // よって m 個の選び方は C(N - (m-1)(k-1), m) 通り。
    //
    // m の上限 M_k は 1 + (m-1)k ≤ N から M_k = ⌊(N-1)/k⌋ + 1。
    //
    // 答え f(k) = Σ_{m=1..M_k} C(N - (m-1)(k-1), m)
    //
    // sum_{k=1..N} M_k ≈ N * H_N ≈ N log N で全 k 合計 O(N log N) ≈ 1.2 * 10^6 回の C 計算。
    //
    // mod 演算: a * b mod (10^9+7) は a, b < 2^30 でも積が 2^53 を超え得るので
    // a を上位 15 bit と下位 15 bit に分割して Number 内で計算 (BigInt より高速)。
    //
    // 計算量: O(N log N)。N ≤ 10^5。

    const SHIFT = 1 << 15; // 2^15

    // a, b < MOD のとき (a * b) mod MOD を Number で安全に計算
    const mulmod = (a: number, b: number): number => {
        const ah = Math.floor(a / SHIFT);
        const al = a - ah * SHIFT;
        return (((ah * b) % MOD) * SHIFT + al * b) % MOD;
    };

    const powmod = (a: number, e: number): number => {
        let r = 1;
        let base = a;
        while (e > 0) {
            if (e & 1) r = mulmod(r, base);
            base = mulmod(base, base);
            e = Math.floor(e / 2);
        }
        return r;
    };

    // 階乗・逆階乗の前計算
    const fact = new Array<number>(N + 1);
    const invFact = new Array<number>(N + 1);
    fact[0] = 1;
    for (let i = 1; i <= N; i++) fact[i] = mulmod(fact[i - 1]!, i);
    invFact[N] = powmod(fact[N]!, MOD - 2);
    for (let i = N - 1; i >= 0; i--) invFact[i] = mulmod(invFact[i + 1]!, i + 1);

    const C = (n: number, r: number): number => {
        if (r < 0 || r > n) return 0;
        return mulmod(mulmod(fact[n]!, invFact[r]!), invFact[n - r]!);
    };

    const out: string[] = new Array(N);
    for (let k = 1; k <= N; k++) {
        const Mk = Math.floor((N - 1) / k) + 1;
        let ans = 0;
        for (let m = 1; m <= Mk; m++) {
            const n = N - (m - 1) * (k - 1);
            ans = (ans + C(n, m)) % MOD;
        }
        out[k - 1] = String(ans);
    }
    process.stdout.write(out.join("\n") + "\n");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
