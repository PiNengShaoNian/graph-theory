import path from 'path'
import Graph from '../../ch2/graph'
import DFSPaths from '../dfs-paths'

test('DFSPaths工作正常', () => {
  const graph = new Graph(path.join(__dirname, '../g2.txt'))
  const paths = new DFSPaths(graph, 0)

  expect(paths.pathTo(6)).toEqual([6, 2, 3, 1, 0])
  expect(paths.pathTo(5)).toBeNull()
})
