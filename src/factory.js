// manage validators by module name
import Validator from './validator'
import {uid, isNumber, isString} from './utils'
import config from './config'
import rules from './rules'

const validators = []

function add (el, rules, key, vm, init, errorTarget) {
  validators.push(new Validator(uid(), el, rules, key, vm, init, errorTarget))
  vm[config.resultKey] = pass(vm)
}

function all (vm) {
  return vm ? validators.filter(v => v.vm === vm) : validators
}
function pass (vm) {
  return !all(vm).some(v => !v.pass)
}

function find (id) {
  for (var i = validators.length - 1; i >= 0; i--) {
    if ((String(validators[i].id)) === String(id)) return validators[i]
  }
  return ''
  // return validators.find(v => String(v.id) === String(id))
}

function destroy (arg) {
  if (isNumber(arg)) validators.splice(arg, 1)[0].destroy() // if index, destroy one
  else if (isString(arg)) destroy(validators.indexOf(find(arg))) // if string, destroy by id
  else if (arg instanceof Validator) destroy(validators.indexOf(arg)) // if Validator, destroy one
  else // if vm, destroy component, if null, destroy all
    for (var i = validators.length - 1; i >= 0; i--)
      if (!arg || arg === validators[i].vm)
        destroy(i)
}

function addRule (key, fn) {
  rules[key] = fn
}

export default {
  add, all, pass, find, destroy, addRule, rules
}
