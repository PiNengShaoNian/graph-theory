import Graph from '../lib/Graph'

export const hamiltonPath = (graph: Graph): number[] => {
  let visited: boolean[] = []
  let result: number[] = []

  const dfs = (vertex: number, path: number[]): boolean => {
    visited[vertex] = true
    path.push(vertex)

    if (path.length === graph.vertices()) return true

    for (const neighbor of graph.adjacent(vertex)) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, path)) return true
      }
    }

    path.pop()
    visited[vertex] = false
    return false
  }

  for (let vertex = 0; vertex < graph.vertices(); vertex++) {
    visited = []
    result = []
    if (dfs(vertex, result)) return result
  }

  return []
}
