import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const N = parseInt(lines[0]!)
    console.log(N + 5)
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())