import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr, cStr] = input.trim().split(/\s+/);
    const A = BigInt(aStr!);
    const B = BigInt(bStr!);
    const C = BigInt(cStr!);

    // 戦略 (積の分離 + 等差数列の和):
    // Σ_{a=1..A} Σ_{b=1..B} Σ_{c=1..C} abc
    //   = (Σ_{a=1..A} a) * (Σ_{b=1..B} b) * (Σ_{c=1..C} c)
    //   = (A(A+1)/2) * (B(B+1)/2) * (C(C+1)/2)
    //
    // mod 998244353 を取って出力する。
    //
    // 数値型: A, B, C ≤ 10^9 で A(A+1)/2 ≤ ~5*10^17。3 つの積は ~10^53 となるため
    // BigInt を使用。各因子を mod した後の積は最大 (998244353)^3 ≈ 10^27 で BigInt なら問題なし。
    //
    // 計算量: O(1)。

    const MOD = 998244353n;
    const sa = ((A * (A + 1n)) / 2n) % MOD;
    const sb = ((B * (B + 1n)) / 2n) % MOD;
    const sc = ((C * (C + 1n)) / 2n) % MOD;
    const ans = (((sa * sb) % MOD) * sc) % MOD;
    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
