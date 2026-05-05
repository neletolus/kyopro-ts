import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [x1, y1, r1] = lines[0]!.split(" ").map(Number) as [number, number, number];
    const [x2, y2, r2] = lines[1]!.split(" ").map(Number) as [number, number, number];

    const dx = x1 - x2;
    const dy = y1 - y2;
    const d2 = dx * dx + dy * dy;          // 中心間距離の2乗
    const sumR2 = (r1 + r2) ** 2;          // (r1 + r2)^2
    const diffR2 = (r1 - r2) ** 2;         // (r1 - r2)^2 (絶対値は不要、2乗するので)

    let result: number;
    if (d2 < diffR2) result = 1;       // 一方が他方を含む(接さない)
    else if (d2 === diffR2) result = 2; // 内接
    else if (d2 < sumR2) result = 3;   // 交差
    else if (d2 === sumR2) result = 4; // 外接
    else result = 5;                   // 離れている

    console.log(result);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());