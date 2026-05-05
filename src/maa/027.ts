import * as fs from "fs";

function mergeSort(arr: number[]): number[] {
    if (arr.length < 2) {
        return arr;
    }

    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right)) as number[];
}

function merge(left: number[], right: number[]) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i]! < right[j]!) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

const main = (input: string) => {
    const lines = input.split("\n")

    const n = parseInt(lines[0]!)
    const arr = lines[1]!.split(" ").map(Number)

    const result = mergeSort(arr)

    console.log(result.join(" "));

}

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd())