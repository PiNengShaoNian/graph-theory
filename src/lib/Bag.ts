class BagNode<Value> {
  constructor(public item: Value, public next: BagNode<Value> | null) {}
}

class Bag<Value> {
  private N = 0
  private first: BagNode<Value> | null = null
  size() {
    return this.N
  }

  add(item: Value) {
    const oldFirst = this.first
    this.first = new BagNode(item, oldFirst)

    this.N++
  }

  *[Symbol.iterator]() {
    let currentNode = this.first
    while (currentNode) {
      yield currentNode.item
      currentNode = currentNode.next
    }
  }
}

export default Bag
