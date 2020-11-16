import Comparable from '../model/Comparable'

export default class IndexMinPQ<Key extends Comparable<Key> | number | string> {
  private keys: Key[] = []
  private pq: number[] = []
  private qp: number[] = []
  private _size = 0

  isEmpty() {
    return this._size === 0
  }

  size() {
    return this._size
  }

  contains(index: number): boolean {
    return this.qp[index] !== undefined
  }

  keyOf(index: number): Key {
    if (!this.contains(index)) {
      throw new Error('Index is not in the priority queue')
    }

    return this.keys[index]
  }

  insert(index: number, key: Key): void {
    if (this.contains(index)) {
      throw new Error('Index is already in the priority queue')
    }

    this._size++
    this.keys[index] = key
    this.pq[this._size] = index
    this.qp[index] = this._size

    this.swim(this._size)
  }

  deleteMin(): number {
    if (this._size === 0) {
      throw new Error('Priority queue underflow')
    }

    const minElementIndex = this.pq[1]
    this.exchange(1, this._size)
    this._size--
    this.sink(1)

    delete this.keys[this.pq[this._size + 1]]
    delete this.qp[this.pq[this._size + 1]]
    return minElementIndex
  }

  private sink(index: number): void {
    while (index * 2 <= this._size) {
      let selectedChildIndex = index * 2

      if (index * 2 + 1 <= this._size && this.more(index * 2, index * 2 + 1)) {
        selectedChildIndex = index * 2 + 1
      }

      if (!this.more(selectedChildIndex, index)) {
        this.exchange(index, selectedChildIndex)
      } else break

      index = selectedChildIndex
    }
  }

  private swim(index: number): void {
    while (index >> 1 >= 1 && this.more(index >> 1, index)) {
      this.exchange(index >> 1, index)
      index >>= 1
    }
  }

  minKey(): Key {
    if (this._size === 0) {
      throw new Error('Priority queue underflow')
    }

    return this.keys[this.pq[1]]
  }

  minIndex(): number {
    if (this._size === 0) {
      throw new Error('Priority queue underflow')
    }

    return this.pq[1]
  }

  changeKey(index: number, key: Key): void {
    if (!this.contains(index)) {
      throw new Error('Index is not in the priority queue')
    }

    this.keys[index] = key
    this.swim(this.qp[index])
    this.sink(this.qp[index])
  }

  private more(keyIndex1: number, keyIndex2: number): boolean {
    const key1 = this.keys[this.pq[keyIndex1]]
    const key2 = this.keys[this.pq[keyIndex2]]

    if (typeof key1 === 'object') {
      return (key1 as Comparable<any>).compareTo(key2) > 0
    } else {
      return key1 > key2
    }
  }

  private exchange(keyIndex1: number, keyIndex2: number): void {
    const temp = this.pq[keyIndex1]

    this.pq[keyIndex1] = this.pq[keyIndex2]
    this.pq[keyIndex2] = temp

    this.qp[this.pq[keyIndex1]] = keyIndex1
    this.qp[this.pq[keyIndex2]] = keyIndex2
  }
}
