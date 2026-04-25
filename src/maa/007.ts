import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const [n, x, y] = lines[0]!.split(" ").map(Number)

    let count = 0

    for (let index = 1; index <= n!; index++) {
        if (index % x! === 0 || index % y! === 0) {
            count++
        }
    }
    console.log(count);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())