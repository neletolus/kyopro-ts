import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    let sum = 0
    for (let index = 1; index <= n; index++) {
        const [p, q] = lines[index]!.split(" ").map(Number)
        sum += q! / p!
    }
    console.log(sum);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())