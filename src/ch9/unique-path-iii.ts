export function uniquePathsIII(grid: number[][]): number {
  if (!grid.length) return 0
  const rows = grid.length
  const columns = grid[0].length
  const visited: boolean[][] = Array.from({ length: rows }, () => [])

  let left = rows * columns
  let end: number
  let start: number
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === 1) {
        start = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === 2) {
        end = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === -1) {
        left--
      }
    }
  }

  const dfs = (vertex: number, left: number): number => {
    const row = Math.floor(vertex / columns)
    const column = vertex % columns

    visited[row][column] = true
    left--
    if (left === 0 && vertex === end) {
      visited[row][column] = false
      return 1
    }

    let res = 0

    for (const [rowOffset, columnOffset] of directions) {
      const newRow = row + rowOffset
      const newColumn = column + columnOffset

      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        !visited[newRow][newColumn] &&
        grid[newRow][newColumn] === 0
      ) {
        res += dfs(newRow * columns + newColumn, left)
      }
    }

    visited[row][column] = false
    return res
  }

  return dfs(start!, left)
}

export function uniquePathsIIISolution1(grid: number[][]): number {
  if (!grid.length) return 0
  const rows = grid.length
  const columns = grid[0].length
  let visited: number = 0

  let left = rows * columns
  let end: number
  let start: number
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === 1) {
        start = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === 2) {
        end = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === -1) {
        left--
      }
    }
  }

  const dfs = (vertex: number, left: number): number => {
    const row = Math.floor(vertex / columns)
    const column = vertex % columns

    visited += 1 << vertex
    left--
    if (left === 0 && vertex === end) {
      visited -= 1 << vertex
      return 1
    }

    let res = 0

    for (const [rowOffset, columnOffset] of directions) {
      const newRow = row + rowOffset
      const newColumn = column + columnOffset

      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        (visited & (1 << (newRow * columns + newColumn))) === 0 &&
        grid[newRow][newColumn] === 0
      ) {
        res += dfs(newRow * columns + newColumn, left)
      }
    }

    visited -= 1 << vertex
    return res
  }

  return dfs(start!, left)
}

export function uniquePathsIIISolution2(grid: number[][]): number {
  if (!grid.length) return 0
  const rows = grid.length
  const columns = grid[0].length
  const memo: number[][] = Array.from(
    { length: 1 >> (rows * columns) },
    () => []
  )
  let visited: number = 0

  let left = rows * columns
  let end: number
  let start: number
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === 1) {
        start = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === 2) {
        end = i * columns + j
        grid[i][j] = 0
      } else if (grid[i][j] === -1) {
        left--
      }
    }
  }

  const dfs = (visited: number, vertex: number, left: number): number => {
    if (memo[visited][vertex] !== undefined) return memo[visited][vertex]
    const row = Math.floor(vertex / columns)
    const column = vertex % columns

    visited += 1 << vertex
    left--
    if (left === 0 && vertex === end) {
      visited -= 1 << vertex
      memo[visited][vertex] = 1
      return 1
    }

    let res = 0

    for (const [rowOffset, columnOffset] of directions) {
      const newRow = row + rowOffset
      const newColumn = column + columnOffset

      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        (visited & (1 << (newRow * columns + newColumn))) === 0 &&
        grid[newRow][newColumn] === 0
      ) {
        res += dfs(visited, newRow * columns + newColumn, left)
      }
    }

    visited -= 1 << vertex
    memo[visited][vertex] = res
    return res
  }

  return dfs(visited, start!, left)
}
