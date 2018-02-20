Vue.use(window['vue-validator'])

var app = new Vue({
  el: '#app',
  data: {
    message: 'vue validator',
    name: 'xiad',
    phone: '18737373737',
    ruleRequired: {
      required: true
    },
    ruleMobile: {
      rules: [{
        key: 'mobile'
      }],
      required: true
    }
  }
})
