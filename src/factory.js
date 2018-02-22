// manage validators by module name
import Validator from './validator'
import {uid} from './utils'

const validators = {}

function add (el, rules, key, vm) {
  var id = uid()
  return validators[id] = new Validator(id, el, rules, key, vm)
}

function all () {
  return validators
}
function pass () {
  return !Object.keys(validators).some(key => !validators[key].pass)
}

function find (id) {
  return validators[id]
}

export default {
  add, all, pass, find
}
