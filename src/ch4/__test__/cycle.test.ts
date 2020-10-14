import path from 'path'
import Graph from '../../ch2/graph'
import Cycle from '../cycle'

test('能正确的检测出环', () => {
  let graph = new Graph(path.join(__dirname, '../g2.txt'))
  let cycle = new Cycle(graph)

  expect(cycle.hasCycle()).toBeTruthy()

  graph = new Graph(path.join(__dirname, '../g3.txt'))
  cycle = new Cycle(graph)
  expect(cycle.hasCycle()).toBeFalsy()
})
