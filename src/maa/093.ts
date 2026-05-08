import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr] = input.trim().split(/\s+/);
    const A = BigInt(aStr!);
    const B = BigInt(bStr!);

    // 戦略 (gcd → lcm):
    // lcm(A, B) = A * B / gcd(A, B) = (A / gcd) * B
    //
    // gcd はユークリッドの互除法で O(log min(A, B))。
    // 答えを (A / gcd) * B で求め、10^18 と比較。超えれば "Large"。
    //
    // 数値型: A, B ≤ 10^18 で積は最大 10^36 になり得るため BigInt を使用。
    //
    // 計算量: O(log min(A, B))。

    const gcd = (x: bigint, y: bigint): bigint => {
        while (y !== 0n) {
            const t = x % y;
            x = y;
            y = t;
        }
        return x;
    };

    const g = gcd(A, B);
    const lcm = (A / g) * B;
    const LIMIT = 10n ** 18n;
    if (lcm > LIMIT) {
        console.log("Large");
    } else {
        console.log(lcm.toString());
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
