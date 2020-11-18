import path from 'path'
import EdgeWeightedDigraph from '../../lib/EdgeWeightedDigraph'
import { Topological, Topological2 } from '../topological'

test('Topological正常工作', () => {
  const graph = new EdgeWeightedDigraph(path.join(__dirname, './', 'g.txt'))

  const tp = new Topological(graph)

  expect(tp.order()).toEqual([0, 1, 3, 2, 4])

  const tp2 = new Topological2(graph)
  expect(tp2.order()).toEqual([0, 1, 3, 2, 4])
})
