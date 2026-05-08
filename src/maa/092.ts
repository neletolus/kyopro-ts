import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());

    // 戦略 (約数列挙、a を √N まで):
    // 面積 N = a * b の整数組のうち、周長 2(a+b) を最小化したい。
    // a + b は a が √N に近いほど小さくなる (AM-GM 不等式)。
    // よって a を 1..⌊√N⌋ で走査し、N が a で割り切れる最大の a を採用すればよい。
    // 対応する b = N / a、周長 = 2 * (a + b)。
    //
    // 計算量: O(√N) ≈ 10^6。N ≤ 10^12 なので十分高速。
    //
    // 数値型: N が 10^12 まで取り得るので BigInt を使用 (整数平方根、剰余演算共に BigInt で実施)。

    // ⌊√N⌋ を BigInt で求める (Newton 法による整数平方根)
    const isqrt = (n: bigint): bigint => {
        if (n < 2n) return n;
        let x = n;
        let y = (x + 1n) / 2n;
        while (y < x) {
            x = y;
            y = (x + n / x) / 2n;
        }
        return x;
    };

    const s = isqrt(N);

    let bestA = 1n;
    for (let a = 1n; a <= s; a++) {
        if (N % a === 0n) bestA = a;
    }
    const bestB = N / bestA;
    const perimeter = 2n * (bestA + bestB);
    console.log(perimeter.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
