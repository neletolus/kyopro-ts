import * as fs from "fs";

/**
 * 
 * 1 ドル払うと、N 種類のコインのうち 
 * 1 つが等確率で出現する機械があります。 全種類のコインを集めるまでに支払う金額の期待値を計算するプログラムを作成してください。
 * n = 5として、1回目は1, 2回目は4 / 5、3回目は3 / 5とかぶらない確率が変動するわけで逆に言うと試行回数はこの値を1にするための逆数にすれば良い
 */

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    let sum = 0
    for (let index = 1; index <= n; index++) {
        sum += n * 1 / index
    }

    console.log(sum);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())