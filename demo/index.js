var validator = window['vue-validator']
// Vue.use(validator)
var errorClass = 'validate-fail'
Vue.use(validator, {
  // errorClass: 'bln-validate-fail',
  onError: (validatorInstance) => {
    addClass(validatorInstance.el, errorClass)
  },
  onSuccess: (validatorInstance) => {
    removeClass(validatorInstance.el, errorClass)
  }
})

var app = new Vue({
  el: '#app',
  data: {
    employee: {
      name: 'jiubao'
    },
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
    },
    ruleNumber: {
      rules: [{
        key: 'number'
      }, {
        key: 'max',
        value: 200
      }, {
        key: 'min',
        value: 30
      }]
    },
    ruleLength: {
      rules: [{
        key: 'max_length',
        value: 6
      }, {
        key: 'min_length',
        value: 2
      }]
    },
    ruleIDCard: {
      rules: [{
        key: 'idcard'
      }]
    }
  },
  mounted () {
    console.log('mounted...')
  }
})

/* istanbul ignore next */
function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
