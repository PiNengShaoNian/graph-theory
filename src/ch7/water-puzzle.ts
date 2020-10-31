import LoopQueue from '../lib/LoopQueue'

const waterPuzzle = (): number[] => {
  const queue = new LoopQueue<number>()
  const visited: boolean[] = []
  const edgeTo: number[] = []

  queue.enqueue(0)
  visited[0] = true
  let end = -1
  flag: while (queue.size()) {
    const cur = queue.dequeue()!

    //max a = 5, max b = 3
    const a = Math.floor(cur / 10)
    const b = cur % 10

    const nexts: number[] = []

    nexts.push(5 * 10 + b)
    nexts.push(a * 10 + 3)
    nexts.push(0 * 10 + b)
    nexts.push(a * 10 + 0)

    const x = Math.min(a, 3 - b)
    nexts.push((a - x) * 10 + (b + x))

    const y = Math.min(5 - a, b)
    nexts.push((a + y) * 10 + (b - y))

    for (const next of nexts) {
      if (!visited[next]) {
        queue.enqueue(next)
        visited[next] = true
        edgeTo[next] = cur

        if (Math.floor(next / 10) === 4 || next % 10 === 4) {
          end = next
          break flag
        }
      }
    }
  }

  if (end !== -1) {
    const res = []

    while (end !== 0) {
      res.push(end)
      end = edgeTo[end]
    }
    res.push(0)
    return res
  } else return []
}
