export interface GraphInterface {
  vertices(): number
  edges(): number
  adjacent(vertex: number): Iterable<number>
}
