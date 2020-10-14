import path from 'path'
import Graph from '../../ch2/graph'
import Cycle from '../cycle-bfs'

test('能正确的检测出环', () => {
  let graph = new Graph(path.join(__dirname, '../g.txt'))
  let cycle = new Cycle(graph)

  expect(cycle.hasCycle()).toBeTruthy()

  graph = new Graph(path.join(__dirname, '../graph-with-three-cc.txt'))
  cycle = new Cycle(graph)
  expect(cycle.hasCycle()).toBeFalsy()
})
