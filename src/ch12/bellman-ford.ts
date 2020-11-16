import EdgeWeightedGraph from '../lib/EdgeWeightedGraph'

export class BellmanFord {
  private _distTo: number[]

  constructor(graph: EdgeWeightedGraph, source: number) {
    this._distTo = Array.from({ length: graph.vertices() }, () => Infinity)
    this._distTo[source] = 0
    for (let iter = 0; iter < graph.vertices() - 1; iter++) {
      for (let vertex = 0; vertex < graph.vertices(); vertex++) {
        for (const edge of graph.adjacent(vertex)) {
          const to = edge.other(vertex)

          const newWeight = this._distTo[vertex] + edge.weight()

          if (newWeight < this._distTo[to]) {
            this._distTo[to] = newWeight
          }
        }
      }
    }
  }

  distTo(vertex: number): number {
    return this._distTo[vertex]
  }
}
