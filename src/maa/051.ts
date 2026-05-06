import * as fs from "fs";

const main = (input: string) => {
    const [xStr, yStr] = input.trim().split(/\s+/);
    const X = parseInt(xStr!, 10);
    const Y = parseInt(yStr!, 10);
    const MOD = 1000000007n;
    const N = X + Y;

    // 戦略:
    // (0,0) から (X,Y) まで、上か右の移動だけで到達する経路数は、
    // 全 X+Y 回の移動のうちどの X 回を「右」にするかを選ぶ組合せ数に等しい。
    //   答え = C(X+Y, X) mod (10^9 + 7)
    //
    // X, Y ≤ 10^5 なので N = X+Y ≤ 2*10^5。
    // 階乗テーブル fact[0..N] と逆元階乗テーブル inv_fact[0..N] を構築すれば、
    //   C(N, X) = fact[N] * inv_fact[X] * inv_fact[Y] mod MOD
    // で O(1) に求まる。前処理は O(N)。
    //
    // 逆元の計算:
    //   MOD は素数なのでフェルマーの小定理より a^(MOD-2) ≡ a^(-1) (mod MOD)。
    //   inv_fact[N] = fact[N]^(MOD-2) を繰り返し二乗法で求め、
    //   inv_fact[i] = inv_fact[i+1] * (i+1) で逆順に O(1) で展開する。
    //
    // 数値型について:
    //   MOD ≈ 10^9 同士の掛け算は ≈ 10^18 で safe integer (≈ 9*10^15) を超えるため、
    //   BigInt を使う。N ≤ 2*10^5 なので BigInt のオーバーヘッドでも十分高速。

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

    // C(X+Y, X) = fact[X+Y] * inv_fact[X] * inv_fact[Y] mod MOD
    const ans = (fact[N]! * inv_fact[X]! % MOD) * inv_fact[Y]! % MOD;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
