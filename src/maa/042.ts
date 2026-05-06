import * as fs from "fs";

const main = (input: string) => {
    const N = Number(input.trim());

    // ∑_{K=1}^{N} K × f(K) = ∑_{d=1}^{N} d × m(m+1)/2  (m = floor(N/d))
    // 約数 d ごとに、その倍数 K = d, 2d, ..., m*d の総和を加算する形に変換。
    let answer = 0;
    for (let d = 1; d <= N; d++) {
        const m = Math.floor(N / d);
        // m*(m+1) は常に偶数なので /2 は整数で完結する
        answer += (d * m * (m + 1)) / 2;
    }

    console.log(answer);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());