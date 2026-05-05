import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)

    const dp = []

    dp.push(1)

    for (let index = 1; index <= n; index++) {
        if (index === 1) {
            dp.push(1)
        } else {
            dp.push(dp[index - 1]! + dp[index - 2]!)
        }
    }
    console.log(dp[n]);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())