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

    let count1 = 0
    let count2 = 0
    let count3 = 0

    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case 1:
                count1++
                break;
            case 2:
                count2++
                break;
            case 3:
                count3++
                break;

            default:
                break;
        }
    }

    console.log(calcCombination(count1, 2) + calcCombination(count2, 2) + calcCombination(count3, 2))
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())