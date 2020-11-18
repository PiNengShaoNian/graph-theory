import EdgeWeightedDigraph from '../lib/EdgeWeightedDigraph'

export class Cycle {
  private _hasCycle: boolean = false
  private visited: boolean[] = []
  private onPath: boolean[] = []
  private graph: EdgeWeightedDigraph

  constructor(graph: EdgeWeightedDigraph) {
    this.graph = graph
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      this.dfs(vertex)
    }
  }

  private dfs(vertex: number): boolean {
    this.visited[vertex] = true
    this.onPath[vertex] = true
    for (const edge of this.graph.adjacent(vertex)) {
      const to = edge.to()

      if (!this.visited[to]) {
        if (this.dfs(to)) return true
      } else if (this.onPath[to]) {
        this._hasCycle = true
        return true
      }
    }

    this.onPath[vertex] = false
    return false
  }

  hasCycle(): boolean {
    return this._hasCycle
  }
}
