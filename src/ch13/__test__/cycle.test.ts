import EdgeWeightedDigraph from '../../lib/EdgeWeightedDigraph'
import { Cycle } from '../cycle'
import path from 'path'
import DirectedEdge from '../../lib/DirectedEdge'

test('Cycle正常工作', () => {
  const graph = new EdgeWeightedDigraph(path.join(__dirname, './', 'g.txt'))

  let cycle = new Cycle(graph)

  expect(cycle.hasCycle()).toBeFalsy()

  graph.addEdge(new DirectedEdge(3, 0, 0))

  cycle = new Cycle(graph)

  expect(cycle.hasCycle()).toBeTruthy()
})
