import can from 'can'
import 'can/view/stache/'
import template from './template.stache!'

can.Component.extend({
  tag: 'test-component',
  template: template,

  viewModel: {
    name: 'Jesus Christ',
    age: 33
  }

})
