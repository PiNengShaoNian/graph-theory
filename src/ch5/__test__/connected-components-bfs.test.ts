import path from 'path'
import Graph from '../../ch2/graph'
import ConnectedComponents from '../connected-components-bfs'

test('能正确计算连通分量', () => {
  let graph = new Graph(path.join(__dirname, '../graph-with-three-cc.txt'))
  let cc = new ConnectedComponents(graph)

  expect(cc.count()).toBe(3)
  expect(cc.id(5)).toBe(2)

  graph = new Graph(path.join(__dirname, '../g.txt'))
  cc = new ConnectedComponents(graph)
  expect(cc.count()).toBe(1)
})
