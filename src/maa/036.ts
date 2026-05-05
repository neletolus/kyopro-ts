import * as fs from "fs";

const main = (input: string) => {
    const [A, B, H, M] = input.split(" ").map(Number) as [number, number, number, number];

    // 各針の角度(度)
    const hourAngle = 30 * H + 0.5 * M;  // 時針
    const minuteAngle = 6 * M;           // 分針

    // 2針のなす角(度 → ラジアン)
    const theta = Math.abs(hourAngle - minuteAngle) * Math.PI / 180;

    // 余弦定理
    const result = Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(theta));

    console.log(result);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());