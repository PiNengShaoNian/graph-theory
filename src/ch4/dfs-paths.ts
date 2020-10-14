import Graph from '../ch2/graph'

class DFSPaths {
  private G: Graph
  private visited: boolean[] = []
  private source: number
  private edgeTo: number[] = []

  constructor(G: Graph, s: number) {
    this.G = G
    this.source = s

    this.dfs(s)
  }

  dfs(v: number): void {
    this.visited[v] = true

    for (const w of this.G.adj(v)) {
      if (!this.visited[w]) {
        this.edgeTo[w] = v
        this.dfs(w)
      }
    }
  }

  hasPathTo(vertex: number): boolean {
    return this.visited[vertex]
  }

  pathTo(vertex: number): number[] | null {
    if (!this.hasPathTo(vertex)) return null
    const stack: number[] = []

    for (
      let currentVertex = vertex;
      currentVertex != this.source;
      currentVertex = this.edgeTo[currentVertex]
    ) {
      stack.push(currentVertex)
    }

    stack.push(this.source)

    return stack
  }
}

export default DFSPaths
