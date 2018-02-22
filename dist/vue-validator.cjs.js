'use strict';

var config = {
  events: ['input'],
  onSuccess: function () {},
  onError: function () {},
  resultKey: 'validate$pass'
  // errorClass: 'validate-fail'
}

var mixin = {
  data: function data () {
    var obj;

    return ( obj = {}, obj[config.resultKey] = true, obj)
  }
};

var isArray = Array.isArray;

function isString (value) {
  return typeof value === 'string'
}

function isObject (value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object'
}

var emptyFn = function () {};

function on (element, evt, handler) {
  element.addEventListener(evt, handler, false);
}

function off (element, evt, handler) {
  element.removeEventListener(evt, handler, false);
}

function isEmpty (val) {
  return val === undefined || val === null || val === ''
}

function getBindingValue (vm, key) {
  return key.split('.').reduce(function (acc, cv, ci, arr) {
    return acc[cv]
  }, vm)
}

var regMobile = /^1[3456789]\d{9}$/;
var regIdcard15 = /^\d{15}$/;
var regIdcard18 = /^\d{17}[\dXx]$/;
var regNumber = /^[0-9]+$/;

var rules = {
  required: function (value) {
    return !isEmpty(value)
  },
  mobile: function (value) {
    if (isEmpty(value)) { return false }
    return regMobile.test(value)
  },
  'regular': function (value, exp) {
    return exp.expression.test(val)
  },
  'idcard': function (value) {
    if (isEmpty(value)) { return false }
    return regIdcard15.test(value) || regIdcard18.test(value)
  },
  'number': function (value) {
    return regNumber.test(String(value));
  },
  'max': function (value, max) {
    if (isEmpty(value)) { return false }
    return Number(value) <= max
  },
  'min': function (value, min) {
    if (isEmpty(value)) { return false }
    return Number(value) >= min
  },
  'max_length': function (value, length) {
    if (isEmpty(value)) { return length >= 0 }
    return String(value).length <= length
  },
  'min_length': function (value, length) {
    if (isEmpty(value)) { return length <= 0 }
    return String(value).length >= length
  }
};

var validators = [];
var formElms = ['INPUT', 'TEXTAREA', 'SELECT'];

var Validator = function Validator (el, rules$$1, key, vm) {
  this.el = el;
  this.rules = rules$$1 || [];
  this.key = key;
  this.vm = vm;

  this.pass = false;
  this.onError = config.onError || emptyFn;
  this.onSuccess = config.onSuccess || emptyFn;
  this.validate();
  this._validate = this.validate.bind(this);

  this.bind();

  validators.push(this);
};

var staticAccessors = { all: { configurable: true } };

Validator.prototype.bind = function bind () {
    var this$1 = this;

  if (this.key) {
    this.vm.$watch(this.key, this._validate);
  } else if (formElms.indexOf(this.el.tagName) >= 0) {
    config.events.forEach(function (evt) {
      on(this$1.el, evt, this$1._validate);
    });
  }
};

Validator.prototype.validate = function validate () {
  var val = this.getValue();
  this.pass = !this.rules.some(function (rule) {
    var result = rules[rule.key](val, rule.value);
    // console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
    return !result
  });
  // this.pass ? removeClass(this.el, this.errorClass) : addClass(this.el, this.errorClass)
  this.pass ? this.onSuccess(this) : this.onError(this);
  this.vm[config.resultKey] = !validators.some(function (v) { return !v.pass; });
  return this.pass
};

Validator.prototype.getValue = function getValue () {
  return this.key && this.vm ? getBindingValue(this.vm, this.key) : this.el.value
};

Validator.prototype.destroy = function destroy () {
    var this$1 = this;

  this.el = null;
  this.vm = null;
  config.events.forEach(function (evt) {
    off(this$1.el, evt, this$1._validate);
  });
};

staticAccessors.all.get = function () {
  return validators
};

Object.defineProperties( Validator, staticAccessors );

var directive = {
  bind: function (el, binding, vnode) {
    var rules = [];
    if (isObject(binding.value)) {
      rules = binding.value.rules || [];
      binding.value.required && rules.unshift({key: 'required'});
    } else if (isString(binding.value) && !isEmpty(binding.value)) {
      binding.value.split('|').forEach(function (v) {
        var vs = v.split(':');
        var rule = {key: vs[0]};
        if (vs[1]) { rule.value = vs[1]; }
        rules.push(rule);
      });
    }

    var key = el.getAttribute('data-vv-path') || binding.arg && binding.arg.replace(/\$/g, '.') || getBindingKey(vnode);
    var v1 = new Validator(el, rules, key, vnode.context);
    // binding.value.$$validator = v1
  }
  // update: function (el, binding) {
  // },
  // unbind: function (el, binding) {
  //   binding.value.$$validator.destroy()
  // },
  // name: 'validator'
}

function getBindingKey (vnode) {
  if (!vnode || !isArray(vnode.data.directives)) { return '' }
  var directive = vnode.data.directives.find(function (d) { return d.name === 'model'; });
  return directive ? directive.expression : ''
}

var index = {
  install: function install (vue, options) {
    options && config$1(options);
    vue.mixin(mixin);
    vue.directive('validator', directive);
    vue.prototype.$$validators = Validator.all;
  }
}

function config$1 (items) {
  items = items || {};
  config.events = items.events || config.events;
  // cfg.errorClass = items.errorClass || cfg.errorClass
  config.onSuccess = items.onSuccess || config.onSuccess;
  config.onError = items.onError || config.onError, config.resultKey = items.resultKey || config.resultKey;
}

module.exports = index;
