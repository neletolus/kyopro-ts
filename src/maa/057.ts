import * as fs from "fs";

const main = (input: string) => {
    const [kStr, nStr] = input.trim().split(/\s+/);
    const K = parseInt(kStr!, 10);
    const N = BigInt(nStr!);
    const MOD = 1000000007n; // 10^9 + 7

    // 戦略 (プロファイルDP + 行列の繰り返し二乗法):
    // K×N (K≤4, N≤10^18) を 1×2 / 2×1 ドミノで完全に敷き詰める通り数。
    // 列を左から右へ 1 列ずつ処理し、状態として「次の列に突き出している
    // 水平ドミノの分布」を K bit のマスクで持つ。
    //
    // 状態の定義:
    //   s = K bit のマスク。bit i が 1 なら「現在処理中の列の i 行目は
    //   既に左の列から伸びてきた水平ドミノで埋まっている」。
    //
    // 遷移:
    //   状態 s で現列に入り、現列を完全に埋めて次列に s' を残す通り数を
    //   T[s'][s] とする (素朴な DFS で列挙)。
    //   現列の各 i 行目について
    //     - 既に埋まっている (bit が立っている) ならスキップ
    //     - そうでなければ
    //         (a) 水平ドミノを置く: 現列の i を埋め、s' の i bit を立てる
    //         (b) 縦ドミノ (i, i+1) を置く: i+1 が空なら両方埋める
    //
    // 答え:
    //   v_0 = e_0 (突出なし) から始め、N 列分 T を掛けて、
    //   最後に「突出なし」状態に戻る通り数 = (T^N)[0][0]。
    //
    // 計算量:
    //   行列サイズ 2^K ≤ 16。行列積 O((2^K)^3) ≤ 4096 回の bigint 乗算。
    //   繰り返し二乗法で O(log N) ≒ 60 回 → 全体 ≒ 25 万回の BigInt 演算で十分高速。
    //
    // 数値型について:
    //   (10^9)^2 ≒ 10^18 が中間で出るので BigInt 必須。N も 10^18 なので BigInt。

    const SIZE = 1 << K; // 状態数 (2^K)

    // 行列を flat な長さ SIZE*SIZE の配列で表現。M[i][j] = m[i*SIZE + j]
    type Mat = bigint[];

    const idx = (i: number, j: number): number => i * SIZE + j;

    const mul = (A: Mat, B: Mat): Mat => {
        const C: Mat = new Array<bigint>(SIZE * SIZE).fill(0n);
        for (let i = 0; i < SIZE; i++) {
            for (let k = 0; k < SIZE; k++) {
                const aik = A[idx(i, k)]!;
                if (aik === 0n) continue; // 疎な行列なのでゼロスキップ
                for (let j = 0; j < SIZE; j++) {
                    C[idx(i, j)] = (C[idx(i, j)]! + aik * B[idx(k, j)]!) % MOD;
                }
            }
        }
        return C;
    };

    const matpow = (M: Mat, exp: bigint): Mat => {
        // 単位行列
        let result: Mat = new Array<bigint>(SIZE * SIZE).fill(0n);
        for (let i = 0; i < SIZE; i++) result[idx(i, i)] = 1n;
        let base: Mat = M.slice();
        while (exp > 0n) {
            if (exp & 1n) result = mul(result, base);
            base = mul(base, base);
            exp >>= 1n;
        }
        return result;
    };

    // 遷移行列 T を構築する。T[s'][s] = 状態 s から次状態 s' への通り数
    const T: Mat = new Array<bigint>(SIZE * SIZE).fill(0n);

    // base = 入る側の状態。row=0 から K まで進めながら、現列を埋め切る
    // 全ての (s_next) を列挙し、T[s_next][base] を 1 加算する。
    const fillColumn = (
        row: number,
        s_curr: number,
        s_next: number,
        base: number
    ): void => {
        if (row === K) {
            // 現列の全行を埋め終えた。s_next が次列への突出。
            T[idx(s_next, base)] = T[idx(s_next, base)]! + 1n;
            return;
        }
        if ((s_curr >> row) & 1) {
            // この行は既に埋まっている
            fillColumn(row + 1, s_curr, s_next, base);
            return;
        }
        // (a) 水平ドミノ: 現列の row を埋め、次列の row も埋める
        fillColumn(
            row + 1,
            s_curr | (1 << row),
            s_next | (1 << row),
            base
        );
        // (b) 縦ドミノ: row と row+1 を一緒に埋める
        if (row + 1 < K && !((s_curr >> (row + 1)) & 1)) {
            fillColumn(
                row + 2,
                s_curr | (1 << row) | (1 << (row + 1)),
                s_next,
                base
            );
        }
    };

    for (let base = 0; base < SIZE; base++) {
        fillColumn(0, base, 0, base);
    }

    // T^N を計算し [0][0] が答え
    const Tn = matpow(T, N);
    console.log(Tn[idx(0, 0)]!.toString());
};

main(fs.readFileSync("/dev/stdin", "utf8").trimEnd());
