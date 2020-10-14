import path from 'path'
import Graph from '../../ch2/graph'
import ConnectedComponents from '../connected-components'

test('能正确计算连通分量', () => {
  let graph = new Graph(path.join(__dirname, '../g2.txt'))
  let cc = new ConnectedComponents(graph)

  expect(cc.count()).toBe(2)
  expect(cc.id(5)).toBe(1)

  graph = new Graph(path.join(__dirname, '../g.txt'))
  cc = new ConnectedComponents(graph)
  expect(cc.count()).toBe(1)
})
