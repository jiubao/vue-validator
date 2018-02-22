// manage validators by module name
import Validator from './validator'
import {uid} from './utils'

const validators = {}
var instance = null

export default class ValidatorFactory {
  constructor () {}

  static get instance () {
    if (!instance) instance = new ValidatorFactory()
    return instance
  }

  add (el, rules, key, vm) {
    var id = uid()
    validators[id] = new Validator(id, el, rules, key, vm)
  }

  all () {
    return validators
  }

  static get pass () {
    return !Object.keys(validators).some(key => !validators[key].pass)
  }

  static find (id) {
    return validators[id]
  }
}
