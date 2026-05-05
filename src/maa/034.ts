import * as fs from "fs";

type Point = { x: number; y: number };

const dist = (a: Point, b: Point): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
};

// px: x座標でソート済みの配列, py: y座標でソート済みの配列
const closestPair = (px: Point[], py: Point[]): number => {
    const n = px.length;

    // ベースケース: 点が3個以下なら全探索
    if (n <= 3) {
        let minD = Infinity;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                minD = Math.min(minD, dist(px[i]!, px[j]!));
            }
        }
        return minD;
    }

    // 分割: x座標で半分に分ける
    const mid = Math.floor(n / 2);
    const midX = px[mid]!.x;
    const leftPx = px.slice(0, mid);
    const rightPx = px.slice(mid);

    // py を左右に振り分け (y座標のソート順を保ったまま)
    const leftSet = new Set(leftPx);
    const leftPy: Point[] = [];
    const rightPy: Point[] = [];
    for (const p of py) {
        if (leftSet.has(p)) leftPy.push(p);
        else rightPy.push(p);
    }

    // 統治: 左右それぞれで再帰
    const dl = closestPair(leftPx, leftPy);
    const dr = closestPair(rightPx, rightPy);
    let d = Math.min(dl, dr);

    // 結合: 分割線から距離 d 以内にある点 (strip) を調べる
    const strip = py.filter((p) => Math.abs(p.x - midX) < d);

    // strip 内では y 座標でソート済み。各点について次の最大7点だけ見ればよい
    for (let i = 0; i < strip.length; i++) {
        for (let j = i + 1; j < strip.length && strip[j]!.y - strip[i]!.y < d; j++) {
            d = Math.min(d, dist(strip[i]!, strip[j]!));
        }
    }

    return d;
};

const main = (input: string) => {
    const lines = input.split("\n");
    const n = parseInt(lines[0]!);

    const points: Point[] = [];
    for (let i = 1; i <= n; i++) {
        const [x, y] = lines[i]!.split(" ").map(Number);
        points.push({ x: x!, y: y! });
    }

    const px = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
    const py = [...points].sort((a, b) => a.y - b.y || a.x - b.x);

    const result = closestPair(px, py);

    console.log(result);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());