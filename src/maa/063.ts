import * as fs from "fs";

const main = (input: string) => {
    const N = parseInt(input.trim(), 10);

    // 戦略 (二部グラフの偶奇性):
    // N×N 格子グラフ上で、左上から出発して全マスをちょうど 1 回ずつ訪れて
    // 戻るハミルトン閉路が存在するかの判定。
    //
    // 観察:
    //   格子グラフは市松模様 (黒/白) の 2 色で塗れる二部グラフ。
    //   閉路は同じ色から始まって元の色に戻るため、長さは必ず偶数。
    //   ハミルトン閉路は全 N^2 マスを巡るので長さ = N^2。
    //   よって N^2 が偶数 ⇔ N が偶数 でない限り偶数長閉路として実現不可能。
    //
    //   N が偶数のときは「2 行ずつのコの字蛇行」などで具体的に構成可能。
    //   N が奇数のときは N^2 が奇数 → 存在しない。
    //
    // 判定:
    //   N % 2 === 0 → Yes
    //   そうでない   → No
    //
    // 数値型について:
    //   N ≤ 10^9 は number の safe integer 内なので parseInt で OK。

    if (N % 2 === 0) {
        console.log("Yes");
    } else {
        console.log("No");
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
