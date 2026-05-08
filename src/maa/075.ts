import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!.trim(), 10);
    const A = lines[1]!.split(/\s+/).map((s) => BigInt(s));
    const MOD = 1000000007n;

    // 戦略 (寄与法 / パスカルの三角形):
    // 「隣り合う 2 数を足して上の段に書く」操作を N-1 回繰り返した頂点の値は、
    // 底の各 A_i が頂点へ二項係数 C(N-1, i-1) 通りで寄与する。
    //
    // ∵ 各行で隣接 2 要素を足す操作は、各位置への到達経路数を 1 段上で
    //   パスカルの規則 (左 + 右) で更新するのと同じ。底から N-1 段登った
    //   頂点 (1 つしかない位置) への経路数は C(N-1, i-1)。
    //
    // よって
    //   top = Σ_{i=1}^{N} C(N-1, i-1) * A_i   (mod 10^9 + 7)
    //
    // 二項係数は 階乗テーブル fact と逆元階乗テーブル inv_fact を前計算し
    //   C(n, k) = fact[n] * inv_fact[k] * inv_fact[n-k]
    // で O(1) に取得 (051 と同じ手法)。
    //
    // 計算量: O(N)。
    //
    // 数値型について:
    //   MOD ≈ 10^9 同士の積は 10^18 で safe integer 超え → BigInt で扱う。

    const M = N - 1; // 二項係数の上の値 C(M, k)

    // 繰り返し二乗法
    const modpow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let r = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) r = (r * base) % mod;
            base = (base * base) % mod;
            exp >>= 1n;
        }
        return r;
    };

    // fact[i] = i! mod MOD
    const fact = new Array<bigint>(M + 1);
    fact[0] = 1n;
    for (let i = 1; i <= M; i++) {
        fact[i] = (fact[i - 1]! * BigInt(i)) % MOD;
    }

    // inv_fact[i] = (i!)^(-1) mod MOD (フェルマーの小定理 + 逆順展開)
    const inv_fact = new Array<bigint>(M + 1);
    inv_fact[M] = modpow(fact[M]!, MOD - 2n, MOD);
    for (let i = M - 1; i >= 0; i--) {
        inv_fact[i] = (inv_fact[i + 1]! * BigInt(i + 1)) % MOD;
    }

    const binom = (n: number, k: number): bigint => {
        if (k < 0 || k > n) return 0n;
        return (fact[n]! * inv_fact[k]! % MOD) * inv_fact[n - k]! % MOD;
    };

    let ans = 0n;
    for (let i = 0; i < N; i++) {
        ans = (ans + binom(M, i) * A[i]!) % MOD;
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
