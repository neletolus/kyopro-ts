import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const sum = lines[1]!.split(" ").map(Number).reduce(
        (prev, curr) => prev + curr,
        0
    )
    console.log(sum % 100);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())