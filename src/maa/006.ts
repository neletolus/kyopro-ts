import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)

    console.log(n * 2 + 3);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())