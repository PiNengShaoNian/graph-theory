import Graph from '../lib/Graph'

export const hamiltonLoop = (graph: Graph): number[] => {
  const result: number[] = []
  const visited: boolean[] = []
  const dfs = (vertex: number, path: number[]): boolean => {
    visited[vertex] = true
    result.push(vertex)

    for (const neighbor of graph.adjacent(vertex)) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, path)) return true
      } else if (neighbor === 0 && result.length === graph.vertices()) {
        return true
      }
    }

    result.pop()
    visited[vertex] = false
    return false
  }

  if (dfs(0, result)) return result
  else return []
}
