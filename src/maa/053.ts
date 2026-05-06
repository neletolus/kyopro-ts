import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());
    const MOD = 1000000007n;

    // 戦略:
    // 求める値は等比数列の和:
    //   S = 4^0 + 4^1 + ... + 4^N
    //     = (4^(N+1) - 1) / (4 - 1)
    //     = (4^(N+1) - 1) / 3
    //
    // mod の世界では「÷3」を直接できないので、3 の逆元を掛ける形にする:
    //   S ≡ (4^(N+1) - 1) * inv(3)  (mod 10^9 + 7)
    //
    // 逆元はフェルマーの小定理より inv(3) = 3^(MOD-2) mod MOD。
    // 4^(N+1) も繰り返し二乗法で O(log N) に計算する。
    //
    // 数値型について:
    //   N ≤ 10^18 は number の safe integer (≈ 9*10^15) を超えるので BigInt で扱う。
    //   (BigInt(input) で文字列から直接読み込む)
    //
    // 引き算後の負数対策:
    //   (4^(N+1) - 1) は通常正だが、mod を取った後に 0 になる可能性もある。
    //   念のため (... + MOD) % MOD で非負化しておく。

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

    // 4^(N+1) mod MOD
    const pow4 = modpow(4n, N + 1n, MOD);

    // 3 の逆元 = 3^(MOD-2) mod MOD
    const inv3 = modpow(3n, MOD - 2n, MOD);

    // S = (4^(N+1) - 1) * inv(3) mod MOD
    const numerator = (pow4 - 1n + MOD) % MOD;
    const ans = (numerator * inv3) % MOD;

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
