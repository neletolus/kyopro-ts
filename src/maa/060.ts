import * as fs from "fs";

const main = (input: string) => {
    const N = BigInt(input.trim());

    // 戦略:
    // 1〜3 個ずつ取る石取りゲーム。「取れなくなったら負け」=「N=0 の手番が負け」。
    //
    // 後退帰納法で勝敗を見ると:
    //   N=0    : 取れない → 負け位置 (手番のプレイヤー Lose)
    //   N=1,2,3: 全て取れば相手に N=0 を渡せる → 勝ち
    //   N=4    : どう取っても相手に 1,2,3 のいずれかを渡してしまう → 負け
    //   N=5,6,7: 残り 4 個になるよう取れば相手を負け位置に追い込める → 勝ち
    //   N=8    : 残り 4 にできない (1,2,3 を取ると 7,6,5) → 負け
    //
    // よって負け位置は N が 4 の倍数のとき、それ以外は勝ち位置。
    //   N % 4 == 0 → Second (後手必勝)
    //   otherwise   → First  (先手必勝)
    //
    // 数値型について:
    //   N ≤ 10^12 は number の safe integer 内だが、入力を BigInt で読むので
    //   そのまま BigInt の % で判定する。

    if (N % 4n === 0n) {
        console.log("Second");
    } else {
        console.log("First");
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
