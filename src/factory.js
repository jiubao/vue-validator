// manage validators by module name
import Validator from './validator'
import {uid} from './utils'

const validators = []

function add (el, rules, key, vm) {
  validators.push(new Validator(uid(), el, rules, key, vm))
}

function all (vm) {
  return vm ? validators.filter(v => v.vm === vm) : validators
}
function pass (vm) {
  return !all(vm).some(v => !v.pass)
}

function find (id) {
  return validators.find(v => String(v.id) === String(id))
}

function destroy (vm) {
  if (vm)
    for (var i = validators.length - 1; i >= 0; i--)
      if (validators[i].vm === vm) {
        validators[i].destroy()
        validators.splice(i, 1)
      }
}

export default {
  add, all, pass, find, destroy
}
