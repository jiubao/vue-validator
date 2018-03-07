import {isEmpty} from './utils'

const regMobile = /^1[3456789]\d{9}$/
const regIdcard15 = /^\d{15}$/
const regIdcard18 = /^\d{17}[\dXx]$/
const regNumber = /^[0-9]+$/
const regDecimal = /^-?\d*(\.\d+)?$/

const rules = {
  required: (value) => {
    return !isEmpty(value)
  },
  mobile: (value) => {
    if (isEmpty(value)) return false
    return regMobile.test(value)
  },
  'regular': (value, expression) => {
    return expression.test(value)
  },
  'idcard': (value) => {
    if (isEmpty(value)) return false
    return regIdcard15.test(value) || regIdcard18.test(value)
  },
  'number': (value) => {
    return regNumber.test(String(value));
  },
  'decimal': (value) => {
    return regDecimal.test(value)
  },
  'max': (value, max) => {
    if (isEmpty(value)) return false
    return Number(value) <= max
  },
  'min': (value, min) => {
    if (isEmpty(value)) return false
    return Number(value) >= min
  },
  'max_length': (value, length) => {
    if (isEmpty(value)) return length >= 0
    return String(value).length <= length
  },
  'min_length': (value, length) => {
    if (isEmpty(value)) return length <= 0
    return String(value).length >= length
  }
}

export default rules
