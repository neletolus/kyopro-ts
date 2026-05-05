import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const diceB = lines[1]!.split(" ").map(Number)
    const diceR = lines[2]!.split(" ").map(Number)

    const diceBAvr = diceB.reduce((prev, curr) => prev + curr, 0) / n
    const diceRAvr = diceR.reduce((prev, curr) => prev + curr, 0) / n


    console.log(diceBAvr + diceRAvr);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())