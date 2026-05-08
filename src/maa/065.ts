import * as fs from "fs";

const main = (input: string) => {
    const [hStr, wStr] = input.trim().split(/\s+/);
    const H = BigInt(hStr!);
    const W = BigInt(wStr!);

    // 戦略 (二部グラフの色の偶奇 + 連結性):
    // 角行 (ビショップ) は斜めにしか動けないので、市松模様で同じ色のマスにしか
    // 到達できない。(r,c) の色は (r+c) mod 2 で決まり、出発点 (1,1) は r+c=2 で
    // 偶数色 (黒とする)。
    //
    // 観察:
    //   - H,W ≥ 2 ならビショップの黒マスグラフは連結なので、全ての黒マスに到達可能。
    //     よって答え = 黒マスの数。
    //   - H = 1 または W = 1 の場合、斜め移動できない (盤面の幅または高さが
    //     1 マスしかない) ので動けず、答えは 1。
    //
    // 黒マス (r+c が偶数) の数:
    //   行 r が奇数 (1,3,5,...) のとき c も奇数なら r+c 偶数
    //   行 r が偶数のとき c も偶数なら r+c 偶数
    //   よって
    //     #黒 = #奇数行 * #奇数列 + #偶数行 * #偶数列
    //         = ceil(H/2) * ceil(W/2) + floor(H/2) * floor(W/2)
    //
    // 数値型について:
    //   H, W ≤ 10^9、積は最大 10^18 で safe integer (≈9*10^15) を超えるため BigInt。

    if (H === 1n || W === 1n) {
        console.log(1);
        return;
    }

    // ceil(x/2) と floor(x/2) を BigInt で
    const oddH = (H + 1n) / 2n; // ceil(H/2)
    const evenH = H / 2n;        // floor(H/2)
    const oddW = (W + 1n) / 2n;
    const evenW = W / 2n;

    const ans = oddH * oddW + evenH * evenW;
    console.log(ans.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
