import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const [ax, ay] = lines[0]!.split(" ").map(Number);
    const [bx, by] = lines[1]!.split(" ").map(Number);
    const [cx, cy] = lines[2]!.split(" ").map(Number);

    if (ax === undefined || bx === undefined || cx === undefined || ay === undefined || by === undefined || cy === undefined) return

    const bax = ax - bx
    const bay = ay - by
    const bcx = cx - bx
    const bcy = cy - by
    const cax = ax - cx
    const cay = ay - cy
    const cbx = bx - cx
    const cby = by - cy

    // 内積が負であれば鈍角
    let pattern = 2
    if (bax * bcx + bay * bcy < 0) pattern = 1
    if (cax * cbx + cay * cby < 0) pattern = 3

    switch (pattern) {
        case 1:
            console.log(Math.sqrt(bax * bax + bay * bay));
            break;
        case 3:
            console.log(Math.sqrt(cax * cax + cay * cay));
            break;
        case 2:
            // 平行四辺形の面積はba,bcの外積
            const s = Math.abs(bax * bcy - bay * bcx)
            const bcLength = Math.sqrt(bcx * bcx + bcy * bcy)
            console.log(s / bcLength);
            break;
    }
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());