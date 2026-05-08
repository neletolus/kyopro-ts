import * as fs from "fs";

const main = (input: string) => {
    const lines = input.trim().split("\n");
    const [hStr, wStr] = lines[0]!.split(/\s+/);
    const H = parseInt(hStr!, 10);
    const W = parseInt(wStr!, 10);

    // 戦略 (前計算で O(H*W)):
    // B[i][j] = (i 行目の和) + (j 列目の和) - A[i][j]
    //   (自分自身は行和・列和で 2 回数えられるので 1 回引く)
    //
    // 行和 R[i] と列和 C[j] を 1 回走査して求めれば、各セルは O(1) で出せる。
    //
    // 数値型について:
    //   B[i][j] は最大で 99 * (H + W - 1) ≈ 99 * 4000 ≈ 4*10^5 で number に収まる。
    //
    // I/O について:
    //   出力サイズが最大 4*10^6 セルなので console.log を毎セル呼ぶと遅い。
    //   行ごとに join、最後に process.stdout.write でまとめて出力。

    const A: number[][] = new Array(H);
    const rowSum = new Array<number>(H).fill(0);
    const colSum = new Array<number>(W).fill(0);

    for (let i = 0; i < H; i++) {
        const parts = lines[i + 1]!.split(/\s+/);
        const row = new Array<number>(W);
        let s = 0;
        for (let j = 0; j < W; j++) {
            const v = parseInt(parts[j]!, 10);
            row[j] = v;
            s += v;
            colSum[j]! += v;
        }
        A[i] = row;
        rowSum[i] = s;
    }

    const out: string[] = new Array(H);
    for (let i = 0; i < H; i++) {
        const rowOut = new Array<number>(W);
        const ri = rowSum[i]!;
        const Ai = A[i]!;
        for (let j = 0; j < W; j++) {
            rowOut[j] = ri + colSum[j]! - Ai[j]!;
        }
        out[i] = rowOut.join(" ");
    }

    process.stdout.write(out.join("\n") + "\n");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
