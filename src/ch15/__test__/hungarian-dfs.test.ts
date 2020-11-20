import path from 'path'
import Graph from '../../lib/Graph'
import { HungarianDFS } from '../hungarian-dfs'

test('BipartiteMatching正常工作', () => {
  const graph = new Graph(path.join(__dirname, './', 'g.txt'))

  const bm = new HungarianDFS(graph)
  expect(bm.maxMatching()).toBe(3)
  const graph2 = new Graph(path.join(__dirname, './', 'g2.txt'))

  const bm2 = new HungarianDFS(graph2)
  expect(bm2.maxMatching()).toBe(4)
})
