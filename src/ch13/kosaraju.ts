import DigraphDFS from '../lib/DigraphDFS'
import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'

export class Kosaraju {
  private _id: number[] = []
  private _count = 0
  private graph: EdgeWeightedDigraph

  constructor(graph: EdgeWeightedDigraph) {
    this.graph = graph
    const order = [...new DigraphDFS(graph.reverse()).postOrder()].reverse()

    for (const vertex of order) {
      if (this._id[vertex] === undefined) {
        this.dfs(vertex)
        this._count++
      }
    }
  }

  dfs(vertex: number): void {
    this._id[vertex] = this._count

    for (const edge of this.graph.adjacent(vertex)) {
      const to = edge.to()

      if (this._id[to] === undefined) {
        this.dfs(to)
      }
    }
  }

  count() {
    return this._count
  }

  id(vertex: number): number {
    return this._id[vertex]
  }
}
