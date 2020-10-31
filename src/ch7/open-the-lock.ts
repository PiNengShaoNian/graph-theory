/*
你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/open-the-lock
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

import LoopQueue from '../lib/LoopQueue'

export function openLock(deadends: string[], target: string): number {
  const distTo: number[] = []
  const deadendsSet = new Set(deadends.map((v: string) => +v))

  const getNextStates = (state: number): number[] => {
    const digits = (state + '').padStart(4, '0')
    const res: number[] = []

    for (let i = 0; i < digits.length; i++) {
      const temp = [...digits]
      const d = +temp[i]

      if (d === 9) {
        temp[i] = '0'
      } else {
        temp[i] = d + 1 + ''
      }
      res.push(+temp.join(''))

      if (d === 0) {
        temp[i] = '9'
      } else {
        temp[i] = d - 1 + ''
      }
      res.push(+temp.join(''))
    }

    return res
  }

  const queue: LoopQueue<number> = new LoopQueue()
  const visited: boolean[] = []
  if (!deadendsSet.has(0)) {
    queue.enqueue(0)
    visited[0] = true
    distTo[0] = 0
  }
  const targetState = +target

  while (queue.size()) {
    const vertex = queue.dequeue()!
    const neighbors = getNextStates(vertex)

    for (const neighbor of neighbors) {
      if (!deadendsSet.has(neighbor) && !visited[neighbor]) {
        if (targetState === neighbor) return distTo[vertex] + 1
        distTo[neighbor] = distTo[vertex] + 1
        visited[neighbor] = true
        queue.enqueue(neighbor)
      }
    }
  }

  return typeof distTo[targetState] === 'undefined' ? -1 : distTo[+target]
}
