import { readFileSync } from 'fs'
import Bag from './Bag'
import DirectedEdge from './DirectedEdge'

export default class EdgeWeightedDigraph {
  private _vertices: number
  private _edges: number
  private _adjacent: Bag<DirectedEdge>[]

  constructor(verticesOrFilename: number) {
    if (typeof verticesOrFilename === 'number') {
      this._vertices = verticesOrFilename
      this._edges = 0
      this._adjacent = Array.from(
        { length: verticesOrFilename },
        () => new Bag()
      )
    } else {
      const text = readFileSync(verticesOrFilename, {
        encoding: 'utf8',
      })

      const [ve, ...edges] = text.split(/\n/)

      const [v, e] = ve.split(' ').map(Number)
      this._adjacent = Array.from({ length: v }, () => new Bag())
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
    return this._adjacent[vertex].size()
  }

  addEdge(edge: DirectedEdge): void {
    this._adjacent[edge.from()].add(edge)
    this._edges++
  }

  public adjacent(vertex: number): Iterable<DirectedEdge> {
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
}
