import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());

    // 戦略:
    // 2^N の一の位 = 2^N mod 10。
    //
    // 観察: 2^N の一の位は周期 4 で巡回する。
    //   2^1 = 2  → 2
    //   2^2 = 4  → 4
    //   2^3 = 8  → 8
    //   2^4 = 16 → 6
    //   2^5 = 32 → 2 (周期再開)
    //
    // よって r = N mod 4 とすると
    //   r == 1 → 2
    //   r == 2 → 4
    //   r == 3 → 8
    //   r == 0 → 6   (N ≥ 1 のとき N が 4 の倍数なら 2^4=16 と同じ)
    //
    // N ≤ 10^12 は number の safe integer (≈ 9*10^15) 内に収まるが、
    // 入力を BigInt で読むので mod も BigInt のまま処理する。

    const r = N % 4n;
    let ans: bigint;
    if (r === 1n) ans = 2n;
    else if (r === 2n) ans = 4n;
    else if (r === 3n) ans = 8n;
    else ans = 6n; // r === 0n (N が 4 の倍数, N ≥ 1)

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
