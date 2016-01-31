import can from 'can/'
import './style.less!'


can.Component.extend({

  tag: 'bmi-slider',
  template: `
    <div class="label">{{label}}: {{value}}</div>
    <input type="range"
      ($input)="setVal($element.val())"
      {($value)}="value"
      min="{{min}}" max="{{max}}"
    />
    <div class="notes">
      <span class="min">min: {{min}}</span>
      <span class="max">max: {{max}}</span>
    </div>
  `,

  viewModel: {
    setVal: function (val) {
      this.attr('value', val)
    }
  }
})
