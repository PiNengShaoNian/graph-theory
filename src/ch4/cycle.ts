import Graph from '../ch2/graph'

class Cycle {
  private G: Graph
  private visited: boolean[] = []
  private _hasCycle: boolean = false
  constructor(G: Graph) {
    this.G = G

    for (let v = 0; v < G.V(); v++) {
      if (!this.visited[v]) {
        this.dfs(v, v)
      }
    }
  }

  hasCycle(): boolean {
    return this._hasCycle
  }

  dfs(vertex: number, parent: number): boolean {
    this.visited[vertex] = true

    for (const w of this.G.adj(vertex)) {
      if (!this.visited[w]) {
        if (this.dfs(w, vertex)) return true
      } else if (w !== parent) {
        this._hasCycle = true
        return true
      }
    }

    return false
  }
}

export default Cycle
