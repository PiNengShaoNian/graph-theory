/*
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-islands
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function numIslands(grid: string[][]): number {
  const height = grid.length
  const width = grid[0].length

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
  let count = 0

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === '1' && !visited[i][j]) {
        count++
        const stack: number[] = []
        const vertex = indexToVertex(i, j)
        stack.push(vertex)
        visited[i][j] = true

        while (stack.length) {
          const originVertex = stack.pop()!
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
              grid[newY][newX] === '1'
            ) {
              const neighborVertex = indexToVertex(newY, newX)
              stack.push(neighborVertex)
              visited[newY][newX] = true
            }
          }
        }
      }
    }
  }

  return count
}
