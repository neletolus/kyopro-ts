import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")


    const n = parseInt(lines[0]!)

    let result = 1
    for (let index = n; index >= 1; index--) {
        result *= index
    }

    console.log(result);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())