import Graph from '../ch2/graph'

const RED = true

class TwoColor {
  private G: Graph
  private visited: boolean[] = []
  private color: boolean[] = []
  private _isTwoColorable: boolean = true

  constructor(G: Graph) {
    this.G = G

    for (let v = 0; v < G.V(); v++) {
      if (!this.visited[v]) {
        this.dfs(v, RED)
      }
    }
  }

  dfs(v: number, color: boolean): void {
    this.visited[v] = true
    this.color[v] = color

    for (const w of this.G.adj(v)) {
      if (!this.visited[w]) {
        this.dfs(w, !color)
      } else if (this.color[v] === this.color[w]) {
        this._isTwoColorable = false
      }
    }
  }

  isTwoColorable(): boolean {
    return this._isTwoColorable
  }
}

export default TwoColor
