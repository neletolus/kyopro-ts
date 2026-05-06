import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [R, C] = lines[0]!.split(" ").map(Number) as [number, number];
    const [sy, sx] = lines[1]!.split(" ").map(Number) as [number, number];
    const [gy, gx] = lines[2]!.split(" ").map(Number) as [number, number];

    // 盤面を読み込む(0-indexedで扱う)
    const grid: string[] = [];
    for (let i = 0; i < R; i++) {
        grid.push(lines[3 + i]!);
    }

    // 1-indexed → 0-indexed に変換
    const startY = sy - 1;
    const startX = sx - 1;
    const goalY = gy - 1;
    const goalX = gx - 1;

    // 距離配列 (-1 は未訪問)
    const dist: number[][] = Array.from({ length: R }, () =>
        new Array<number>(C).fill(-1)
    );

    // BFS
    // キューは配列で代用し、headポインタで管理する(shiftはO(N)で遅いため)
    const queue: [number, number][] = [];
    queue.push([startY, startX]);
    dist[startY]![startX] = 0;

    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    let head = 0;
    while (head < queue.length) {
        const [y, x] = queue[head]!;
        head++;

        // ゴールに到達したら終了してもよい
        if (y === goalY && x === goalX) break;

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i]!;
            const nx = x + dx[i]!;

            // 範囲外チェック(盤面は壁で囲まれているので実質不要だが念のため)
            if (ny < 0 || ny >= R || nx < 0 || nx >= C) continue;
            // 壁チェック
            if (grid[ny]![nx] === "#") continue;
            // 既に訪問済みチェック
            if (dist[ny]![nx] !== -1) continue;

            dist[ny]![nx] = dist[y]![x]! + 1;
            queue.push([ny, nx]);
        }
    }

    console.log(dist[goalY]![goalX]);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());