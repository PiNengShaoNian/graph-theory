import DirectedEdge from '../lib/DirectedEdge'
import Edge from '../lib/Edge'
import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'

class EulerLoop {
  private _hasEulerLoop: boolean = false
  private _eluerPath: number[] | null = null

  constructor(graph: EdgeWeightedDigraph) {
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (graph.indegree(vertex) !== graph.outdegree(vertex)) {
        this._hasEulerLoop = false
        return
      }
    }

    const res: number[] = []

    const stack: number[] = []

    let curv = 0
    stack.push(curv)

    while (!stack.length) {
      if (graph.outdegree(curv)) {
        stack.push(curv)
        const w: DirectedEdge = graph.adjacent(curv).keys().next().value
        graph.removeEdge(w)
        curv = w.to()
      } else {
        res.push(curv)
        curv = stack.pop()!
      }
    }

    this._eluerPath = res
  }

  hasEulerLoop(): boolean {
    return this._hasEulerLoop
  }

  eulerLoop(): null | number[] {
    return this._eluerPath
  }
}
