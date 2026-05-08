import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr, cStr, dStr] = input.trim().split(/\s+/);
    const a = BigInt(aStr!);
    const b = BigInt(bStr!);
    const c = BigInt(cStr!);
    const d = BigInt(dStr!);

    // 戦略 (端点列挙):
    // x*y は x について固定すると y の線形関数、y について固定すると x の線形関数。
    // 線形関数の閉区間上の最大値は端点で取るため、x*y の最大は
    //   (x, y) ∈ {a, b} × {c, d}
    // の 4 つの角のどれかで実現される。
    //
    // 注意: 区間が負の数を含む場合 (例: a=-5, b=-2) でも、上記の通り端点で
    // 比較すれば自動的に正解が得られる ((負)*(負)=正 のケースも含めて)。
    //
    // 数値型について:
    //   |a|,|b|,|c|,|d| ≤ 10^9 なので積は最大 10^18、safe integer (≈9*10^15) を
    //   超える。よって BigInt が必須。

    const candidates = [a * c, a * d, b * c, b * d];
    let ans = candidates[0]!;
    for (let i = 1; i < candidates.length; i++) {
        if (candidates[i]! > ans) ans = candidates[i]!;
    }

    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
