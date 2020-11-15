import ConnectedComponentsEdgeWeightedGraph from '../lib/ConnectedComponentsEdgeWeightedGraph'
import Edge from '../lib/Edge'
import EdgeWeightedGraph from '../lib/EdgeWeightedGraph'
import MinPQ from '../lib/MinPQ'

export default class Prime {
  private _mst: Edge[] = []
  private hasMst = true

  constructor(graph: EdgeWeightedGraph) {
    const cc = new ConnectedComponentsEdgeWeightedGraph(graph)

    if (cc.count() > 1) {
      this.hasMst = false
    }

    const minPQ = new MinPQ<Edge>()
    const visited: boolean[] = []
    visited[0] = true
    for (const edge of graph.adjacent(0)) {
      minPQ.insert(edge)
    }

    while (minPQ.size()) {
      const edge = minPQ.deleteMin()!

      const vertex1 = edge.either()
      const vertex2 = edge.other(vertex1)

      if (visited[vertex1] && visited[vertex2]) continue

      this._mst.push(edge)
      const nextVertex = visited[vertex1] ? vertex2 : vertex1

      visited[nextVertex] = true

      for (const edge of graph.adjacent(nextVertex)) {
        minPQ.insert(edge)
      }
    }
  }

  mst(): Edge[] | null {
    if (!this.hasMst) return null

    return this._mst
  }
}
