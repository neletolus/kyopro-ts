import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    // 第 1 行の N は文字列長と一致するため、解では使用しない。
    const S = lines[1]!;

    // 戦略 (カウンタによる平衡判定):
    // '(' を +1、')' を -1 とした累積和を考える。
    // S が正しいカッコ列であることは次の 2 条件と同値:
    //   - 任意の接頭辞 S[0..i] での累積和が 0 以上
    //   - 全体の累積和が 0
    //
    // 同値性 (帰納):
    //   - 空文字列はカウンタが常に 0 で OK。
    //   - (A) の場合、A が条件を満たせば内側カウンタは 0 ≥ 0 を保ち、両端で +1, -1。
    //   - AB の連結も A, B それぞれの条件から従う。
    // 逆に条件を満たす文字列は左端から見て、初めて 0 に戻る位置で分割すると
    //   "(" + (中身) + ")" + (残り) の形になり、再帰的に正しい。
    //
    // 計算量: O(N)。N ≤ 5*10^5。

    let depth = 0;
    for (let i = 0; i < S.length; i++) {
        const ch = S.charCodeAt(i);
        if (ch === 0x28 /* '(' */) {
            depth++;
        } else {
            depth--;
            if (depth < 0) {
                console.log("No");
                return;
            }
        }
    }
    console.log(depth === 0 ? "Yes" : "No");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
