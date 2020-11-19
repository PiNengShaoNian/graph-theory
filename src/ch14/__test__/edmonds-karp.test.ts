import path from 'path'
import EdgeWeightedDigraph from '../../lib/EdgeWeightedDigraph'
import { MaxFlow } from '../edmonds-karp'

test('MaxFlow正常工作', () => {
  const graph = new EdgeWeightedDigraph(
    path.join(__dirname, './', 'network.txt')
  )

  const mf = new MaxFlow(graph, 0, 3)

  expect(mf.maxFlow()).toBe(5)

  const graph2 = new EdgeWeightedDigraph(
    path.join(__dirname, './', 'network2.txt')
  )

  const mf2 = new MaxFlow(graph2, 0, 5)

  expect(mf2.maxFlow()).toBe(12)

  const graph3 = new EdgeWeightedDigraph(
    path.join(__dirname, './', 'baseball.txt')
  )

  const mf3 = new MaxFlow(graph3, 0, 10)

  expect(mf3.maxFlow()).toBe(26)
})
