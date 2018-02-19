import directive from './directive'

export default function (vue) {
  vue.directive('validator', directive)
}
