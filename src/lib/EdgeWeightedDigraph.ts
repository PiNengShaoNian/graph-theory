import { readFileSync } from 'fs'
import Bag from './Bag'
import DirectedEdge from './DirectedEdge'

export default class EdgeWeightedDigraph {
  private _vertices: number
  private _edges: number
  private _adjacent: Set<DirectedEdge>[]
  private _indegrees: number[] = []
  private _outdegrees: number[] = []

  constructor(verticesOrFilename: number | string) {
    if (typeof verticesOrFilename === 'number') {
      this._vertices = verticesOrFilename
      this._edges = 0
      this._adjacent = Array.from(
        { length: verticesOrFilename },
        () => new Set()
      )
      this._indegrees = Array.from({ length: verticesOrFilename }, () => 0)
      this._outdegrees = Array.from({ length: verticesOrFilename }, () => 0)
    } else {
      const text = readFileSync(verticesOrFilename, {
        encoding: 'utf8',
      })

      const [ve, ...edges] = text.split(/\n/)

      const [v, e] = ve.split(' ').map(Number)
      this._adjacent = Array.from({ length: v }, () => new Set())
      this._indegrees = Array.from({ length: v }, () => 0)
      this._outdegrees = Array.from({ length: v }, () => 0)
      this._vertices = v
      this._edges = e

      for (let i = 0; i < edges.length; i++) {
        const [from, to, weight] = edges[i].split(' ').map(Number)

        if (from !== to) {
          const edge = new DirectedEdge(from, to, weight)
          this.addEdge(edge)
        }
      }
    }
  }

  public vertices(): number {
    return this._vertices
  }

  public edgesCount(): number {
    return this._edges
  }

  outdegree(vertex: number): number {
    return this._outdegrees[vertex]
  }

  indegree(vertex: number): number {
    return this._indegrees[vertex]
  }

  addEdge(edge: DirectedEdge): void {
    const to = edge.to()
    const from = edge.from()
    this._adjacent[from].add(edge)
    this._indegrees[to] += 1
    this._outdegrees[from] += 1
    this._edges++
  }

  removeEdge(edge: DirectedEdge): void {
    const to = edge.to()
    const from = edge.from()
    this._adjacent[to].delete(edge)
    this._outdegrees[from]--
    this._indegrees[to]--
  }

  public adjacent(vertex: number): Set<DirectedEdge> {
    return this._adjacent[vertex]
  }

  public edges(): Iterable<DirectedEdge> {
    const bag = new Bag<DirectedEdge>()

    for (let vertex = 0; vertex < this._vertices; vertex++) {
      for (const edge of this._adjacent[vertex]) {
        bag.add(edge)
      }
    }

    return bag
  }

  public reverse(): EdgeWeightedDigraph {
    const reverse = new EdgeWeightedDigraph(this._vertices)

    for (let vertex = 0; vertex < this._vertices; vertex++) {
      for (const edge of this.adjacent(vertex)) {
        const neighbor = edge.to()
        reverse.addEdge(new DirectedEdge(neighbor, vertex, edge.weight()))
      }
    }

    return reverse
  }

  clone(): EdgeWeightedDigraph {
    const newGraph = new EdgeWeightedDigraph(this._vertices)
    for (const edge of this.edges()) {
      newGraph.addEdge(edge)
    }

    return newGraph
  }
}
