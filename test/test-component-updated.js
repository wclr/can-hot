import can from 'can'
import 'can/view/stache/'
import template from './template-updated.stache!'

can.Component.extend({
  tag: 'test-component',
  template: template,

  viewModel: {
    name: 'Jesus Christ',
    age: 2033
  },

  helpers: {
    upper: (x) => {
      return x().toUpperCase()
    }
  }

})
