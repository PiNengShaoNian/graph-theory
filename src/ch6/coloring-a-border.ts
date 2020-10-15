function colorBorder(
  grid: number[][],
  r0: number,
  c0: number,
  color: number
): number[][] {
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
  const originValue = grid[r0][c0]

  const visted: boolean[][] = Array.from({ length: height }, () => [])
  const stack: number[] = []

  const isBorder = (i: number, j: number): boolean => {
    for (const [yOffset, xOffset] of directions) {
      const newY = yOffset + i
      const newX = xOffset + j

      if (newY >= height || newY < 0 || newX >= width || newX < 0) {
        return true
      }

      if (grid[newY][newX] !== originValue) return true
    }

    return false
  }

  stack.push(indexToVertex(r0, c0))
  const borders: [number, number][] = []
  visted[r0][c0] = true
  if (isBorder(r0, c0)) {
    borders.push([r0, c0])
  }

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
        !visted[newY][newX] &&
        grid[newY][newX] === originValue
      ) {
        visted[newY][newX] = true
        stack.push(indexToVertex(newY, newX))
        if (isBorder(newY, newX)) {
          borders.push([newY, newX])
        }
      }
    }
  }

  for (let k = 0; k < borders.length; k++) {
    const [i, j] = borders[k]

    grid[i][j] = color
  }

  return grid
}
