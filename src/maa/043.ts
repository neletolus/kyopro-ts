import * as fs from "fs";

const main = (input: string) => {
    const lines = input.split("\n");
    const firstLine = lines[0]!.split(" ").map(Number);
    const N = firstLine[0]!;
    const M = firstLine[1]!;

    // Union-Find
    const parent = new Array<number>(N + 1);
    const rnk = new Array<number>(N + 1).fill(0);
    for (let i = 0; i <= N; i++) parent[i] = i;

    const find = (x: number): number => {
        // 経路圧縮（反復版）
        let root = x;
        while (parent[root]! !== root) root = parent[root]!;
        while (parent[x]! !== root) {
            const next = parent[x]!;
            parent[x] = root;
            x = next;
        }
        return root;
    };

    const unite = (x: number, y: number): void => {
        const rx = find(x);
        const ry = find(y);
        if (rx === ry) return;
        const rrx = rnk[rx]!;
        const rry = rnk[ry]!;
        if (rrx < rry) {
            parent[rx] = ry;
        } else if (rrx > rry) {
            parent[ry] = rx;
        } else {
            parent[ry] = rx;
            rnk[rx] = rrx + 1;
        }
    };

    for (let i = 1; i <= M; i++) {
        const [a, b] = lines[i]!.split(" ").map(Number);
        unite(a!, b!);
    }

    const root1 = find(1);
    let connected = true;
    for (let v = 2; v <= N; v++) {
        if (find(v) !== root1) {
            connected = false;
            break;
        }
    }

    console.log(connected ? "The graph is connected." : "The graph is not connected.");
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());