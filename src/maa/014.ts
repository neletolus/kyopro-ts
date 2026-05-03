import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")


    const n = parseInt(lines[0]!)

    let tmp_n = n

    const max = Math.floor(Math.sqrt(n))

    const soinsuu = []

    // 10 / 3 = 3  1
    //
    for (let i = 2; i <= max; i++) {
        while (tmp_n % i === 0) {
            tmp_n = Math.floor(tmp_n / i)
            soinsuu.push(i)
        }
    }

    soinsuu.forEach((v, index) => {
        console.log(v)
    })

    if (tmp_n !== 1) {
        console.log(tmp_n);

    }
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())