import EdgeWeightedGraph from './EdgeWeightedGraph'

export default class ConnectedComponentsEdgeWeightedGraph {
  private visited: boolean[] = []
  private _id: number[] = []
  private _count: number = 0

  constructor(graph: EdgeWeightedGraph) {
    for (let source = 0; source < graph.vertices(); source++) {
      if (!this.visited[source]) {
        this.dfs(graph, source)
        this._count++
      }
    }
  }

  private dfs(graph: EdgeWeightedGraph, vertex: number): void {
    this.visited[vertex] = true
    this._id[vertex] = this._count

    for (const neighbor of graph.adjacent(vertex)) {
      const neighborVertex = neighbor.other(vertex)

      if (!this.visited[neighborVertex]) {
        this.dfs(graph, neighborVertex)
      }
    }
  }

  connected(vertex1: number, vertex2: number): boolean {
    return this._id[vertex1] == this._id[vertex2]
  }

  id(vertex: number): number {
    return this._id[vertex]
  }

  count(): number {
    return this._count
  }
}
