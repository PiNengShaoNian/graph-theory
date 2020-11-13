import Graph from '../lib/Graph'

export const findBridges = (graph: Graph): Iterable<[number, number]> => {
  const visited: boolean[] = []
  let low: number[] = []
  let visitedOrder: number[] = []
  const result: [number, number][] = []

  const dfs = (vertex: number, parent: number, order: number): void => {
    visited[vertex] = true
    low[vertex] = order
    visitedOrder[vertex] = order

    for (let neighbor of graph.adjacent(vertex)) {
      if (!visited[neighbor]) {
        dfs(neighbor, vertex, order + 1)

        low[vertex] = Math.min(low[vertex], low[neighbor])

        if (low[neighbor] > visitedOrder[vertex]) {
          result.push([vertex, neighbor])
        }
      } else if (neighbor !== parent) {
        low[vertex] = Math.min(low[neighbor], low[vertex])
      }
    }
  }

  for (let vertex = 0; vertex < graph.vertices(); vertex++) {
    visitedOrder = []
    low = []
    if (!visited[vertex]) dfs(vertex, vertex, 0)
  }

  return result
}

