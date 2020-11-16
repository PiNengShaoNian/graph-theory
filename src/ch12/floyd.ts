import EdgeWeightedGraph from '../lib/EdgeWeightedGraph'

export class Floyd {
  private _distance: number[][]

  constructor(graph: EdgeWeightedGraph) {
    this._distance = Array.from({ length: graph.vertices() }, () =>
      Array.from({ length: graph.vertices() }, () => Infinity)
    )

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      this._distance[vertex][vertex] = 0

      for (const edge of graph.adjacent(vertex)) {
        const neighbor = edge.other(vertex)

        this._distance[vertex][neighbor] = edge.weight()
      }
    }

    for (let t = 0; t < graph.vertices(); t++) {
      for (let v = 0; v < graph.vertices(); v++) {
        for (let w = 0; w < graph.vertices(); w++) {
          if (
            this._distance[v][t] + this._distance[t][w] <
            this._distance[v][w]
          ) {
            this._distance[v][w] = this._distance[v][t] + this._distance[t][w]
          }
        }
      }
    }
  }

  distance(vertex1: number, vertex2: number): number {
    return this._distance[vertex1][vertex2]
  }
}
