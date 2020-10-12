import path from 'path'
import AdjMatrix from '../adj-matrix'

test('AdjMatrix能正常生成邻接矩阵', () => {
  const matrix = new AdjMatrix(path.join(__dirname, '../g.txt'))

  expect(matrix.toString().replace(/\s+/g, '')).toEqual(
    `0 1 0 1 0 0 0
  1 0 1 0 0 0 1
  0 1 0 1 0 1 0
  1 0 1 0 1 0 0
  0 0 0 1 0 1 0
  0 0 1 0 1 0 1
  0 1 0 0 0 1 0`.replace(/\s+/g, '')
  )
})
