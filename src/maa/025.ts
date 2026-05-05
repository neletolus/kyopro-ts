import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const aArr = lines[1]!.split(" ").map(Number)
    const bArr = lines[2]!.split(" ").map(Number)

    let sum = 0
    for (let index = 0; index < n; index++) {
        sum += (aArr[index]! / 3) + (bArr[index]! / 3 * 2)
    }

    console.log(sum);


}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())