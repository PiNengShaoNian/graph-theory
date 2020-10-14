import Graph from '../../ch2/graph'
import path from 'path'
import BFS from '../bfs'

test('BFS工作正常', () => {
  const graph = new Graph(path.join(__dirname, '../g.txt'))
  const bfs = new BFS(graph)

  expect(bfs.order()).toEqual([0, 1, 2, 3, 4, 6, 5])
})
