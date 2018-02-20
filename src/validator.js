import allRules from './rules'
import {on, off, addClass, removeClass, emptyFn} from './utils'
import config from './config'

// const events = ['input']
// const defaultErrorClass = 'bln-validate-fail'
const validators = []
// window.validators = []

export default class Validator {
  constructor (el, rules) {
    // config = config || {}
    this.el = el
    this.rules = rules || []
    this.pass = true
    // this.errorClass = config.errorClass
    this.onError = config.onError || emptyFn
    this.onSuccess = config.onSuccess || emptyFn
    this._validate = this.validate.bind(this)

    this.bind()

    validators.push(this)
  }

  bind () {
    config.events.forEach(evt => {
      on(this.el, evt, this._validate)
    })
  }

  validate () {
    var val = this.getValue()
    this.pass = !this.rules.some(rule => {
      var result = allRules[rule.key](val, rule.value)
      console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
      return !result
    })
    // this.pass ? removeClass(this.el, this.errorClass) : addClass(this.el, this.errorClass)
    this.pass ? this.onSuccess(this) : this.onError(this)
    return this.pass
  }

  getValue () {
    return this.el.value
  }

  destroy () {
    config.events.forEach(evt => {
      off(this.el, evt, this._validate)
    })
  }

  static get all () {
    return validators
  }
}
