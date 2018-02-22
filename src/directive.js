import Validator from './validator'
import {isArray, isObject, isString, isEmpty} from './utils'

export default {
  bind: function (el, binding, vnode) {
    var rules = []
    if (isObject(binding.value)) {
      rules = binding.value.rules || []
      binding.value.required && rules.unshift({key: 'required'})
    } else if (isString(binding.value) && !isEmpty(binding.value)) {
      binding.value.split('|').forEach(v => {
        var vs = v.split(':')
        var rule = {key: vs[0]}
        if (vs[1]) rule.value = vs[1]
        rules.push(rule)
      })
    }

    var key = el.getAttribute('data-vv-path') || binding.arg && binding.arg.replace(/\$/g, '.') || getBindingKey(vnode)
    var v1 = new Validator(el, rules, key, vnode.context)
    // binding.value.$$validator = v1
  }
  // update: function (el, binding) {
  // },
  // unbind: function (el, binding) {
  //   binding.value.$$validator.destroy()
  // },
  // name: 'validator'
}

function getBindingKey (vnode) {
  if (!vnode || !isArray(vnode.data.directives)) return ''
  var directive = vnode.data.directives.find(d => d.name === 'model')
  return directive ? directive.expression : ''
}
