/*
给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
*/

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
  const height = board.length
  const width = board[0].length

  const indexToVertex = (i: number, j: number): number => {
    return i * width + j
  }
  const directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
  const vertexToIndex = (vertex: number): [number, number] => {
    return [Math.floor(vertex / width), vertex % width]
  }
  const visited: boolean[][] = Array.from({ length: height }, () => [])
  const idToVerticesMap = new Map<number, [number, number][]>()
  const enclavesMap = new Map<number, boolean>()
  let count: number = 0

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j] === 'O' && !visited[i][j]) {
        const vertex = indexToVertex(i, j)
        const stack: number[] = []
        stack.push(vertex)
        visited[i][j] = true
        idToVerticesMap.set(count, [[i, j]])

        if (i - 1 < 0 || j - 1 < 0 || i + 1 >= height || j + 1 >= width) {
          enclavesMap.set(count, false)
        } else enclavesMap.set(count, true)

        while (stack.length) {
          const originVertex = stack.pop()!
          const [y, x] = vertexToIndex(originVertex)
          for (const [yOffset, xOffset] of directions) {
            const newY = y + yOffset
            const newX = x + xOffset

            if (
              newY >= 0 &&
              newY < height &&
              newX >= 0 &&
              newX < width &&
              !visited[newY][newX] &&
              board[newY][newX] === 'O'
            ) {
              if (
                newX - 1 < 0 ||
                newY - 1 < 0 ||
                newX + 1 >= width ||
                newY + 1 >= height
              ) {
                enclavesMap.set(count, false)
              }

              idToVerticesMap.get(count)!.push([newY, newX])
              stack.push(indexToVertex(newY, newX))
              visited[newY][newX] = true
            }
          }
        }
        count++
      }
    }
  }

  const enclaves = [...enclavesMap.entries()].filter(([_, value]) => value)

  for (const [id] of enclaves) {
    if (idToVerticesMap.get(id)) {
      for (const [i, j] of idToVerticesMap.get(id)!) {
        board[i][j] = 'X'
      }
    }
  }
}

solve([
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
])
