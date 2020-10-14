import { readFileSync } from 'fs'
import Bag from '../lib/Bag'

class AdjList {
  private _V: number
  private _E: number
  private _adj: Bag<number>[]

  constructor(filename: string) {
    const text = readFileSync(filename, {
      encoding: 'utf8',
    })

    const [ve, ...edges] = text.split(/\n/)

    const [v, e] = ve.split(' ').map(Number)
    this._adj = Array.from({ length: v }, () => new Bag())
    this._V = v
    this._E = e

    for (let i = 0; i < edges.length; i++) {
      const [vertex1, vertex2] = edges[i].split(' ').map(Number)

      if (vertex1 !== vertex2) {
        this._adj[vertex1].add(vertex2)
        this._adj[vertex2].add(vertex1)
      }
    }
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  hasEdge(vertex1: number, vertex2: number): boolean {
    for (const vertex of this._adj[vertex2]) {
      if (vertex === vertex1) return true
    }

    return false
  }

  adj(vertex: number): number[] {
    const vertices: Set<number> = new Set()

    for (const v of this._adj[vertex]) {
      vertices.add(v)
    }

    return Array.from(vertices)
  }

  degree(vertex: number): number {
    return this.adj(vertex).length
  }

  toString(): string {
    let str = ''

    for (let v = 0; v < this._V; v++) {
      str += `${v}: `
      for (const vertex of this._adj[v]) {
        str += `${vertex} `
      }

      str += '\n'
    }

    return str
  }
}

export default AdjList
