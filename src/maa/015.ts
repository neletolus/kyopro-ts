import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const [a, b] = lines[0]!.split(" ").map(Number)

    if (a === undefined) {
        return
    }

    if (b === undefined) {
        return
    }

    let big = 0
    let small = 0

    if (a >= b) {
        big = a
        small = b
    } else {
        big = b
        small = a
    }

    while (big !== 0 && small !== 0) {
        const amari = big % small
        big = small
        small = amari
    }

    if (big === 0) {
        console.log(small);
    } else {
        console.log(big);

    }
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())