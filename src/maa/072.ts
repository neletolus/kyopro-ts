import * as fs from "fs";

const main = (input: string) => {
    const [aStr, bStr] = input.trim().split(/\s+/);
    const A = parseInt(aStr!, 10);
    const B = parseInt(bStr!, 10);

    // 戦略 (倍数本数による全列挙):
    // gcd(x, y) = g となるには x, y がともに g の倍数。
    // よって [A, B] の中に g の倍数が 2 個以上ある最大の g が答え。
    //
    // [A, B] にある g の倍数の個数:
    //   floor(B/g) - ceil(A/g) + 1   (両端含む)
    //   = floor(B/g) - floor((A-1)/g)
    //
    // g を B から 1 まで降順に試し、上記が 2 以上になった最初の g を返す。
    //
    // 計算量: O(B) ≈ 2*10^5 で十分高速。
    //
    // 数値型について: B ≤ 2*10^5 なので number で完全に収まる。

    let ans = 1;
    for (let g = B; g >= 1; g--) {
        // [A, B] の中の g の倍数の個数
        const cnt = Math.floor(B / g) - Math.floor((A - 1) / g);
        if (cnt >= 2) {
            ans = g;
            break;
        }
    }

    console.log(ans);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
