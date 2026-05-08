import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);

    // 戦略 (区間スケジューリング、終了時刻昇順の貪欲):
    // 終了時刻 R_i が早い映画から順に見て、L_i ≥ (直前の R) を満たすものを採用する。
    // 「見終わった直後に次を始める」のは可なので等号 OK。
    //
    // 正当性: 最適解で最初に選ぶ映画 X を、終了時刻最小の Y に置き換えても
    // 最適性は保たれる (Y の終了時刻は X 以下なので、それ以降の選択肢が狭まらない)。
    // 帰納的に貪欲解が最適解と同じ本数となる。
    //
    // 計算量: O(N log N)。N ≤ 3*10^5。

    const L = new Int32Array(N);
    const R = new Int32Array(N);
    for (let i = 0; i < N; i++) {
        const [l, r] = lines[i + 1]!.split(/\s+/);
        L[i] = parseInt(l!, 10);
        R[i] = parseInt(r!, 10);
    }

    // インデックスを R 昇順にソート
    const idxArr: number[] = new Array(N);
    for (let i = 0; i < N; i++) idxArr[i] = i;
    idxArr.sort((a, b) => R[a]! - R[b]!);

    let count = 0;
    let curEnd = -1; // 直前に見た映画の終了時刻 (R_i ≥ 0 なので -1 で初期化)
    for (const i of idxArr) {
        if (L[i]! >= curEnd) {
            count++;
            curEnd = R[i]!;
        }
    }

    console.log(count);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
