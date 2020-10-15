function numEnclaves(A: number[][]): number {
  const height = A.length
  const width = A[0].length

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
  const idToAreaMap = new Map<number, number>()
  const enclavesMap = new Map<number, boolean>()

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (A[i][j] === 1 && !visited[i][j]) {
        const stack: number[] = []
        const vertex = indexToVertex(i, j)
        stack.push(vertex)
        idToAreaMap.set(count, 1)
        visited[i][j] = true
        if (i - 1 < 0 || j - 1 < 0 || i + 1 >= height || j + 1 >= width) {
          enclavesMap.set(count, false)
        } else enclavesMap.set(count, true)

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
              A[newY][newX] === 1
            ) {
              if (
                newX - 1 < 0 ||
                newY - 1 < 0 ||
                newX + 1 >= width ||
                newY + 1 >= height
              ) {
                enclavesMap.set(count, false)
              }
              idToAreaMap.set(count, (idToAreaMap.get(count) || 0) + 1)
              const neighborVertex = indexToVertex(newY, newX)
              stack.push(neighborVertex)
              visited[newY][newX] = true
            }
          }
        }
        count++
      }
    }
  }

  const enclaves = [...enclavesMap.entries()].filter(([_, value]) => value)

  return enclaves.reduce((acc, cur) => {
    return acc + idToAreaMap.get(cur[0])!
  }, 0)
}

numEnclaves([
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
])
