import * as fs from "fs";

// 0 1 2 3 4 5 6 7 8 9 10 11 12
// f f t f f f f f f f f f f
// f f t f f t f t f f f f f
// f f 

const main = (input: string) => {
    const lines = input.split("\n")


    const [n, s] = lines[0]!.split(" ").map(Number)

    const dp: boolean[][] = new Array(n ?? 0)

    for (let i = 0; i < n!; i++) {
        dp[i] = new Array((s ?? 0) + 1).fill(false)
    }

    const cards = lines[1]!.split(" ").map(Number)

    for (let i = 0; i < n!; i++) {
        for (let j = 0; j < s! + 1; j++) {
            if (cards[i] === j) {
                dp[i]![j] = true
            }

            if (i > 0 && dp[i - 1]![j]) {
                dp[i]![j] = true

                if (cards[i]! + j <= s!) {
                    dp[i]![cards[i]! + j] = true
                }
            }

        }
    }

    console.log(dp);


    if (dp[n! - 1]![s!]) {
        console.log("Yes")
    } else {
        console.log("No")

    }
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())