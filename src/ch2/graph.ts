import { readFileSync } from 'fs'

class Graph {
  private _V: number
  private _E: number
  private _adj: Set<number>[]

  constructor(filename: string) {
    const text = readFileSync(filename, {
      encoding: 'utf8',
    })

    const [ve, ...edges] = text.split(/\n/)

    const [v, e] = ve.split(' ').map(Number)
    this._adj = Array.from({ length: v }, () => new Set())
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
    return this._adj[vertex1].has(vertex2)
  }

  adj(vertex: number): number[] {
    const vertices: { [key: number]: null } = {}

    for (const v of this._adj[vertex]) {
      vertices[v] = null
    }

    return Object.keys(vertices).map(Number)
  }

  degree(vertex: number): number {
    return this._adj[vertex].size
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

export default Graph
