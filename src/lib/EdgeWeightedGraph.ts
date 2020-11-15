import { readFileSync } from 'fs'
import Bag from './Bag'
import Edge from './Edge'

export default class EdgeWeightedGraph {
  private _vertices: number
  private _edges: number
  private _adjacent: Bag<Edge>[]

  public constructor(verticesOrFilename: number | string) {
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
        const [vertex1, vertex2, weight] = edges[i].split(' ').map(Number)

        if (vertex1 !== vertex2) {
          const edge = new Edge(vertex1, vertex2, weight)
          this._adjacent[vertex1].add(edge)
          this._adjacent[vertex2].add(edge)
        }
      }
    }
  }

  vertices(): number {
    return this._vertices
  }

  edgesCount(): number {
    return this._edges
  }

  addEdge(edge: Edge): void {
    const vertex1 = edge.either()
    const vertex2 = edge.other(vertex1)

    this._adjacent[vertex1].add(edge)
    this._adjacent[vertex2].add(edge)
    this._edges++
  }

  public adjacent(vertex: number): Iterable<Edge> {
    return this._adjacent[vertex]
  }

  public edges(): Iterable<Edge> {
    const edges: Bag<Edge> = new Bag()

    for (let vertex = 0; vertex < this._vertices; vertex++) {
      for (const edge of this._adjacent[vertex]) {
        if (edge.other(vertex) > vertex) {
          edges.add(edge)
        }
      }
    }

    return edges
  }

  toString(): string {
    let stringBuilder = ''

    for (let vertex = 0; vertex < this.vertices(); vertex++) {
      stringBuilder += vertex + ': '

      for (const neighbor of this.adjacent(vertex)) {
        stringBuilder += neighbor + ' '
      }
      stringBuilder += '\n'
    }

    return stringBuilder
  }
}
