import Graph from '../ch2/graph'

class ConnectedComponents {
  private G: Graph
  private visited: boolean[] = []
  private _count: number = 0
  private _id: number[] = []

  constructor(G: Graph) {
    this.G = G

    for (let v = 0; v < G.V(); v++) {
      if (!this.visited[v]) {
        this.dfs(v)
        this._count++
      }
    }
  }

  count(): number {
    return this._count
  }

  dfs(v: number): void {
    this.visited[v] = true
    this._id[v] = this._count

    for (const w of this.G.adj(v)) {
      if (!this.visited[w]) this.dfs(w)
    }
  }

  id(vertex: number): number {
    return this._id[vertex]
  }

  connected(vertex1: number, vertex2: number): boolean {
    return this._id[vertex1] === this._id[vertex2]
  }
}

export default ConnectedComponents
