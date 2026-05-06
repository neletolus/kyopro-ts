import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [nStr, kStr] = lines[0]!.split(/\s+/);
    const N = parseInt(nStr!, 10);
    const K = BigInt(kStr!);
    const A = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));

    // 戦略:
    // 関数グラフ (各頂点から出る辺がちょうど 1 本) 上で町 1 から K 回ジャンプ
    // した先を求める。N ≤ 2*10^5、K ≤ 10^18。
    //
    // 観察:
    //   町は N 個しかないので、N+1 回ジャンプすればどこかで必ず再訪する。
    //   再訪したら、そこからは「ρ (ロー) 字型」の周期構造に入っている。
    //
    // アルゴリズム (サイクル検出 + 周期縮約):
    //   - positions[t] = t 回ジャンプ後の町、を順に記録
    //   - first_visit[v] = 町 v に最初に来た時刻 (未訪問なら -1)
    //   - 同じ町に 2 度目に来た時点 t で:
    //       cycle_start = first_visit[現在の町]
    //       cycle_len   = t - cycle_start
    //   - K < cycle_start なら positions[K] が答え
    //     そうでなければ K' = cycle_start + (K - cycle_start) mod cycle_len
    //     とし positions[K'] が答え
    //
    // 計算量: O(N)。
    //
    // 数値型について:
    //   K ≤ 10^18 は number safe integer (≈9*10^15) を超えるため BigInt。
    //   cycle_start, cycle_len は ≤ N ≤ 2*10^5 なので number で扱う。
    //   両者の比較・剰余時に BigInt に揃えて計算する。

    const positions: number[] = [1]; // 0 回ジャンプ → 町 1
    const firstVisit = new Array<number>(N + 1).fill(-1);
    firstVisit[1] = 0;

    let cur = 1;
    let cycleStart = -1;
    let cycleLen = -1;

    // 高々 N 回ジャンプすれば必ず再訪する
    for (let t = 1; t <= N + 1; t++) {
        cur = A[cur - 1]!;
        if (firstVisit[cur] !== -1) {
            cycleStart = firstVisit[cur]!;
            cycleLen = t - cycleStart;
            break;
        }
        firstVisit[cur] = t;
        positions.push(cur);
    }

    // K の縮約
    let answerIndex: number;
    const cycleStartBig = BigInt(cycleStart);
    if (K < cycleStartBig) {
        answerIndex = Number(K);
    } else {
        const offset = (K - cycleStartBig) % BigInt(cycleLen);
        answerIndex = cycleStart + Number(offset);
    }

    console.log(positions[answerIndex]);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
