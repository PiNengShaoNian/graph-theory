import EdgeWeightedGraph from '../../lib/EdgeWeightedGraph'
import { BellmanFord } from '../bellman-ford'
import path from 'path'

test('BellmanFord正常工作', () => {
  const graph = new EdgeWeightedGraph(path.join(__dirname, 'g.txt'))
  const bf = new BellmanFord(graph, 0)

  expect(bf.distTo(1)).toBe(3)
  expect(bf.distTo(4)).toBe(6)
})
