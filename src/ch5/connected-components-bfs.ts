import Graph from '../ch2/graph'
import LoopQueue from '../lib/LoopQueue'

class ConnectedComponentsBFS {
  private visited: boolean[] = []
  private G: Graph
  private _count: number = 0
  private _id: number[] = []

  constructor(G: Graph) {
    this.G = G

    for (let source = 0; source < G.V(); source++) {
      if (!this.visited[source]) {
        this.bfs(source)
        this._count++
      }
    }
  }

  bfs(v: number) {
    const queue = new LoopQueue<number>()
    this.visited[v] = true
    queue.enqueue(v)

    while (queue.size()) {
      const vertex = queue.dequeue()!
      this._id[vertex] = this._count

      for (const neighbor of this.G.adj(vertex)) {
        if (!this.visited[neighbor]) {
          queue.enqueue(neighbor)
          this.visited[neighbor] = true
        }
      }
    }
  }

  count(): number {
    return this._count
  }

  id(vertex: number): number {
    return this._id[vertex]
  }
}

export default ConnectedComponentsBFS
