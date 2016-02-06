import can from 'can/'
import './style.less!'
import template from './view.stache!'

can.Component.extend({

  tag: 'bmi-slider',
  template: template,

  viewModel: {
    setVal: function (val) {
      this.attr('value', val)
    }
  }
})
