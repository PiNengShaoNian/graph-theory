import EdgeWeightedGraph from '../../lib/EdgeWeightedGraph'
import { Floyd } from '../floyd'
import path from 'path'

test('Dijkstra正常工作', () => {
  const graph = new EdgeWeightedGraph(path.join(__dirname, 'g.txt'))
  const f = new Floyd(graph)

  expect(f.distance(0, 1)).toBe(3)
  expect(f.distance(0, 4)).toBe(6)
})
