import TwoColorBFS from '../ch5/two-color-bfs'
import Graph from '../lib/Graph'

export class HungarianDFS {
  private graph: Graph
  private _maxMatching: number = 0
  private matching: number[] = []
  private visited: boolean[] = []

  constructor(graph: Graph) {
    this.graph = graph

    const twoColor = new TwoColorBFS(graph)

    if (!twoColor.isTwoColorable()) return

    const colors = twoColor.colors()

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (colors[vertex] && this.matching[vertex] === undefined) {
        this.visited = []
        if (this.dfs(vertex)) this._maxMatching++
      }
    }
  }

  dfs(vertex: number): boolean {
    this.visited[vertex] = true

    for (const neighbor of this.graph.adjacent(vertex)) {
      if (this.visited[neighbor]) continue
      this.visited[neighbor] = true
      if (
        this.matching[neighbor] === undefined ||
        this.dfs(this.matching[neighbor])
      ) {
        this.matching[vertex] = neighbor
        this.matching[neighbor] = vertex

        return true
      }
    }

    return false
  }

  maxMatching(): number {
    return this._maxMatching
  }

  isPerfectMaching(): boolean {
    return this._maxMatching * 2 === this.graph.vertices()
  }
}
