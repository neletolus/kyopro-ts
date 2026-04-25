import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const sum = lines[0]!.split(" ").map(Number).reduce(
        (prev, curr) => prev + curr,
        0
    )
    console.log(sum);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())