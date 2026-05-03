import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")


    const n = parseInt(lines[0]!)

    const max = Math.floor(Math.sqrt(n))

    let isPrime = true

    for (let i = 2; i <= max; i++) {
        if (n % i === 0) {
            isPrime = false
            break
        }
    }
    console.log(isPrime ? "Yes" : "No");

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())