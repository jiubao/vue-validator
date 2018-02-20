import Validator from './validator'

export default {
  bind: function (el, binding) {
    console.log('validator directive binded')
    var rules = binding.value.rules || []
    binding.value.required && rules.unshift({key: 'required'})
    var v1 = new Validator(el, rules)
  },
  update: function () {
    console.log('updating...')
  },
  unbind: function () {},
  name: 'validator'
}
