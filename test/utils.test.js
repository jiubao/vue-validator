import {shallowCopy} from '../src/utils'

test('shallowCopy.base', () => {
  var o1 = {a: 1}
  var o2 = shallowCopy(o1)
  expect(o2.a).toBe(1)
})

test('shallowCopy.notequal', () => {
  var o1 = {a: 1}
  var o2 = shallowCopy(o1)
  var b = o1 === o2
  expect(b).toBeFalsy()
})

test('shallowCopy.multiple', () => {
  var o1 = {a: 1}
  var o2 = {b: 2, c: 3}
  var o3 = {b: 4, d: 5}
  var o4 = shallowCopy(o1, o2, o3)
  expect(o4.b).toBe(4)
})
