import Graph from '../ch2/graph'
import LoopQueue from '../lib/LoopQueue'

class CycleBFS {
  private visited: boolean[] = []
  private G: Graph
  private _hasCycle: boolean = false
  private edgeTo: number[] = []

  constructor(G: Graph) {
    this.G = G

    for (let source = 0; source < G.V(); source++) {
      if (!this.visited[source]) {
        this.bfs(source)
      }
    }
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
          this.visited[neighbor] = true
        } else if (neighbor !== this.edgeTo[vertex]) {
          this._hasCycle = true
        }
      }
    }
  }

  hasCycle(): boolean {
    return this._hasCycle
  }
}

export default CycleBFS
