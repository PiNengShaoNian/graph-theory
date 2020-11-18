import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'
import LoopQueue from '../lib/LoopQueue'
import { Cycle } from './cycle'

export class Topological {
  private _order: number[] | null = null
  private _isDAG: boolean = true

  constructor(graph: EdgeWeightedDigraph) {
    const indegrees: number[] = []
    const queue = new LoopQueue<number>()
    const res: number[] = []
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      indegrees[vertex] = graph.indegree(vertex)
      if (indegrees[vertex] === 0 || indegrees[vertex] === undefined) {
        queue.enqueue(vertex)
      }
    }

    while (queue.size()) {
      const vertex = queue.dequeue()!
      res.push(vertex)

      for (const edge of graph.adjacent(vertex)) {
        indegrees[edge.to()]--

        if (indegrees[edge.to()] === 0) {
          queue.enqueue(edge.to())
        }
      }
    }

    if (res.length === graph.vertices()) {
      this._isDAG = true
      this._order = res
    }
  }

  isDAG() {
    return this._isDAG
  }

  order(): number[] | null {
    return this._order
  }
}

export class Topological2 {
  private cycle: Cycle
  private _postOrder: number[] = []
  private visited: boolean[] = []
  private _order: number[] = []
  private graph: EdgeWeightedDigraph

  constructor(graph: EdgeWeightedDigraph) {
    this.cycle = new Cycle(graph)
    this.graph = graph

    if (this.cycle.hasCycle()) return

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (!this.visited[vertex]) {
        this.dfs(vertex)
      }
    }

    this._order = [...this._postOrder].reverse()
  }

  dfs(vertex: number): void {
    this.visited[vertex] = true

    for (const edge of this.graph.adjacent(vertex)) {
      if (!this.visited[edge.to()]) {
        this.dfs(edge.to())
      }
    }

    this._postOrder.push(vertex)
  }

  order(): number[] {
    return this._order
  }

  postOrder(): number[] {
    return this._postOrder
  }

  hasCycle() {
    return this.cycle.hasCycle()
  }
}
