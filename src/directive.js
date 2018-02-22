import Validator from './validator'
import {isArray, isObject, isString, isEmpty, prop} from './utils'

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

    var key = prop(el, 'path') || binding.arg && binding.arg.replace(/\$/g, '.') || getBindingKey(vnode)
    new Validator(el, rules, key, vnode.context)
  },
  unbind: function (el, binding, vnode) {
    var v = findValidator(el, vnode.context);
    v && v.destroy()
  }
}

function getBindingKey (vnode) {
  if (!vnode || !isArray(vnode.data.directives)) return ''
  var directive = vnode.data.directives.find(d => d.name === 'model')
  return directive ? directive.expression : ''
}

function findValidator (el, vm) {
  return vm.$$validators.find(v => String(v.id) === prop(el, 'id'))
}
