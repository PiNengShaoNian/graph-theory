import Graph from '../../lib/Graph'
import { findCutPoints } from '../find-cut-points'

test('findBridges正常工作', () => {
  const graph = new Graph(7)

  graph.addEdge(0, 1)
  graph.addEdge(0, 2)
  graph.addEdge(1, 3)
  graph.addEdge(2, 3)
  graph.addEdge(3, 5)
  graph.addEdge(4, 5)
  graph.addEdge(4, 6)
  graph.addEdge(5, 6)

  expect(findCutPoints(graph)).toEqual([5, 3])

  const tree = new Graph(4)

  tree.addEdge(0, 1)
  tree.addEdge(0, 2)
  tree.addEdge(2, 3)
  expect(findCutPoints(tree)).toEqual([2, 0])
})
