import EdgeWeightedGraph from '../../lib/EdgeWeightedGraph'
import { Dijkstra } from '../dijkstra'
import path from 'path'

test('Dijkstra正常工作', () => {
  const graph = new EdgeWeightedGraph(path.join(__dirname, 'g.txt'))
  const d = new Dijkstra(graph, 0)

  expect(d.distTo(1)).toBe(3)
  expect(d.distTo(4)).toBe(6)
})
