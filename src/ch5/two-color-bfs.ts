import Graph from '../ch2/graph'
import LoopQueue from '../lib/LoopQueue'

const RED = true

class TwoColorBFS {
  private visited: boolean[] = []
  private G: Graph
  private _isTwoColorable: boolean = true
  private color: boolean[] = []

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
    this.color[v] = RED

    while (queue.size()) {
      const vertex = queue.dequeue()!

      for (const neighbor of this.G.adj(vertex)) {
        if (!this.visited[neighbor]) {
          queue.enqueue(neighbor)
          this.color[neighbor] = !this.color[vertex]
          this.visited[neighbor] = true
        } else if (this.color[neighbor] === this.color[vertex]) {
          this._isTwoColorable = false
        }
      }
    }
  }

  isTwoColorable(): boolean {
    return this._isTwoColorable
  }
}

export default TwoColorBFS
