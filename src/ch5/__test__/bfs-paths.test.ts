import path from 'path'
import Graph from '../../ch2/graph'
import BFSPaths from '../bfs-paths'

test('BFSPaths工作正常', () => {
  const g = new Graph(path.join(__dirname, '../g.txt'))

  const paths = new BFSPaths(g, 0)

  expect(paths.pathTo(6)).toEqual([6, 2, 0])
  expect(paths.distTo(6)).toBe(2)
  expect(paths.distTo(2)).toBe(1)
})
