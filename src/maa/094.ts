import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const N = parseInt(lines[0]!, 10);
    const B = lines[1]!.split(/\s+/).map((s) => parseInt(s, 10));
    // B の長さは N - 1

    // 戦略 (各 A_i を独立に最大化):
    // 制約 B_i ≥ max(A_i, A_{i+1}) は B_i ≥ A_i かつ B_i ≥ A_{i+1} と同値。
    // よって各 A_i に課される条件は (両隣の B からの上界) のみで、相互依存はない。
    //
    //   A_1 ≤ B_1
    //   A_i ≤ min(B_{i-1}, B_i)  (1 < i < N)
    //   A_N ≤ B_{N-1}
    //
    // それぞれの上限を採用すると総和が最大化される。
    //
    // 計算量: O(N)。N ≤ 100。

    let sum = 0;
    sum += B[0]!; // A_1 = B_1
    for (let i = 1; i < N - 1; i++) {
        // A_{i+1} (1-indexed) の上限 = min(B_i, B_{i+1})
        // 0-indexed の B[] では B[i-1] と B[i]
        sum += Math.min(B[i - 1]!, B[i]!);
    }
    sum += B[N - 2]!; // A_N = B_{N-1}
    console.log(sum);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
