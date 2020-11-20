import path from 'path'
import Graph from '../../lib/Graph'
import { BipartiteMatching } from '../bipartite-matching'

test('BipartiteMatching正常工作', () => {
  const graph = new Graph(path.join(__dirname, './', 'g.txt'))

  const bm = new BipartiteMatching(graph)
  expect(bm.maxMatching()).toBe(3)
  const graph2 = new Graph(path.join(__dirname, './', 'g2.txt'))

  const bm2 = new BipartiteMatching(graph2)
  expect(bm2.maxMatching()).toBe(4)
})
