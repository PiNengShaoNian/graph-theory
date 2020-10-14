import Graph from '../ch2/graph'

class GraphDFS {
  private _pre: number[] = []
  private _post: number[] = []
  private G: Graph
  private visited: boolean[] = []
  constructor(G: Graph) {
    this.G = G

    for (let v = 0; v < G.V(); v++) {
      if (!this.visited[v]) {
        this.dfs(v)
      }
    }
  }

  dfs(v: number): void {
    this.visited[v] = true
    this._pre.push(v)

    for (const w of this.G.adj(v)) {
      if (!this.visited[w]) this.dfs(w)
    }
    this._post.push(v)
  }

  nonRecursiveDfs(v: number): void {
    const stack: number[] = []

    stack.push(v)
    this.visited[v] = true

    while (stack.length) {
      const vertex = stack.pop()!
      this._pre.push(vertex)
      for (const neighbor of this.G.adj(vertex)) {
        if (!this.visited[neighbor]) {
          stack.push(neighbor)
          this.visited[neighbor] = true
        }
      }
    }
  }

  preOrder(): number[] {
    return this._pre
  }

  postOrder(): number[] {
    return this._post
  }
}

export default GraphDFS
