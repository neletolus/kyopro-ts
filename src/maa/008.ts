import * as fs from "fs";

// 

const main = (input: string) => {
    const lines = input.split("\n")

    const [n, s] = lines[0]!.split(" ").map(Number)

    let count = 0

    for (let red = 1; red <= n!; red++) {
        for (let blue = 1; blue <= n!; blue++) {
            if (red + blue <= s!) {
                count++
            }
        }
    }
    console.log(count);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())