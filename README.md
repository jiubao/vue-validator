# vue-validator
* zero dependencies
* 2.5k before gzipped

## Install
Note: the "vue-validator" on NPM refers to https://github.com/kazupon/vue-validator.
```sh
$ npm install --save @jiubao/vue-validator
```
```sh
$ yarn add @jiubao/vue-validator
```
```javascript
// using ES6 modules
import validator from '@jiubao/vue-validator/dist/vue-validator.es'
```

The [UMD](https://github.com/umdjs/umd) build is available on [unpkg](https://unpkg.com):
```html
<script src="https://unpkg.com/@jiubao/vue-validator@0.0.10/dist/vue-validator.umd.js"></script>
```

## Usage
basic
```js
import validator from '@jiubao/vue-validator'
Vue.use(validator)
```
```js
data: {
  name: 'jiubao',
  ruleRequired: {
    required: true
  }
}
```
```html
<input v-validator="ruleRequired" v-model="name" type="text">
```
more
```js
import validator from '@jiubao/vue-validator'
var errorClass = 'validate-fail'
Vue.use(validator, {
  onError: (validatorInstance) => {
    addClass(validatorInstance.el, errorClass)
  },
  onSuccess: (validatorInstance) => {
    removeClass(validatorInstance.el, errorClass)
  }
})
```
```js
data: {
  employee: {
    name: 'jiubao'
  },
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
  }
}
```

```html
<input v-validator:employee$name="ruleRequired" v-model="employee.name" type="text" name="" value="">
<input v-validator="ruleMobile" v-model="phone" type="text" name="" value="">
<input v-validator="ruleNumber" type="text" name="" value="">
<input v-validator="ruleLength" type="text" name="" value="">
```

## Todos
* rm install
* cannot trigger input if not on input/textarea
* cannot trigger input if changed by code
* readme
* employee$name
* directive update
* destroy validators when component unmounted
* *.es *.umd *.cjs
* jest
* ...
