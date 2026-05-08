import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);
    const T = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));

    // 戦略 (部分集合和 DP):
    // 各料理を 2 つのオーブン A, B のいずれかに割り当てる。A の合計を s_A、B の合計を s_B
    // とすると s_A + s_B = S (= ΣT_i) で、両オーブンを並列稼働できるので所要時間は
    // max(s_A, s_B)。これを最小化したい。
    //
    // s_A を S/2 にできるだけ近づける (S/2 以下の最大の達成可能な部分和) と、
    // S - s_A が最小化される (= 答え)。
    //
    // dp[s] = T のある部分集合の和として s が達成可能かを bool で持つ。
    // 初期 dp[0] = true。各 T_i について dp を後ろから (重複防止) 更新。
    //
    // 計算量: O(N * S)。N ≤ 100, S ≤ N * max(T) ≤ 10^5 で 10^7。

    let S = 0;
    for (let i = 0; i < N; i++) S += T[i]!;

    const dp = new Uint8Array(S + 1);
    dp[0] = 1;
    for (let i = 0; i < N; i++) {
        const t = T[i]!;
        for (let s = S; s >= t; s--) {
            if (dp[s - t]) dp[s] = 1;
        }
    }

    const half = Math.floor(S / 2);
    let best = 0;
    for (let s = half; s >= 0; s--) {
        if (dp[s]) {
            best = s;
            break;
        }
    }
    // best ≤ S/2 なので S - best ≥ best、所要時間 = max(best, S - best) = S - best
    console.log(S - best);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
