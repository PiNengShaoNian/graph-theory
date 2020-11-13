import Graph from '../lib/Graph'

export const findCutPoints = (graph: Graph): number[] => {
  const orderOfVisits: number[] = []
  const visited: boolean[] = []
  const result: Set<number> = new Set()
  const low: number[] = []
  const dfs = (vertex: number, parent: number, order: number): void => {
    visited[vertex] = true
    orderOfVisits[vertex] = order
    low[vertex] = order

    let child = 0
    for (const neighbor of graph.adjacent(vertex)) {
      if (!visited[neighbor]) {
        dfs(neighbor, vertex, order + 1)

        child++
        low[vertex] = Math.min(low[vertex], low[neighbor])

        if (vertex !== parent && low[neighbor] >= orderOfVisits[vertex]) {
          result.add(vertex)
        }

        if (vertex === parent && child > 1) {
          result.add(vertex)
        }
      } else if (neighbor !== parent) {
        low[vertex] = Math.min(low[vertex], low[neighbor])
      }
    }
  }

  dfs(0, 0, 0)

  return Array.from(result)
}
