import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);
    const A = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));
    const B = lines[2]!.split(/\s+/).map((s) => parseInt(s, 10));

    // 戦略 (ソートして同順マッチング):
    // A, B をそれぞれ昇順にソートし、a_(1) ≤ a_(2) ≤ ... ≤ a_(N),
    // b_(1) ≤ b_(2) ≤ ... ≤ b_(N) としたとき、最適な割当は ソート後 i 番目の
    // 生徒を i 番目の学校に割り当てる、即ち合計は Σ|a_(i) - b_(i)|。
    //
    // 正当性 (交換論法): 任意の割当において a_p < a_q かつ a_p の対応先が
    // a_q の対応先より大きい場合、対応先を入れ替えると総距離は増えない
    // (4 つの位置関係を場合分けして確認できる)。これを繰り返すとソート同順の
    // 対応に帰着する。
    //
    // 計算量: O(N log N)。N ≤ 10^5。
    // 数値型: 各 |A_i - B_i| ≤ 10^9、合計は最大 N * 10^9 = 10^14 で Number に収まる
    // (Number.MAX_SAFE_INTEGER ≈ 9*10^15)。

    A.sort((x, y) => x - y);
    B.sort((x, y) => x - y);

    let ans = 0;
    for (let i = 0; i < N; i++) {
        ans += Math.abs(A[i]! - B[i]!);
    }
    console.log(ans);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
