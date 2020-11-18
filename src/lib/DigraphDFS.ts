import EdgeWeightedDigraph from './EdgeWeightedDigraph'

export default class DigraphDFS {
  private _postOrder: number[] = []
  private _preOrder: number[] = []
  private graph: EdgeWeightedDigraph
  private visited: boolean[] = []
  constructor(graph: EdgeWeightedDigraph) {
    this.graph = graph

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (!this.visited[vertex]) this.dfs(vertex)
    }
  }

  private dfs(vertex: number): void {
    this.visited[vertex] = true
    this._preOrder.push(vertex)

    for (const edge of this.graph.adjacent(vertex)) {
      if (!this.visited[edge.to()]) {
        this.dfs(edge.to())
      }
    }

    this._postOrder.push(vertex)
  }

  postOrder() {
    return this._postOrder
  }

  preOrder() {
    return this._preOrder
  }
}
