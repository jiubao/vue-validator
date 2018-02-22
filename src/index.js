import mixin from './mixin'
import directive from './directive'
import factory from './validator-factory'
import cfg from './config'

export default {
  install (vue, options) {
    options && config(options)
    vue.mixin(mixin)
    vue.directive('validator', directive)
    vue.prototype.$$validators = factory
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
