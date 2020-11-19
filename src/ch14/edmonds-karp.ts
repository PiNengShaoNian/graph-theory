import path from 'path'
import DirectedEdge from '../lib/DirectedEdge'
import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'
import LoopQueue from '../lib/LoopQueue'

export class MaxFlow {
  private graph: EdgeWeightedDigraph
  private residualGraph: EdgeWeightedDigraph
  private source: number
  private terminus: number
  private _maxFlow: number = 0

  constructor(graph: EdgeWeightedDigraph, source: number, terminus: number) {
    this.graph = graph
    this.source = source
    this.terminus = terminus

    this.residualGraph = new EdgeWeightedDigraph(graph.vertices())

    for (const edge of graph.edges()) {
      const to = edge.to()
      const from = edge.from()
      const weight = edge.weight()
      this.residualGraph.addEdge(new DirectedEdge(from, to, weight))
      this.residualGraph.addEdge(new DirectedEdge(to, from, 0))
    }

    while (true) {
      const edges = this.getAugmentingPath()

      if (!edges.length) break

      let minFlow = Infinity

      for (const edge of edges) {
        minFlow = Math.min(minFlow, edge.weight())
      }

      this._maxFlow += minFlow

      for (const edge of edges) {
        edge.changeWeight(edge.weight() - minFlow)

        const to = edge.to()
        const from = edge.from()
        for (const reverse of this.residualGraph.adjacent(to)) {
          if (reverse.to() === from) {
            reverse.changeWeight(reverse.weight() + minFlow)
            break
          }
        }
      }
    }
  }

  private getAugmentingPath(): DirectedEdge[] {
    const queue = new LoopQueue<number>()
    const edgeTo: DirectedEdge[] = []

    const startEdge = new DirectedEdge(this.source, this.source, 0)
    queue.enqueue(this.source)
    edgeTo[this.source] = startEdge
    while (queue.size()) {
      const vertex = queue.dequeue()!

      for (const edge of this.residualGraph.adjacent(vertex)) {
        if (!edgeTo[edge.to()] && edge.weight() > 0) {
          queue.enqueue(edge.to())
          edgeTo[edge.to()] = edge
        }
      }
    }

    const edges: DirectedEdge[] = []

    let curEdge = edgeTo[this.terminus]

    while (curEdge && curEdge != startEdge) {
      edges.push(curEdge)
      curEdge = edgeTo[curEdge.from()]
    }

    return edges
  }

  maxFlow() {
    return this._maxFlow
  }
}
