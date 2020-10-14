import Graph from '../ch2/graph'
import LoopQueue from '../lib/LoopQueue'

class BFSPaths {
  private visited: boolean[] = []
  private G: Graph
  private edgeTo: number[] = []
  private source: number
  private _distTo: number[] = []

  constructor(G: Graph, source: number) {
    this.G = G
    this.source = source
    this._distTo[source] = 0

    this.bfs(source)
  }

  bfs(v: number) {
    const queue = new LoopQueue<number>()
    this.visited[v] = true
    queue.enqueue(v)

    while (queue.size()) {
      const vertex = queue.dequeue()!

      for (const neighbor of this.G.adj(vertex)) {
        if (!this.visited[neighbor]) {
          queue.enqueue(neighbor)
          this.edgeTo[neighbor] = vertex
          this._distTo[neighbor] = this._distTo[vertex] + 1
          this.visited[neighbor] = true
        }
      }
    }
  }

  hasPathTo(vertex: number): boolean {
    return this.visited[vertex]
  }

  pathTo(vertex: number): null | number[] {
    if (!this.hasPathTo(vertex)) return null

    const path: number[] = []
    for (
      let currentVertex = vertex;
      currentVertex !== this.source;
      currentVertex = this.edgeTo[currentVertex]
    ) {
      path.push(currentVertex)
    }

    path.push(this.source)

    return path
  }

  distTo(vertex: number): number {
    return this._distTo[vertex]
  }
}

export default BFSPaths
