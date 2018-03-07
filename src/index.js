import mixin from './mixin'
import directive from './directive'
import factory from './factory'
import cfg from './config'
import rules from './rules'

export default {
  install (vue, options) {
    options && config(options)
    vue.mixin(mixin)
    vue.directive('validator', directive)
    vue.prototype.$$validator = factory
  }
}

function config (items) {
  items = items || {}
  cfg.events = items.events || cfg.events
  cfg.onSuccess = items.onSuccess || cfg.onSuccess
  cfg.onError = items.onError || cfg.onError,
  cfg.resultKey = items.resultKey || cfg.resultKey
}
