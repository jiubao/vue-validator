import allRules from './rules'
import {on, off, emptyFn, getBindingValue, prop} from './utils'
import config from './config'
import factory from './validator-factory'

const formElms = ['INPUT', 'TEXTAREA', 'SELECT']

export default class Validator {
  constructor (id, el, rules, key, vm) {
    this.id = id
    this.el = el
    prop(el, 'id', this.id)
    this.rules = rules || []
    this.key = key
    this.vm = vm

    this.pass = false
    this.onError = config.onError || emptyFn
    this.onSuccess = config.onSuccess || emptyFn
    this.validate()
    this._validate = this.validate.bind(this)

    this.bind()
  }

  bind () {
    if (this.key) {
      this.vm.$watch(this.key, this._validate)
    } else if (formElms.indexOf(this.el.tagName) >= 0) {
      config.events.forEach(evt => {
        on(this.el, evt, this._validate)
      })
    }
  }

  validate () {
    var val = this.getValue()
    this.pass = !this.rules.some(rule => {
      var result = allRules[rule.key](val, rule.value)
      // console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
      return !result
    })
    // this.pass ? removeClass(this.el, this.errorClass) : addClass(this.el, this.errorClass)
    this.pass ? this.onSuccess(this) : this.onError(this)
    // this.vm[config.resultKey] = !validators.some(v => !v.pass)
    this.vm[config.resultKey] = factory.instance.pass
    return this.pass
  }

  getValue () {
    return this.key && this.vm ? getBindingValue(this.vm, this.key) : this.el.value
  }

  destroy () {
    this.el = null
    this.vm = null
    config.events.forEach(evt => {
      off(this.el, evt, this._validate)
    })
  }

  static get all () {
    return validators
  }
}
