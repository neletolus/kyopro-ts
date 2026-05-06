import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr] = input.trim().split(/\s+/);
    const a = BigInt(aStr!);
    let b = parseInt(bStr!, 10);
    const MOD = 1000000007n;

    // 戦略:
    // b は最大 10^9 なので、a を b 回素朴に掛けると間に合わない。
    // 繰り返し二乗法 (binary exponentiation) を使うと O(log b) ≈ 30 回程度の
    // 乗算で済む。
    //
    // 数値型について:
    //   a^2 mod MOD の計算では、(MOD - 1)^2 ≈ 10^18 になり、
    //   JavaScript の safe integer 上限 2^53 - 1 ≈ 9 * 10^15 を超える。
    //   そのため掛け算部分では BigInt を使う必要がある。
    //   ループ回数は ~30 なので BigInt のオーバーヘッドは問題にならない。
    //
    // アルゴリズム:
    //   a^b を b の 2 進表現で分解する。
    //     b = b_k b_{k-1} ... b_1 b_0 (2 進)
    //     a^b = ∏ (a^{2^i})  (b_i = 1 となる i について)
    //   base を毎回 2 乗していき、b の最下位ビットが 1 のとき result に掛ける。

    let result = 1n;
    let base = a % MOD;

    while (b > 0) {
        if ((b & 1) === 1) {
            result = (result * base) % MOD;
        }
        base = (base * base) % MOD;
        b >>>= 1; // 符号なし右シフト (b は非負だが念のため)
    }

    console.log(result.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());