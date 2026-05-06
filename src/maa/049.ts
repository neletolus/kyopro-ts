import * as fs from "fs";

const main = (input: string) => {
    const N = parseInt(input.trim(), 10);
    const MOD = 1000000007;

    // 戦略:
    // N ≤ 10^7 なので、O(N) の単純な反復で十分間に合う。
    // 各項を MOD で割った余りだけ保持すればよい。
    //
    // 値の範囲チェック:
    //   各 a_i は MOD 未満 (< 10^9 + 7) なので、
    //   a_{i-1} + a_{i-2} < 2 * (10^9 + 7) ≈ 2 * 10^9
    //   これは JavaScript の安全な整数の上限 2^53 - 1 ≈ 9 * 10^15 より十分小さく、
    //   桁落ちせずに普通の number 型で計算できる。BigInt は不要。
    //
    // メモリ最適化:
    //   配列を持つ必要はなく、直前 2 項だけ保持すればよい (定数メモリ)。

    let prev2 = 1; // a_1
    let prev1 = 1; // a_2

    for (let i = 3; i <= N; i++) {
        const cur = (prev1 + prev2) % MOD;
        prev2 = prev1;
        prev1 = cur;
    }

    console.log(prev1);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());