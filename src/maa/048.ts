import * as fs from "fs";

const main = (input: string) => {
    const K = parseInt(input.trim(), 10);

    // 戦略:
    // 任意の正の整数 n は、「0 から始めて、×10 と +1 を繰り返して作る」と考えられる。
    // このとき必要な +1 の最小回数は、ちょうど n の各桁の和になる。
    //   例: 28 を作るには「+1 +1 ×10 +1 +1 +1 +1 +1 +1 +1 +1」で +1 が 10 回 = 2+8 = 桁和
    // よって「状態 = 現在の値の K で割った余り」とすると、グラフ上で
    //   ×10 操作 ... 重み 0 (桁和不変)
    //   +1 操作  ... 重み 1 (桁和 +1)
    // となり、残差 1(最初の +1 の直後)から 残差 0(K の倍数)への最短距離が答え。
    // 重みが 0 と 1 のみなので、0-1 BFS が最適。

    const INF = Infinity;
    const dist = new Array<number>(K).fill(INF);
    const processed = new Array<boolean>(K).fill(false);

    // 両端キュー: 配列を中央から両側に成長させる方式
    // (各状態は高々 1 度しか確定処理されないので、push の総数は O(K))
    const SIZE = 4 * K + 100;
    const deque = new Array<number>(SIZE);
    let head = SIZE >> 1;
    let tail = SIZE >> 1;

    // 開始: 値 1 (最初の +1 操作の直後)、残差 1 % K、コスト 1
    const startResidue = 1 % K;
    dist[startResidue] = 1;
    deque[tail++] = startResidue;

    while (head < tail) {
        const r = deque[head++]!;
        if (processed[r]) continue;
        processed[r] = true;
        const c = dist[r]!;

        if (r === 0) break; // 残差 0 = K の倍数に到達 → ここで答え確定

        // ×10 操作 (重み 0、桁和は変わらない)
        const r0 = (r * 10) % K;
        if (c < dist[r0]!) {
            dist[r0] = c;
            deque[--head] = r0; // 重み 0 → 前に追加
        }

        // +1 操作 (重み 1、桁和 +1)
        const r1 = (r + 1) % K;
        if (c + 1 < dist[r1]!) {
            dist[r1] = c + 1;
            deque[tail++] = r1; // 重み 1 → 後ろに追加
        }
    }

    console.log(dist[0]);
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());