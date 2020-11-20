import path from 'path'
import Graph from '../../lib/Graph'
import { HungarianBFS } from '../hungarian-bfs'

test('BipartiteMatching正常工作', () => {
  const graph = new Graph(path.join(__dirname, './', 'g.txt'))

  const bm = new HungarianBFS(graph)
  expect(bm.maxMatching()).toBe(3)
  const graph2 = new Graph(path.join(__dirname, './', 'g2.txt'))

  const bm2 = new HungarianBFS(graph2)
  expect(bm2.maxMatching()).toBe(4)
})
