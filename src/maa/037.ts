import * as fs from "fs";

const main = (input: string) => {
    const nums = input.split(/\s+/).filter(s => s.length > 0).map(BigInt);
    const [x1, y1, x2, y2, x3, y3, x4, y4] = nums as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint];

    // (b - a) × (c - a) を計算(BigInt で正確に) 外積
    const cross = (ax: bigint, ay: bigint, bx: bigint, by: bigint, cx: bigint, cy: bigint): bigint => {
        return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    };

    const sign = (v: bigint): number => (v > 0n ? 1 : v < 0n ? -1 : 0);

    // 共線のとき、点 C が線分 AB の境界含む内側にあるか
    const onSegment = (ax: bigint, ay: bigint, bx: bigint, by: bigint, cx: bigint, cy: bigint): boolean => {
        const minX = ax < bx ? ax : bx;
        const maxX = ax > bx ? ax : bx;
        const minY = ay < by ? ay : by;
        const maxY = ay > by ? ay : by;
        return minX <= cx && cx <= maxX && minY <= cy && cy <= maxY;
    };

    // それぞれの線分から見たもう一方の端点の向き
    const d1 = sign(cross(x3, y3, x4, y4, x1, y1));
    const d2 = sign(cross(x3, y3, x4, y4, x2, y2));
    const d3 = sign(cross(x1, y1, x2, y2, x3, y3));
    const d4 = sign(cross(x1, y1, x2, y2, x4, y4));

    let intersect = false;

    if (d1 * d2 < 0 && d3 * d4 < 0) {
        // 厳密に互いをまたいでいる
        intersect = true;
    } else if (d1 === 0 && onSegment(x3, y3, x4, y4, x1, y1)) {
        intersect = true;
    } else if (d2 === 0 && onSegment(x3, y3, x4, y4, x2, y2)) {
        intersect = true;
    } else if (d3 === 0 && onSegment(x1, y1, x2, y2, x3, y3)) {
        intersect = true;
    } else if (d4 === 0 && onSegment(x1, y1, x2, y2, x4, y4)) {
        intersect = true;
    }

    console.log(intersect ? "Yes" : "No");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());