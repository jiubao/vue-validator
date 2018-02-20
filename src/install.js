import directive from './directive'
import Validator from './validator'
import cfg from './config'

export default function (vue, options) {
  options && config(options)
  vue.directive('validator', directive)
  vue.prototype.$$validators = Validator.all
}

function config (items) {
  items = items || {}
  cfg.events = items.events || cfg.events
  // cfg.errorClass = items.errorClass || cfg.errorClass
  cfg.onSuccess = items.onSuccess || cfg.onSuccess
  cfg.onError = items.onError || cfg.onError
}
