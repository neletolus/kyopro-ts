import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const n = parseInt(lines[0]!);
    const arr = lines[1]!.split(" ").map(Number);

    if (n === 1) {
        console.log(arr[0]);
        return;
    }

    // dp[i] = i日目までで得られる実力の最大値
    const dp: number[] = new Array(n).fill(0);
    dp[0] = arr[0]!;
    dp[1] = Math.max(arr[0]!, arr[1]!);

    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1]!, dp[i - 2]! + arr[i]!);
    }

    console.log(dp[n - 1]);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());