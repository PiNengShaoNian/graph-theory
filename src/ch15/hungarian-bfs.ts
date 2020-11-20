import TwoColorBFS from '../ch5/two-color-bfs'
import Graph from '../lib/Graph'
import LoopQueue from '../lib/LoopQueue'

export class HungarianBFS {
  private graph: Graph
  private _maxMatching: number = 0
  private matching: number[] = []

  constructor(graph: Graph) {
    this.graph = graph

    const twoColor = new TwoColorBFS(graph)

    if (!twoColor.isTwoColorable()) return

    const colors = twoColor.colors()

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (colors[vertex] && this.matching[vertex] === undefined) {
        if (this.bfs(vertex)) this._maxMatching++
      }
    }
  }

  bfs(vertex: number): boolean {
    const queue = new LoopQueue<number>()
    const edgeTo: number[] = []

    queue.enqueue(vertex)
    edgeTo[vertex] = vertex

    while (queue.size()) {
      const cur = queue.dequeue()!

      for (const neighbor of this.graph.adjacent(cur)) {
        if (edgeTo[neighbor] !== undefined) continue

        if (this.matching[neighbor] !== undefined) {
          edgeTo[this.matching[neighbor]] = neighbor
          edgeTo[neighbor] = cur
          queue.enqueue(this.matching[neighbor])
        } else {
          edgeTo[neighbor] = cur
          const path = this.getAugPath(edgeTo, vertex, neighbor)

          for (let i = 0; i < path.length; i += 2) {
            this.matching[path[i]] = path[i + 1]
            this.matching[path[i + 1]] = path[i]
          }

          return true
        }
      }
    }

    return false
  }

  getAugPath(edgeTo: number[], source: number, cur: number): number[] {
    const res: number[] = []

    while (cur !== source) {
      res.push(cur)
      cur = edgeTo[cur]
    }

    res.push(source)

    return res
  }

  maxMatching(): number {
    return this._maxMatching
  }

  isPerfectMaching(): boolean {
    return this._maxMatching * 2 === this.graph.vertices()
  }
}
