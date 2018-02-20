import Validator from './validator'
import {isArray} from './utils'

export default {
  bind: function (el, binding, vnode) {
    // console.log('validator directive binded')
    var rules = binding.value.rules || []
    binding.value.required && rules.unshift({key: 'required'})
    var key = binding.arg || getBindingKey(vnode)
    var v1 = new Validator(el, rules, key, vnode.context)
    binding.value.$$validator = v1
  },
  update: function (el, binding) {
    // console.log('updating...')
  },
  unbind: function (el, binding) {
    binding.value.$$validator.destroy()
  },
  name: 'validator'
}

function getBindingKey (vnode) {
  if (!vnode || !isArray(vnode.data.directives)) return ''
  var directive = vnode.data.directives.find(d => d.name === 'model')
  return directive ? directive.expression : ''
}
