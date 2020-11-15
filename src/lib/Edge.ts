import Comparable from '../model/Comparable'

export default class Edge implements Comparable<Edge> {
  private vertex1: number
  private vertex2: number
  private _weight: number

  constructor(vertex1: number, vertex2: number, weight: number) {
    this.vertex1 = vertex1
    this.vertex2 = vertex2
    this._weight = weight
  }
  equals(that: Edge): boolean {
    const { _weight, vertex1, vertex2 } = that

    return (
      _weight === this._weight &&
      vertex1 === this.vertex1 &&
      vertex2 === this.vertex2
    )
  }

  weight(): number {
    return this._weight
  }

  either(): number {
    return this.vertex1
  }

  other(vertex: number): number {
    if (vertex == this.vertex1) {
      return this.vertex2
    } else if (vertex == this.vertex2) {
      return this.vertex1
    } else {
      throw new Error('Inconsistent edge')
    }
  }

  compareTo(that: Edge): number {
    if (this.weight() < that.weight()) {
      return -1
    } else if (this.weight() > that.weight()) {
      return 1
    } else {
      return 0
    }
  }

  toString(): string {
    return `${this.vertex1}-${this.vertex2} ${this._weight}`
  }
}
