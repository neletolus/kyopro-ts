import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")


    const n = parseInt(lines[0]!)

    const sieve: boolean[] = new Array(n + 1).fill(true)
    sieve[0] = false
    sieve[1] = false

    const max = Math.floor(Math.sqrt(n))


    const sosuu: number[] = []

    for (let i = 2; i <= max; i++) {
        if (sieve[i]) {
            for (let j = i * 2; j <= n; j += i) {
                sieve[j] = false
            }
        }
    }

    sieve.forEach((elem, index) => {
        if (elem) {
            sosuu.push(index)
        }
    })
    console.log(sosuu.join(" ") + "\n")
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())