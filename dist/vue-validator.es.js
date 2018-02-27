var config = {
  events: ['input'],
  onSuccess: function () {},
  onError: function () {},
  resultKey: 'validate$pass'
  // errorClass: 'validate-fail'
}

var isArray = Array.isArray;
var isString = function (value) { return typeof value === 'string'; };
var isObject = function (value) { return value !== null && typeof value === 'object'; };
var isNumber = function (value) { return typeof value === 'number'; };

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

function prop (el, key, value) {
  var key = "data-vv-" + key;
  return arguments.length === 2 ? el.getAttribute(key) : el.setAttribute(key, value)
}

var id = 0;
function uid () {
  return id++
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
  'regular': function (value, expression) {
    return expression.test(value)
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

var formElms = ['INPUT', 'TEXTAREA', 'SELECT'];

var Validator = function Validator (id, el, rules$$1, key, vm, init) {
  var this$1 = this;

  this.id = id;
  this.el = el;
  prop(el, 'id', this.id);
  this.rules = rules$$1 || [];
  this.key = key;
  this.vm = vm;

  this.pass = false;
  this.onError = config.onError || emptyFn;
  this.onSuccess = config.onSuccess || emptyFn;
  this.validate(init);
  // this._validate = this.validate.bind(this)
  this._validate = function () { return this$1.validate(); };

  this.bind();
};

Validator.prototype.bind = function bind () {
    var this$1 = this;

  if (this.key) {
    this.unwatch = this.vm.$watch(this.key, this._validate);
  } else if (formElms.indexOf(this.el.tagName) >= 0) {
    config.events.forEach(function (evt) {
      on(this$1.el, evt, this$1._validate);
    });
  }
};

Validator.prototype.validate = function validate (trigger) {
  var val = this.getValue();
  this.pass = !this.rules.some(function (rule) {
    var result = rules[rule.key](val, rule.value);
    // console.log(`rule: ${rule.key}, value: ${val}, result: ${result}`)
    return !result
  });
  // this.pass ? removeClass(this.el, this.errorClass) : addClass(this.el, this.errorClass)
  trigger !== false && (this.pass ? this.onSuccess(this) : this.onError(this));
  this.vm[config.resultKey] = factory.pass(this.vm);
  return this.pass
};

Validator.prototype.getValue = function getValue () {
  return this.key && this.vm ? getBindingValue(this.vm, this.key) : this.el.value
};

Validator.prototype.destroy = function destroy () {
    var this$1 = this;

  this.unwatch && this.unwatch();
  this.el && config.events.forEach(function (evt) { return off(this$1.el, evt, this$1._validate); });
  this.el = this.vm = this._validate = null;
};

// manage validators by module name

var validators = [];

function add (el, rules, key, vm, init) {
  validators.push(new Validator(uid(), el, rules, key, vm, init));
  vm[config.resultKey] = pass(vm);
}

function all (vm) {
  return vm ? validators.filter(function (v) { return v.vm === vm; }) : validators
}
function pass (vm) {
  return !all(vm).some(function (v) { return !v.pass; })
}

function find (id) {
  for (var i = validators.length - 1; i >= 0; i--) {
    if ((String(validators[i].id)) === String(id)) { return validators[i] }
  }
  return ''
  // return validators.find(v => String(v.id) === String(id))
}

function destroy (arg) {
  if (isNumber(arg)) { validators.splice(arg, 1)[0].destroy(); } // if index, destroy one
  else if (isString(arg)) { destroy(validators.indexOf(find(arg))); } // if string, destroy by id
  else if (arg instanceof Validator) { destroy(validators.indexOf(arg)); } // if Validator, destroy one
  else // if vm, destroy component, if null, destroy all
    { for (var i = validators.length - 1; i >= 0; i--)
      { if (!arg || arg === validators[i].vm)
        { destroy(i); } } }
}

var factory = {
  add: add, all: all, pass: pass, find: find, destroy: destroy
}

var mixin = {
  data: function data () {
    var obj;

    return ( obj = {}, obj[config.resultKey] = false, obj)
  },
  beforeDestroy: function beforeDestroy () {
    factory.destroy(this);
  }
};

var directive = {
  bind: function (el, binding, vnode) {
    build(el, binding, vnode);
  },
  update: function (el, binding, vnode) {
    if (binding.value === binding.oldValue) { return }
    factory.destroy(prop(el, 'id'));
    build(el, binding, vnode);
  },
  unbind: function (el) {
    var v = factory.find(prop(el, 'id'));
    v && v.destroy();
  }
}

function getBindingKey (vnode) {
  var directives = vnode.data.directives;
  if (!vnode || !isArray(directives)) { return '' }
  for (var i = directives.length - 1; i >= 0; i--) {
    if (directives[i].name === 'model') { return directives[i].expression }
  }
  return ''
  // var directive = vnode.data.directives.find(d => d.name === 'model')
  // return directive ? directive.expression : ''
}

function build (el, binding, vnode) {
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

  var key = prop(el, 'path') || binding.arg && binding.arg.replace(/\$/g, '.') || getBindingKey(vnode);
  factory.add(el, rules, key, vnode.context, !!binding.modifiers.init);
}

var index = {
  install: function install (vue, options) {
    options && config$1(options);
    vue.mixin(mixin);
    vue.directive('validator', directive);
    vue.prototype.$$validator = factory;
  }
}

function config$1 (items) {
  items = items || {};
  config.events = items.events || config.events;
  config.onSuccess = items.onSuccess || config.onSuccess;
  config.onError = items.onError || config.onError, config.resultKey = items.resultKey || config.resultKey;
}

export default index;
