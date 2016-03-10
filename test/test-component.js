import can from 'can'
import 'can/view/stache/'
import template from './template.stache!'

can.Component.extend({
  tag: 'test-component',
  template: template,

  viewModel: {
    name: 'Jesus Christ',
    age: 33
  },

  events: {
    inserted: 'someMethod',

    someMethod: function () {
      window._insertedCalled = true
    },

    removed: function () {
      window._insertedCalled = false
    }
  }

})
