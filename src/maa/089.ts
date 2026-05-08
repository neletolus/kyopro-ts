import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr, cStr] = input.trim().split(/\s+/);
    const a = BigInt(aStr!);
    const b = BigInt(bStr!);
    const c = BigInt(cStr!);

    // 戦略 (整数のみで c^b と a を比較):
    // log_2 a < b * log_2 c
    //   ⟺ log_2 a < log_2 (c^b)
    //   ⟺ a < c^b
    // (c ≥ 1, log_2 は単調増加なので OK)
    //
    // 浮動小数で log_2 を計算すると 10^18 規模で桁落ちにより境界を誤判定するので、
    // BigInt を用いて c^b を直接計算し a と比較する。
    //
    // ただし b は最大 10^18 なので素朴に b 回掛け算するとループが終わらない。
    // 観察:
    //   - c = 1 なら c^b = 1。a ≥ 1 より a < c^b は不成立 → No。
    //   - c ≥ 2 なら c^k は指数関数的に増え、k ≤ 60 程度で a (≤ 10^18) を超える。
    // よって c ≥ 2 のときは「power > a になったら break」する単純ループが O(60) で完了する。
    //
    // 計算量: O(min(b, log_2(a+1))) = O(60)。

    if (c === 1n) {
        // c^b = 1 で a ≥ 1 なので a < c^b は不成立
        console.log("No");
        return;
    }

    let power = 1n;
    let exceeded = false;
    for (let i = 0n; i < b; i++) {
        power = power * c;
        if (power > a) {
            exceeded = true;
            break;
        }
    }
    // exceeded なら c^b > a → Yes、そうでなければ c^b ≤ a → No
    console.log(exceeded ? "Yes" : "No");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
