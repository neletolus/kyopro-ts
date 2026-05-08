import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);
    const s = lines[1]!;

    // 戦略 (Lucas の定理 mod 3):
    // B=0, W=1, R=2 と数値化すると、下 2 個 a, b から上の値は
    //   f(a, b) = -(a + b) mod 3
    // (同色 a == b なら -(2a) ≡ a (mod 3)、異色なら 0+1+2 ≡ 0 (mod 3) より
    //  残る色 = -(a+b) mod 3、いずれも一致)
    //
    // 帰納的に、底 c_0, c_1, ..., c_{N-1} の上に N-1 段積むと
    //   top = (-1)^{N-1} * Σ_{i=0..N-1} C(N-1, i) * c_i  (mod 3)
    //
    // C(N-1, i) mod 3 は Lucas の定理で base-3 digits ごとの組合せ数の積として求まる。
    // Lucas: C(n, k) ≡ Π C(n_d, k_d) (mod p)、各 d は base-p digit。
    // p=3 では C[n][k] (n,k ∈ {0,1,2}) は小さな表で OK。k_d > n_d の桁があれば C=0。
    //
    // 計算量: O(N * log_3 N)。N ≤ 4*10^5 なので ~5*10^6 で十分高速。
    //
    // 数値型: 値はすべて mod 3 で 0..2、Number で問題なし。

    const charToVal = (ch: number): number =>
        ch === 0x42 /* B */ ? 0 : ch === 0x57 /* W */ ? 1 : 2;
    const valToChar = (v: number): string => (v === 0 ? "B" : v === 1 ? "W" : "R");

    const c = new Int8Array(N);
    for (let i = 0; i < N; i++) c[i] = charToVal(s.charCodeAt(i));

    // C[n][k] mod 3 for n, k ∈ {0, 1, 2}
    const C2 = [
        [1, 0, 0],
        [1, 1, 0],
        [1, 2, 1],
    ];

    const M = N - 1; // 二項係数の n
    let total = 0;
    for (let i = 0; i <= M; i++) {
        if (c[i]! === 0) continue; // 寄与 0、Lucas 計算もスキップ

        // C(M, i) mod 3 を Lucas で計算
        let n = M;
        let k = i;
        let coeff = 1;
        let zero = false;
        while (n > 0 || k > 0) {
            const nd = n % 3;
            const kd = k % 3;
            if (kd > nd) {
                zero = true;
                break;
            }
            coeff = (coeff * C2[nd]![kd]!) % 3;
            n = (n - nd) / 3;
            k = (k - kd) / 3;
        }
        if (zero) continue;
        total = (total + coeff * c[i]!) % 3;
    }

    // 符号: (-1)^{N-1}
    let ans = total;
    if (((N - 1) & 1) === 1) {
        ans = (3 - ans) % 3;
    }
    console.log(valToChar(ans));
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
