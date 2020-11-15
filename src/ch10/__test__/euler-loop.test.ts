import { EulerLoop } from '../euler-loop'
import GraphWithDelete from '../../lib/GraphWithDelete'
test('EulerLoop正常工作', () => {
  const graph = new GraphWithDelete(5)

  graph.addEdge(0, 1)
  graph.addEdge(0, 2)
  graph.addEdge(1, 2)
  graph.addEdge(2, 3)
  graph.addEdge(2, 4)
  graph.addEdge(3, 4)

  const el = new EulerLoop(graph)

  expect(el.hasEulerLoop()).toBeTruthy()

  expect(el.eluerPath()).toEqual([0, 2, 4, 3, 2, 1, 0])
})
