import Graph from '../ch2/graph'
import LoopQueue from '../lib/LoopQueue'

class BFS {
  private visited: boolean[] = []
  private G: Graph
  private _order: number[] = []

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
      this._order.push(vertex)

      for (const neighbor of this.G.adj(vertex)) {
        if (!this.visited[neighbor]) {
          queue.enqueue(neighbor)
          this.visited[neighbor] = true
        }
      }
    }
  }

  order(): number[] {
    return this._order
  }
}

export default BFS
