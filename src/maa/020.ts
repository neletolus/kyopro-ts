import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const arr = lines[1]!.split(" ").map(Number)

    const dp: number[][] = new Array(6)

    for (let i = 0; i < 6; i++) {
        dp[i] = new Array(1001).fill(0)
    }

    dp[0]![0] = 1

    for (let v = 0; v < arr.length; v++) {
        const card = arr[v];
        for (let j = 5; j > 0; j--) {
            for (let s = 1000; s >= card!; s--) {
                dp[j]![s]! += dp[j - 1]![s - card!]!
            }
        }
    }



    console.log(dp[5]![1000]);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())