import { maxHeaderSize } from 'http'

function maxAreaOfIsland(grid: number[][]): number {
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const width = grid[0].length
  const height = grid.length

  const graph: Set<number>[] = Array.from(
    { length: width * height },
    () => new Set<number>()
  )
  const indexToVertex = (i: number, j: number): number => {
    return i * width + j
  }
  const vertexToIndex = (vertex: number): [number, number] => {
    return [Math.floor(vertex / width), vertex % width]
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let [y, x] of directions) {
        const newY = i + y
        const newX = j + x

        if (
          grid[i][j] === 1 &&
          newY < height &&
          newY >= 0 &&
          newX < width &&
          newX >= 0 &&
          grid[newY][newX] === 1
        ) {
          const vertex1 = indexToVertex(i, j)
          const vertex2 = indexToVertex(newY, newX)
          graph[vertex1].add(vertex2)
          graph[vertex2].add(vertex1)
        }
      }
    }
  }

  const visited: boolean[] = []
  let count = 0
  let id: number[] = []

  for (let source = 0; source < graph.length; source++) {
    if (!visited[source]) {
      const stack: number[] = []
      stack.push(source)
      visited[source] = true
      id[source] = count

      while (stack.length) {
        const vertex: number = stack.pop()!

        for (const neighbor of graph[vertex]) {
          if (!visited[neighbor]) {
            stack.push(neighbor)
            id[neighbor] = count
            visited[neighbor] = true
          }
        }
      }
      count++
    }
  }

  const idToVertexCountMap: { [key: string]: number } = {}

  for (let vertex = 0; vertex < graph.length; vertex++) {
    const [y, x] = vertexToIndex(vertex)
    const vertexId = id[vertex]
    if (grid[y][x] === 1) {
      idToVertexCountMap[vertexId] = (idToVertexCountMap[vertexId] || 0) + 1
    }
  }
  const ids = Object.keys(idToVertexCountMap)
  const counts: any[] = ids.map((id) => idToVertexCountMap[id])
  console.log({ idToVertexCountMap, counts })
  return Math.max(...counts, 0)
}

function maxAreaOfIsland1(grid: number[][]): number {
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const width = grid[0].length
  const height = grid.length

  const indexToVertex = (i: number, j: number): number => {
    return i * width + j
  }
  const vertexToIndex = (vertex: number): [number, number] => {
    return [Math.floor(vertex / width), vertex % width]
  }
  const visited: boolean[][] = Array.from({ length: height }, () => [])

  const dfs = (vertex: number): number => {
    let res = 1

    const [i, j] = vertexToIndex(vertex)
    visited[i][j] = true
    for (let [y, x] of directions) {
      const newY = y + i
      const newX = j + x
      if (
        newY < height &&
        newY >= 0 &&
        newX < width &&
        newX >= 0 &&
        grid[newY][newX] === 1 &&
        !visited[newY][newX]
      ) {
        visited[newY][newX] = true
        res += dfs(indexToVertex(newY, newX))
      }
    }

    return res
  }

  let res = 0
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        res = Math.max(dfs(indexToVertex(i, j)), res)
      }
    }
  }

  return res
}

debugger
maxAreaOfIsland1([
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
])
