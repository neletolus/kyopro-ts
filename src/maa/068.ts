import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [nStr, kStr] = lines[0]!.split(/\s+/);
    const N = BigInt(nStr!);
    const K = parseInt(kStr!, 10);
    const V = lines[1]!.split(/\s+/).map((s) => BigInt(s));

    // 戦略 (包除原理 / Inclusion-Exclusion):
    // [1,N] のうち V_1,...,V_K のいずれかの倍数の個数。
    //   |A_1 ∪ ... ∪ A_K|
    //     = Σ_{S≠∅} (-1)^(|S|+1) * |∩_{i∈S} A_i|
    //     = Σ_{S≠∅} (-1)^(|S|+1) * floor(N / lcm(V_S))
    //
    // K ≤ 10 なので 2^K - 1 ≤ 1023 部分集合を全列挙すればよい (O(2^K * K))。
    //
    // LCM の途中計算はサイズが急に大きくなりうる:
    //   - V_i ≤ 50 で K ≤ 10 のとき lcm(V) は最大でも O(10^14) 程度には収まるが、
    //     計算過程で乗算により一時的に大きくなる。
    //   - lcm が N を超えた時点で floor(N / lcm) = 0 となり寄与が消えるので、
    //     早期に lcm > N でカットしてよい。
    //
    // 数値型について:
    //   N ≤ 10^12、lcm 計算で乗算が入るため安全のため BigInt。

    const gcd = (a: bigint, b: bigint): bigint => {
        while (b !== 0n) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    let ans = 0n;
    for (let mask = 1; mask < (1 << K); mask++) {
        // mask に対応する部分集合の lcm を計算
        let L = 1n;
        let bits = 0;
        let overflow = false;
        for (let i = 0; i < K; i++) {
            if ((mask >> i) & 1) {
                bits++;
                const v = V[i]!;
                L = (L / gcd(L, v)) * v;
                if (L > N) {
                    overflow = true;
                    break; // floor(N/L) = 0 なので寄与なし
                }
            }
        }
        if (overflow) continue;

        const cnt = N / L; // BigInt 除算 (床)
        if (bits % 2 === 1) {
            ans += cnt;
        } else {
            ans -= cnt;
        }
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
