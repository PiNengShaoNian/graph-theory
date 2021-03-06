import path from 'path'
import Graph from '../../ch2/graph'
import TwoColor from '../two-color'

test('能正确地识别二分图', () => {
  let g = new Graph(path.join(__dirname, '../two-color.txt'))
  let twoColor = new TwoColor(g)

  expect(twoColor.isTwoColorable()).toBeTruthy()

  g = new Graph(path.join(__dirname, '../not-two-color.txt'))
  twoColor = new TwoColor(g)

  expect(twoColor.isTwoColorable()).toBeFalsy()
})
