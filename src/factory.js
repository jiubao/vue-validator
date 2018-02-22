// manage validators by module name
import Validator from './validator'
import {uid} from './utils'

// const validators = {}
const validators = []

function add (el, rules, key, vm) {
  validators.push(new Validator(uid(), el, rules, key, vm))
}

function all () {
  return validators
}
function pass () {
  // return !Object.keys(validators).some(key => !validators[key].pass)
  return validators.some(v => !v.pass)
}

function find (id) {
  // return validators[id]
  return validators.find(v => String(v.id) === String(id))
}

export default {
  add, all, pass, find
}
