import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)

    const arr = lines[1]!.split(" ").map(Number)

    let c100 = 0
    let c200 = 0
    let c300 = 0
    let c400 = 0

    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case 100:
                c100++
                break;
            case 200:
                c200++
                break;
            case 300:
                c300++
                break;
            case 400:
                c400++
                break;

            default:
                break;
        }
    }

    console.log(c100 * c400 + c200 * c300);
}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())