import { readFileSync } from 'fs'
import { GraphInterface } from '../model/GraphInterface'
import Bag from './Bag'

export default class Graph implements GraphInterface {
  private _vertices: number
  protected _edges: number
  private _adjacent: Bag<number>[]

  constructor(verticesOrFilename: number | string) {
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
        const [vertex1, vertex2] = edges[i].split(' ').map(Number)

        if (vertex1 !== vertex2) {
          this._adjacent[vertex1].add(vertex2)
          this._adjacent[vertex2].add(vertex1)
        }
      }
    }
  }

  vertices(): number {
    return this._vertices
  }

  edges(): number {
    return this._edges
  }

  addEdge(vertex1: number, vertex2: number): void {
    this._adjacent[vertex1].add(vertex2)
    this._adjacent[vertex2].add(vertex1)
    this._edges++
  }

  public getAdjacencyList(): Bag<number>[] {
    return this._adjacent
  }

  updateAdjacencyList(vertex: number, adjacencyList: Bag<number>): void {
    this._adjacent[vertex] = adjacencyList
  }

  adjacent(vertex: number): Iterable<number> {
    return this._adjacent[vertex]
  }

  degree(vertex: number): number {
    return this._adjacent[vertex].size()
  }
}
