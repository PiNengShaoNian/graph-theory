import { ConnectedComponents } from '../lib/ConnectdComponents'
import GraphWithDelete from '../lib/GraphWithDelete'
import Graph from '../lib/Graph'
import { verify } from 'crypto'

export class EulerLoop {
  private _hasEulerLoop: boolean = true
  private graph: GraphWithDelete

  constructor(graph: GraphWithDelete) {
    this.graph = graph.clone()
    const cc = new ConnectedComponents((graph as unknown) as Graph)

    if (cc.count() > 1) {
      this._hasEulerLoop = false
      return
    }

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (graph.degree(vertex) % 2 === 1) {
        this._hasEulerLoop = false
        break
      }
    }
  }

  hasEulerLoop(): boolean {
    return this._hasEulerLoop
  }

  eluerPath(): number[] | null {
    if (!this._hasEulerLoop) return null

    const curPath: number[] = []
    const result: number[] = []

    let curVertex = 0
    curPath.push(curVertex)

    while (curPath.length) {
      if (this.graph.degree(curVertex)) {
        const neighbor: number = this.graph.adjacent(curVertex).values().next()
          .value
        curPath.push(curVertex)
        this.graph.deleteEdge(neighbor, curVertex)
        curVertex = neighbor
      } else {
        result.push(curVertex)
        curVertex = curPath.pop()!
      }
    }

    return result
  }
}
