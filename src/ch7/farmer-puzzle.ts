//和转盘锁那题类似
//用四位数表示分别表示 狼羊菜和农夫的位置
//0表示还没有到河对面，1表示到了河对面
//1000表示狼在河对面羊和菜农夫还没动
//其中 deadends有
// 狼  羊  菜 农夫
//  0  0   1   1
//  1  1   0   0
//  0  1   1   0
//  1  0   0   1
//  0  0   0   1
//  1  1   1   0

import LoopQueue from '../lib/LoopQueue'

const framerPuzzle = (): number[] => {
  const visited: boolean[] = []
  const deadendsSet: Set<number> = new Set([11, 1100, 110, 1001, 1, 1110])
  const edgeTo: number[] = []
  const queue = new LoopQueue<number>()

  queue.enqueue(0)
  visited[0] = true

  flag: while (queue.size()) {
    const state = queue.dequeue()!

    const digits = (state + '').padStart(4, '0')

    const nextStates: number[] = []
    const nextFramerState = digits[3] === '0' ? '1' : '0'
    nextStates.push(+`${digits[0]}${digits[1]}${digits[2]}${nextFramerState}`)
    nextStates.push(
      +`${nextFramerState}${digits[1]}${digits[2]}${nextFramerState}`
    )
    nextStates.push(
      +`${digits[0]}${nextFramerState}${digits[2]}${nextFramerState}`
    )
    nextStates.push(
      +`${digits[0]}${digits[1]}${nextFramerState}${nextFramerState}`
    )

    for (const nextState of nextStates) {
      if (!deadendsSet.has(nextState) && !visited[nextState]) {
        visited[nextState] = true
        edgeTo[nextState] = state
        queue.enqueue(nextState)

        if (nextState === 1111) break flag
      }
    }
  }

  const res: number[] = []
  if (typeof edgeTo[1111] !== 'undefined') {
    let end = 1111
    while (end !== 0) {
      res.push(end)
      end = edgeTo[end]
    }

    res.push(0)
  }
  return res
}

console.log(framerPuzzle())
