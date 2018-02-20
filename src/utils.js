export function isString (value) {
  return typeof value === 'string'
}

export function isNumber (value) {
  return typeof value === 'number'
}

export function isObject (value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object'
}

export function isFunction (value) {
  return typeof value === 'function'
}

export function isUndefined (value) {
  return typeof value === 'undefined'
}

export const isArray = Array.isArray

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