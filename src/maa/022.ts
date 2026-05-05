import * as fs from "fs";

const calcCombination = (n: number, r: number) => {
    let nKaijo = 1
    let rKaijo = 1
    let tmp_n = n
    let tmp_r = r
    while (true) {
        if (tmp_r === 0) {
            break
        }
        nKaijo *= tmp_n
        rKaijo *= tmp_r
        tmp_n--
        tmp_r--
    }

    return Math.floor(nKaijo / rKaijo)

}

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const arr = lines[1]!.split(" ").map(Number)

    const cardCount: number[] = new Array(100000).fill(0)

    arr.forEach((card, index) => {
        cardCount[card]!++
    })

    let count = 0

    for (let index = 1; index <= 49999; index++) {
        count += cardCount[index]! * cardCount[100000 - index]!
    }

    if (cardCount[50000]! >= 2) {
        count += calcCombination(cardCount[50000]!, 2)
    }

    console.log(count);

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())