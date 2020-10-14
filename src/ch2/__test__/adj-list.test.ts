import path from 'path'
import AdjList from '../adj-list'

test('AdjMatrix能正常生成图', () => {
  const matrix = new AdjList(path.join(__dirname, '../g.txt'))

  expect(matrix.toString().replace(/\s+/g, '')).toEqual(
    `0: 3 1
  1: 6 2 0
  2: 5 3 1
  3: 4 2 0
  4: 5 3
  5: 6 4 2
  6: 5 1`.replace(/\s+/g, '')
  )
})
