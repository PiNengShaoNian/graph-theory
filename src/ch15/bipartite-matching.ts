import { MaxFlow } from '../ch14/edmonds-karp'
import TwoColor from '../ch5/two-color-bfs'
import DirectedEdge from '../lib/DirectedEdge'
import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'
import Graph from '../lib/Graph'

export class BipartiteMatching {
  private _maxMatching: number = 0
  private graph: Graph
  constructor(graph: Graph) {
    const twoColor = new TwoColor(graph)
    this.graph = graph

    if (!twoColor.isTwoColorable()) return

    const weightedDigraph = new EdgeWeightedDigraph(graph.vertices() + 2)
    const colors = twoColor.colors()
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (colors[vertex]) {
        weightedDigraph.addEdge(new DirectedEdge(graph.vertices(), vertex, 1))
      } else {
        weightedDigraph.addEdge(
          new DirectedEdge(vertex, graph.vertices() + 1, 1)
        )
      }

      for (const neighbor of graph.adjacent(vertex)) {
        if (vertex > neighbor) {
          if (colors[neighbor]) {
            weightedDigraph.addEdge(new DirectedEdge(neighbor, vertex, 1))
          } else {
            weightedDigraph.addEdge(new DirectedEdge(vertex, neighbor, 1))
          }
        }
      }
    }

    const mf = new MaxFlow(
      weightedDigraph,
      graph.vertices(),
      graph.vertices() + 1
    )
    this._maxMatching = mf.maxFlow()
  }

  maxMatching(): number {
    return this._maxMatching
  }

  isPerfectMaching(): boolean {
    return this._maxMatching * 2 === this.graph.vertices()
  }
}
