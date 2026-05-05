import * as fs from "fs";

const zeroBI = BigInt(0)

const main = (input: string) => {
    const lines = input.split("\n")

    const [n, w] = lines[0]!.split(" ").map(Number)

    if (n === undefined) {
        return
    }

    if (w === undefined) {
        return
    }

    const dp: bigint[][] = new Array(n + 1)
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(w + 1).fill(zeroBI)
    }

    for (let i = 1; i <= n; i++) {
        const [wElement, vElement] = lines[i]!.split(" ").map(Number)
        if (wElement === undefined || vElement === undefined) continue

        const vElementBI = BigInt(vElement)

        if (vElementBI > dp[i]![wElement]!) {
            dp[i]![wElement] = vElementBI
        }

        if (i === 1) continue
        for (let j = 1; j <= w; j++) {
            if (dp[i - 1]![j] !== zeroBI) {
                if (dp[i - 1]![j]! > dp[i]![j]!) {
                    dp[i]![j]! = dp[i - 1]![j]!
                }

                if (j + wElement <= w && vElementBI + dp[i - 1]![j]! > dp[i]![j + wElement]!) {
                    dp[i]![j + wElement] = vElementBI + dp[i - 1]![j]!
                }
            }
        }
    }

    let result = zeroBI

    for (let index = 1; index <= w; index++) {
        if (dp[n]![index]! > result) {
            result = dp[n]![index]!
        }
    }

    console.log(result.toString());
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())