import mixin from './mixin'
import directive from './directive'
import Validator from './validator'
import cfg from './config'

export default {
  install (vue, options) {
    options && config(options)
    vue.mixin(mixin)
    vue.directive('validator', directive)
    vue.prototype.$$validators = Validator.all
  }
}

function config (items) {
  items = items || {}
  cfg.events = items.events || cfg.events
  // cfg.errorClass = items.errorClass || cfg.errorClass
  cfg.onSuccess = items.onSuccess || cfg.onSuccess
  cfg.onError = items.onError || cfg.onError,
  cfg.resultKey = items.resultKey || cfg.resultKey
}
