import * as fs from "fs";

const main = (input: string) => {
    const [lStr, rStr] = input.trim().split(/\s+/);
    const L = parseInt(lStr!, 10);
    const R = parseInt(rStr!, 10);

    // 戦略 (区間ふるい / segmented sieve):
    // R ≤ 10^12 だが区間幅 R - L ≤ 5*10^5 と小さい。
    //
    //   1. ⌊√R⌋ ≤ 10^6 までの素数をエラトステネスのふるいで列挙。
    //   2. 各小素数 p について、p の倍数のうち [L, R] にあるものを篩い落とす。
    //      開始位置は max(p^2, ⌈L/p⌉ * p)。p^2 から始めるのは、それ未満の合成数は
    //      より小さな素因子で既にマーク済みになるため。
    //   3. 区間内で未マーク かつ ≥ 2 の数を数える。
    //
    // 計算量:
    //   - 小素数のふるい: O(√R log log √R) ≈ 10^6 規模。
    //   - 区間ふるい: 合計 O((R-L) * Σ_{p ≤ √R} 1/p) ≈ 5*10^5 * 数。
    //
    // 数値型: L, R ≤ 10^12 で、Math.ceil(L/p) * p や p*p は最大 ~10^12 < 2^53 で
    // Number の安全な範囲。

    // 1. ⌊√R⌋ までの素数を列挙 (sqrt の浮動小数誤差を整数演算で補正)
    let lim = Math.floor(Math.sqrt(R));
    while ((lim + 1) * (lim + 1) <= R) lim++;
    while (lim > 0 && lim * lim > R) lim--;

    const isPrimeSmall = new Uint8Array(lim + 1);
    isPrimeSmall.fill(1);
    isPrimeSmall[0] = 0;
    if (lim >= 1) isPrimeSmall[1] = 0;
    for (let i = 2; i * i <= lim; i++) {
        if (isPrimeSmall[i]) {
            for (let j = i * i; j <= lim; j += i) isPrimeSmall[j] = 0;
        }
    }
    const smallPrimes: number[] = [];
    for (let i = 2; i <= lim; i++) if (isPrimeSmall[i]) smallPrimes.push(i);

    // 2. [L, R] の区間ふるい
    const len = R - L + 1;
    const isPrime = new Uint8Array(len);
    isPrime.fill(1);

    // 1 は素数ではない
    if (L === 1) isPrime[0] = 0;

    for (const p of smallPrimes) {
        // 開始位置 = max(p*p, ⌈L/p⌉ * p)
        let start = Math.ceil(L / p) * p;
        if (start < p * p) start = p * p;
        if (start > R) continue;
        for (let x = start; x <= R; x += p) {
            isPrime[x - L] = 0;
        }
    }

    let count = 0;
    for (let i = 0; i < len; i++) if (isPrime[i]) count++;

    console.log(count);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
