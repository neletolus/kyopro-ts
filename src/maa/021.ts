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

    const [n, r] = lines[0]!.split(" ").map(Number)

    console.log(calcCombination(n!, r!))
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())