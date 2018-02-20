import {isEmpty} from './utils'

const regMobile = /^1[3456789]\d{9}$/
const regIdcard15 = /^\d{15}$/
const regIdcard18 = /^\d{17}[\dXx]$/

const rules = {
  required: (val) => {
    return !isEmpty(val)
  },
  mobile: (val) => {
    return regMobile.test(val)
  },
  'string': (val, cfg) => {
    return !cfg.limit || val.length <= cfg.limit
  },
  'number': (val, cfg) => {
    val = parseInt(val)
    if (cfg.max && val > cfg.max) return false
    if (cfg.min && val < cfg.min) return false
    return true
  },
  'regular': (val, cfg) => {
    return cfg.expression.test(val)
  },
  'idcard': (val) => {
    return regIdcard15.test(val) || regIdcard18.test(val)
  }
}

export default rules
