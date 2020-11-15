import ConnectedComponentsEdgeWeightedGraph from '../lib/ConnectedComponentsEdgeWeightedGraph'
import Edge from '../lib/Edge'
import EdgeWeightedGraph from '../lib/EdgeWeightedGraph'
import WeightedQuickUnion from '../lib/WeightedQuickUnion'

class Kruskal {
  private graph: EdgeWeightedGraph
  private _mst: Edge[] = []
  private hasMst = true

  constructor(graph: EdgeWeightedGraph) {
    this.graph = graph

    const cc = new ConnectedComponentsEdgeWeightedGraph(graph)

    if (cc.count() > 1) {
      this.hasMst = false
    }

    const edges = [...graph.edges()]

    edges.sort((a, b) => a.compareTo(b))
    const uf = new WeightedQuickUnion(graph.vertices())

    for (const edge of edges) {
      const vertex1 = edge.either()
      const vertex2 = edge.other(vertex1)

      if (!uf.connected(vertex1, vertex2)) {
        this._mst.push(edge)
        uf.union(vertex1, vertex2)
      }
    }
  }

  mst(): Edge[] | null {
    if (!this.hasMst) return null

    return this._mst
  }
}
