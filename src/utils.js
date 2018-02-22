export const isArray = Array.isArray

export function isString (value) {
  return typeof value === 'string'
}

export function isObject (value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object'
}

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
