export const isArray = Array.isArray
export const isString = (value) => typeof value === 'string'
export const isObject = (value) => value !== null && typeof value === 'object'
export const isNumber = (value) => typeof value === 'number'

export const emptyFn = () => {}

export function on (element, evt, handler) {
  element.addEventListener(evt, handler, false)
}

export function off (element, evt, handler) {
  element.removeEventListener(evt, handler, false)
}

export function isEmpty (val) {
  return val === undefined || val === null || val === ''
}

export function getBindingValue (vm, key) {
  return key.split('.').reduce((acc, cv, ci, arr) => {
    return acc[cv]
  }, vm)
}

export function prop (el, key, value) {
  var key = `data-vv-${key}`
  return arguments.length === 2 ? el.getAttribute(key) : el.setAttribute(key, value)
}

var id = 0
export function uid () {
  return id++
}

export function shallowCopy () {
  var result = {}
  for (var i = 0; i < arguments.length; i++)
    Object.keys(arguments[i]).forEach(key => result[key] = arguments[i][key])
  return result
}
