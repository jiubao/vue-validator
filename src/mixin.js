import config from './config'
import factory from './factory'
var mixin = {
  data () {
    return {
      [config.resultKey]: false,
      [config.errorKey]: []
    }
  },
  beforeDestroy () {
    factory.destroy(this)
  }
}

export default mixin
