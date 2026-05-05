import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const arr = lines[1]!.split(" ").map(Number)

    const dp = []

    dp.push(0)

    for (let index = 1; index <= arr.length; index++) {
        if (index === 1) {
            dp.push(Math.abs(arr[index]! - arr[index - 1]!))
        } else {
            dp.push(Math.min(dp[index - 1]! + Math.abs(arr[index]! - arr[index - 1]!), dp[index - 2]! + Math.abs(arr[index]! - arr[index - 2]!)))
        }
    }
    console.log(dp[arr.length - 1]);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())