import * as fs from "fs";

const main = (input: string) => {
    const [xStr, yStr] = input.trim().split(/\s+/);
    const X = parseInt(xStr!, 10);
    const Y = parseInt(yStr!, 10);
    const MOD = 1000000007n;

    // 戦略:
    // ナイトの移動は (+1,+2) と (+2,+1) の 2 種類だけ。
    // (+1,+2) を a 回、(+2,+1) を b 回行ったとすると
    //   a + 2b = X
    //   2a + b = Y
    // を解いて
    //   a = (2Y - X) / 3
    //   b = (2X - Y) / 3
    //   n = a + b = (X + Y) / 3   (= 総移動回数)
    //
    // 条件:
    //   (X + Y) が 3 の倍数でない、または a < 0, b < 0 のいずれかなら到達不可能 → 答え 0。
    //
    // それ以外の場合、n 回の移動のうちどの a 回を (+1,+2) にするかで経路が決まるので
    //   答え = C(n, a) mod (10^9 + 7)
    //
    // X, Y ≤ 10^6 より n ≤ (2*10^6)/3 ≈ 6.7*10^5。
    // 051 と同じく階乗テーブル + 逆元階乗テーブルで O(N) 前処理 + O(1) クエリ。
    //
    // 数値型について:
    //   MOD ≈ 10^9 同士の掛け算は ≈ 10^18 で safe integer (≈ 9*10^15) を超えるため、
    //   BigInt を使う。

    // 到達可能性チェック
    if ((X + Y) % 3 !== 0) {
        console.log(0);
        return;
    }
    const a = (2 * Y - X) / 3;
    const b = (2 * X - Y) / 3;
    if (a < 0 || b < 0) {
        console.log(0);
        return;
    }
    const N = a + b; // 総移動回数

    // 繰り返し二乗法で base^exp mod mod を計算 O(log exp)
    const modpow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let result = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) result = (result * base) % mod;
            base = (base * base) % mod;
            exp >>= 1n;
        }
        return result;
    };

    // 階乗テーブル fact[i] = i! mod MOD を構築 O(N)
    const fact = new Array<bigint>(N + 1);
    fact[0] = 1n;
    for (let i = 1; i <= N; i++) {
        fact[i] = (fact[i - 1]! * BigInt(i)) % MOD;
    }

    // 逆元階乗テーブル inv_fact[i] = (i!)^(-1) mod MOD を構築 O(N)
    const inv_fact = new Array<bigint>(N + 1);
    inv_fact[N] = modpow(fact[N]!, MOD - 2n, MOD);
    for (let i = N - 1; i >= 0; i--) {
        inv_fact[i] = (inv_fact[i + 1]! * BigInt(i + 1)) % MOD;
    }

    // C(N, a) = fact[N] * inv_fact[a] * inv_fact[b] mod MOD
    const ans = (fact[N]! * inv_fact[a]! % MOD) * inv_fact[b]! % MOD;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
