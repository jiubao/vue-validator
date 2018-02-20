import Validator from './validator'

export default {
  bind: function (el, binding) {
    console.log('validator directive binded')
    var rules = binding.value.rules || []
    binding.value.required && rules.unshift({key: 'required'})
    var v1 = new Validator(el, rules)
    binding.value.$$validator = v1
  },
  update: function (el, binding) {
    console.log('updating...')
  },
  unbind: function (el, binding) {
    binding.value.$$validator.destroy()
  },
  name: 'validator'
}
