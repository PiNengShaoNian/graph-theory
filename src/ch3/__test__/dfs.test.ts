import path from 'path'
import Graph from '../../ch2/graph'
import GraphDFS from '../dfs'

test('dfs工作正常', () => {
  const g = new Graph(path.join(__dirname, '../g.txt'))
  const dfs = new GraphDFS(g)

  expect(dfs.preOrder()).toEqual([0, 1, 3, 2, 6, 5, 4])
})
