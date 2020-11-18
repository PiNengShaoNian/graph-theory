import path from 'path'
import EdgeWeightedDigraph from '../../lib/EdgeWeightedDigraph'
import { Kosaraju } from '../kosaraju'

test('Kosaraju正常使用', () => {
  const graph = new EdgeWeightedDigraph(
    path.join(__dirname, './', 'graph-with-two-cc.txt')
  )

  const cc = new Kosaraju(graph)

  expect(cc.count()).toBe(3)
  expect(cc.id(2)).toBe(cc.id(1))
})
