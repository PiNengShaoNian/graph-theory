/*
让我们一起来玩扫雷游戏！

给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，'X' 则表示一个已挖出的地雷。

现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：

如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
如果在此次点击中，若无更多方块可被揭露，则返回面板。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minesweeper
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function updateBoard(board: string[][], click: number[]): string[][] {
  const [y, x] = click
  const originValue = board[y][x]

  if (originValue === 'M') {
    board[y][x] = 'X'
    return board
  }

  const height = board.length
  const width = board[0].length

  const indexToVertex = (i: number, j: number): number => {
    return i * width + j
  }
  const directions: [number, number][] = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ]

  const mines = (i: number, j: number): number => {
    let count = 0
    for (const [yOffset, xOffset] of directions) {
      const newY = i + yOffset
      const newX = j + xOffset

      if (
        newY >= 0 &&
        newY < height &&
        newX >= 0 &&
        newX < width &&
        board[newY][newX] === 'M'
      ) {
        count++
      }
    }

    return count
  }

  const vertexToIndex = (vertex: number): [number, number] => {
    return [Math.floor(vertex / width), vertex % width]
  }

  const visited: boolean[][] = Array.from({ length: height }, () => [])
  const stack: number[] = []

  stack.push(indexToVertex(y, x))
  visited[y][x] = true
  while (stack.length) {
    const originVertex = stack.pop()!
    const [y, x] = vertexToIndex(originVertex)
    const m = mines(y, x)
    if (m > 0) {
      board[y][x] = m.toString()
    } else {
      board[y][x] = 'B'

      for (const [yOffset, xOffset] of directions) {
        const newY = y + yOffset
        const newX = x + xOffset

        if (
          newY >= 0 &&
          newY < height &&
          newX >= 0 &&
          newX < width &&
          !visited[newY][newX] &&
          board[newY][newX] === 'E'
        ) {
          stack.push(indexToVertex(newY, newX))
          visited[newY][newX] = true
        }
      }
    }
  }

  return board
}
