import path from 'path'
import EdgeWeightedGraph from '../lib/EdgeWeightedGraph'
import IndexMinPQ from '../lib/IndexMinPQ'

export class Dijkstra {
  private _distTo: number[]
  private visited: boolean[] = []
  constructor(graph: EdgeWeightedGraph, source: number) {
    this._distTo = Array.from({ length: graph.vertices() }, () => Infinity)

    const pq = new IndexMinPQ<number>()
    pq.insert(source, 0)
    this._distTo[source] = 0

    while (pq.size()) {
      const curVertex = pq.deleteMin()
      this.visited[curVertex] = true
      for (const edge of graph.adjacent(curVertex)) {
        const neighbor = edge.other(curVertex)
        if (!this.visited[neighbor]) {
          const newWeight = this._distTo[curVertex] + edge.weight()
          if (newWeight < this._distTo[neighbor]) {
            this._distTo[neighbor] = newWeight
            if (pq.contains(neighbor)) pq.changeKey(neighbor, newWeight)
            else pq.insert(neighbor, newWeight)
          }
        }
      }
    }
  }

  distTo(vertex: number): number {
    return this._distTo[vertex]
  }
}
