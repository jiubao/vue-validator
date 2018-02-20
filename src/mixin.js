import config from './config'
var mixin = {
  data () {
    return {
      [config.resultKey]: true
    }
  }
}

export default mixin
