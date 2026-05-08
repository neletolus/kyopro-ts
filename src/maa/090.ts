import * as fs from "fs";

const main = (input: string) => {
    const [nStr, bStr] = input.trim().split(/\s+/);
    const N = BigInt(nStr!);
    const B = BigInt(bStr!);

    // 戦略 (P = f(m) を 7-smooth 数で列挙):
    // m - f(m) = B ⟺ f(m) = m - B
    // f(m) は各桁 (0..9) の積なので、m の桁に 0 が含まれれば f(m)=0、含まなければ
    // 各桁が 1..9 でその積となり、形は 2^a * 3^b * 5^c * 7^d (a,b,c,d ≥ 0) となる。
    //
    // 場合分け:
    //   (1) P = 0 のとき: m - 0 = B ⇒ m = B、かつ f(m)=0 すなわち B の桁に 0 を含む。
    //       1 ≤ B ≤ N をチェックすれば該当する m はちょうど 1 個 (もしくは 0 個)。
    //
    //   (2) P > 0 のとき: m = B + P で、m ≤ N、m の桁にすべて 0 がない、
    //       かつ桁の積が P と一致するものを数える。
    //       P ≤ N - B かつ P は 2^a * 3^b * 5^c * 7^d の形。
    //
    // 7-smooth 数 (2,3,5,7 のみで構成される自然数) で 10^11 以下のものは数千個程度。
    // 各 P について m = B + P の桁を見て O(11) で検証できるので全体で十分高速。
    //
    // 計算量: O((P 候補数) * 11) ≈ 10^4 * 11 程度。
    //
    // 数値型: N, B は最大 10^11 で BigInt を使用 (Number でも安全に収まるが、桁分解で
    // 整数除算を多用するため BigInt の方が記述が簡潔)。

    let count = 0n;

    // (1) P = 0 のケース: m = B、B が桁に 0 を含み 1 ≤ B ≤ N
    if (B >= 1n && B <= N && B.toString().includes("0")) {
        count++;
    }

    // (2) P > 0 のケース: P を 2^a * 3^b * 5^c * 7^d で全列挙
    const maxP = N - B;
    if (maxP >= 1n) {
        const Ps: bigint[] = [];
        for (let pa = 1n; pa <= maxP; pa *= 2n) {
            for (let pb = pa; pb <= maxP; pb *= 3n) {
                for (let pc = pb; pc <= maxP; pc *= 5n) {
                    for (let pd = pc; pd <= maxP; pd *= 7n) {
                        Ps.push(pd);
                    }
                }
            }
        }

        for (const P of Ps) {
            const m = B + P; // m ≤ N は P ≤ maxP より保証
            let prod = 1n;
            let mm = m;
            let valid = true;
            while (mm > 0n) {
                const d = mm % 10n;
                if (d === 0n) {
                    valid = false;
                    break;
                }
                prod *= d;
                mm /= 10n;
            }
            if (valid && prod === P) count++;
        }
    }

    console.log(count.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
