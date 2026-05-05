import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [n, x] = lines[0]!.split(" ").map(Number);
    const arr = lines[1]!.split(" ").map(Number);

    if (arr.includes(x!)) {
        console.log("Yes");
    } else {
        console.log("No");

    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());