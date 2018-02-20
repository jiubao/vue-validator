import allRules from './rules'
import {on, off} from './utils'

const events = ['input']

export default class Validator {
  constructor (el, rules) {
    this.el = el
    this.rules = rules || []

    this.bind()
  }

  bind () {
    events.forEach(evt => {
      on(this.el, evt, this.validate.bind(this))
    })
  }

  validate () {
    var val = this.getValue()
    return !this.rules.some(rule => {
      var result = allRules[rule.key](val, rule.value)
      console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
      return !result
    })
  }

  getValue () {
    return this.el.value
  }

  destroy () {
    // events.forEach(evt => {
    //   off(this.el, evt, this.validate.bind(this))
    // })
  }
}
