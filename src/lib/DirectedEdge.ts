import Comparable from '../model/Comparable'

export default class DirectedEdge implements Comparable<DirectedEdge> {
  private vertex1: number
  private vertex2: number
  private _weight: number

  constructor(vertex1: number, vertex2: number, weight: number) {
    this.vertex1 = vertex1
    this.vertex2 = vertex2
    this._weight = weight
  }

  equals(that: DirectedEdge): boolean {
    return (
      that.vertex1 === this.vertex1 &&
      that.vertex2 === this.vertex2 &&
      this._weight === that._weight
    )
  }

  public weight(): number {
    return this._weight
  }

  public from(): number {
    return this.vertex1
  }

  public to(): number {
    return this.vertex2
  }

  public compareTo(that: DirectedEdge): number {
    if (this.weight < that.weight) {
      return -1
    } else if (this.weight > that.weight) {
      return 1
    } else {
      return 0
    }
  }
}
