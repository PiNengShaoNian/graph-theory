import { readFileSync } from 'fs'

class AdjMatrix {
  private _V: number
  private _E: number
  private _adj: number[][]

  constructor(filename: string) {
    const text = readFileSync(filename, {
      encoding: 'utf8',
    })

    const [ve, ...edges] = text.split(/\n/)

    const [v, e] = ve.split(' ').map(Number)
    this._adj = Array.from({ length: v }, () =>
      Array.from({ length: v }, () => 0)
    )
    this._V = v
    this._E = e

    for (let i = 0; i < edges.length; i++) {
      const [vertex1, vertex2] = edges[i].split(' ').map(Number)

      if (vertex1 !== vertex2) {
        this._adj[vertex1][vertex2] = 1
        this._adj[vertex2][vertex1] = 1
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
    return this._adj[vertex1][vertex2] === 1
  }

  adj(vertex: number): number[] {
    const vertices: number[] = []

    for (let i = 0; i < this._V; i++) {
      if (this._adj[vertex][i] === 1) {
        vertices.push(i)
      }
    }

    return vertices
  }

  degree(vertex: number): number {
    return this.adj(vertex).length
  }

  toString(): string {
    return this._adj.map((arr) => arr.join(' ')).join('\n')
  }
}

export default AdjMatrix
