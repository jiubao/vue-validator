import allRules from './rules'
import {on, off, emptyFn, getBindingValue, prop, isEmpty, shallowCopy} from './utils'
import config from './config'
import factory from './factory'

const formElms = ['INPUT', 'TEXTAREA', 'SELECT']

export default class Validator {
  constructor (id, el, rules, key, vm, init) {
    this.id = id
    this.el = el
    prop(el, 'id', this.id)
    this.rules = rules || []
    this.key = key
    this.vm = vm
    this.fails = []
    // this.vm[config.errorKey].key = ''

    this.pass = false
    this.onError = config.onError || emptyFn
    this.onSuccess = config.onSuccess || emptyFn
    this.validate(init)
    // this._validate = this.validate.bind(this)
    this._validate = () => this.validate()

    this.bind()
  }

  bind () {
    if (this.key) {
      this.unwatch = this.vm.$watch(this.key, this._validate)
    } else if (formElms.indexOf(this.el.tagName) >= 0) {
      config.events.forEach(evt => {
        on(this.el, evt, this._validate)
      })
    }
  }

  validate (trigger) {
    var val = this.getValue()
    this.fails = []
    if (isEmpty(val) && !this.rules.some(rule => rule.key === 'required')) {
      this.pass = true
    } else {
      this.pass = !this.rules.some(rule => {
        var pass = allRules[rule.key](val, rule.value)
        if (!pass) this.fails.push(rule)

        // console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
        return !pass
      })
    }
    this.vm[config.errorKey] = shallowCopy(this.vm[config.errorKey], {[this.key]: this.pass ? '' : this.fails[0].message})
    // this.pass ? removeClass(this.el, this.errorClass) : addClass(this.el, this.errorClass)
    trigger !== false && (this.pass ? this.onSuccess(this) : this.onError(this))
    this.vm[config.resultKey] = factory.pass(this.vm)
    return this.pass
  }

  getValue () {
    return this.key && this.vm ? getBindingValue(this.vm, this.key) : this.el.value
  }

  destroy () {
    this.unwatch && this.unwatch()
    this.el && config.events.forEach(evt => off(this.el, evt, this._validate))
    this.el = this.vm = this._validate = null
  }
}
