/*
在一个 N × N 的方形网格中，每个单元格有两种状态：空（0）或者阻塞（1）。

一条从左上角到右下角、长度为 k 的畅通路径，由满足下述条件的单元格 C_1, C_2, ..., C_k 组成：

相邻单元格 C_i 和 C_{i+1} 在八个方向之一上连通（此时，C_i 和 C_{i+1} 不同且共享边或角）
C_1 位于 (0, 0)（即，值为 grid[0][0]）
C_k 位于 (N-1, N-1)（即，值为 grid[N-1][N-1]）
如果 C_i 位于 (r, c)，则 grid[r][c] 为空（即，grid[r][c] == 0）
返回这条从左上角到右下角的最短畅通路径的长度。如果不存在这样的路径，返回 -1 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shortest-path-in-binary-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function shortestPathBinaryMatrix(grid: number[][]): number {
  const width = grid[0].length
  const height = grid.length

  const indexToVertex = (i: number, j: number): number => {
    return i * width + j
  }
  const directions: [number, number][] = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ]

  const vertexToIndex = (vertex: number): [number, number] => {
    return [Math.floor(vertex / width), vertex % width]
  }
  const visited: boolean[][] = Array.from({ length: height }, () => [])
  const distTo: number[][] = Array.from({ length: height }, () => [])

  const queue: number[] = []

  queue.push(indexToVertex(0, 0))
  distTo[0][0] = 1
  visited[0][0] = true

  while (queue.length) {
    const originVertex = queue.shift()!
    const [y, x] = vertexToIndex(originVertex)
    for (const [yOffset, xOffset] of directions) {
      const newY = yOffset + y
      const newX = xOffset + x

      if (
        newY >= 0 &&
        newY < height &&
        newX >= 0 &&
        newX < width &&
        !visited[newY][newX] &&
        grid[newY][newX] === 0
      ) {
        visited[newY][newX] = true
        queue.push(indexToVertex(newY, newX))
        distTo[newY][newX] = distTo[y][x] + 1
      }
    }
  }

  return distTo[grid.length - 1][grid[0].length - 1] || -1
}

console.log(
  shortestPathBinaryMatrix([
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
  ])
)
