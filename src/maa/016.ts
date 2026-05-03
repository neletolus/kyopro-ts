import * as fs from "fs";

const calcGCD = (a: bigint, b: bigint) => {
    let big = BigInt(0)
    let small = BigInt(0)

    if (a >= b) {
        big = a
        small = b
    } else {
        big = b
        small = a
    }

    while (big !== BigInt(0) && small !== BigInt(0)) {
        const amari = big % small
        big = small
        small = amari
    }

    if (big === BigInt(0)) {
        return small
    } else {
        return big
    }
}

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)

    const arr = lines[1]!.split(" ").map(BigInt)

    let a = arr[0]
    let b = arr[1]
    let tmp_gcd = calcGCD(a!, b!)


    for (let index = 2; index < arr.length; index++) {
        let c = arr[index]
        tmp_gcd = calcGCD(c!, tmp_gcd)
    }

    console.log(Number(tmp_gcd));

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())