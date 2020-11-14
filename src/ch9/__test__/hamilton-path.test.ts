import Graph from '../../lib/Graph'
import { hamiltonPath } from '../hamilton-path'

test('hamiltonLoop正常工作', () => {
  const graph = new Graph(4)

  graph.addEdge(0, 1)
  graph.addEdge(0, 2)
  graph.addEdge(0, 3)
  graph.addEdge(1, 3)
  graph.addEdge(1, 2)

  expect(hamiltonPath(graph)).toEqual([0, 3, 1, 2])

  const graph1 = new Graph(4)

  graph1.addEdge(0, 1)
  graph1.addEdge(0, 2)
  graph1.addEdge(1, 2)
  graph1.addEdge(1, 3)

  expect(hamiltonPath(graph1)).toEqual([0, 2, 1, 3])
})
