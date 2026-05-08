import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr, cStr] = input.trim().split(/\s+/);
    const a = BigInt(aStr!);
    const b = BigInt(bStr!);
    const c = BigInt(cStr!);

    // 戦略 (整数演算による不等式判定):
    // √a + √b < √c ⟺ (両辺正なので 2 乗できて)
    //   a + b + 2√(ab) < c
    //   ⟺ 2√(ab) < c - a - b
    //
    // ここで:
    //   - c - a - b ≤ 0 なら、左辺 ≥ 0 より不成立 → No。
    //   - c - a - b > 0 なら、両辺正なのでさらに 2 乗できて
    //       4ab < (c - a - b)^2
    //     で判定可能。
    //
    // 浮動小数点を使うと a, b, c ≤ 10^9 でも誤差の境界ケースを誤判定し得るので、
    // 全て整数 (BigInt) で計算する。
    //
    // 数値型: 4ab ≤ 4*10^18, (c-a-b)^2 ≤ 10^18 で Number.MAX_SAFE_INTEGER (~9*10^15) を
    // 超えるため BigInt を使用。
    //
    // 計算量: O(1)。

    const d = c - a - b;
    if (d <= 0n) {
        console.log("No");
        return;
    }
    if (4n * a * b < d * d) {
        console.log("Yes");
    } else {
        console.log("No");
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
