/*
在一个 2 x 3 的板上（board）有 5 块砖瓦，用数字 1~5 来表示, 以及一块空缺用 0 来表示.

一次移动定义为选择 0 与一个相邻的数字（上下左右）进行交换.

最终当板 board 的结果是 [[1,2,3],[4,5,0]] 谜板被解开。

给出一个谜板的初始状态，返回最少可以通过多少次移动解开谜板，如果不能解开谜板，则返回 -1 。
*/

import LoopQueue from '../lib/LoopQueue'

function slidingPuzzle(board: number[][]): number {
  const directions: [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
  const rows = board.length
  const columns = board[0].length
  const blockCount = rows * columns
  const distTo: number[] = []
  const visited: boolean[] = []
  const queue: LoopQueue<number> = new LoopQueue()

  const boardToNumber = (board: number[][]): number => {
    let res = 0
    const columns = board[0].length

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const exponent = 6 - (i * columns + j) - 1

        res += board[i][j] * 10 ** exponent
      }
    }

    return res
  }

  const numberToBoard = (number: number): number[][] => {
    const chars = (number + '').padStart(blockCount, '0')
    const res: number[][] = Array.from({ length: rows }, () => [])
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        res[i][j] = +chars[i * columns + j]
      }
    }

    return res
  }

  const exch = (
    board: number[][],
    i1: number,
    j1: number,
    i2: number,
    j2: number
  ): void => {
    if (
      i1 < rows &&
      i2 < rows &&
      i1 >= 0 &&
      i2 >= 0 &&
      j1 < columns &&
      j2 < columns &&
      j1 >= 0 &&
      j2 >= 0
    ) {
      const temp = board[i1][j1]
      board[i1][j1] = board[i2][j2]
      board[i2][j2] = temp
    }
  }

  const origin = boardToNumber(board)
  queue.enqueue(origin)
  visited[origin] = true
  distTo[origin] = 0

  flag: while (queue.size()) {
    const number = queue.dequeue()!

    const zeroIndex = (number + '').padStart(blockCount, '0').indexOf('0')
    const i = Math.floor(zeroIndex / columns)
    const j = zeroIndex % columns

    const board = numberToBoard(number)
    for (const [rowOffset, columnOffset] of directions) {
      const newRow = rowOffset + i
      const newColumn = columnOffset + j

      exch(board, i, j, newRow, newColumn)

      const next = boardToNumber(board)
      if (!visited[next]) {
        queue.enqueue(next)
        visited[next] = true
        distTo[next] = distTo[number] + 1

        if (next === 123450) break flag
      }
      exch(board, i, j, newRow, newColumn)
    }
  }

  return typeof distTo[123450] !== 'undefined' ? distTo[123450] : -1
}
