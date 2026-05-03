import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")


    const n = parseInt(lines[0]!)

    const max = Math.floor(Math.sqrt(n))

    const yakusuu = new Set()

    // 10 / 3 = 3  1
    //
    for (let i = 1; i <= max; i++) {
        const amari = n % i
        if (amari !== 0) {
            continue
        }
        const sho = Math.floor(n / i)
        yakusuu.add(i)
        yakusuu.add(sho)

    }

    yakusuu.forEach((v, index) => {
        console.log(v)
    })
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())