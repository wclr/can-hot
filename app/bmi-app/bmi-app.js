import can from 'can/'
import 'can/map/define/'
import './style.less!'
import '../bmi-slider/'

const bmiTable = {
  underweight: {min: 0, max: 18.5},
  healthy: {min: 18.5, max: 25},
  overweight: {min: 25, max: 30},
  obese: {min: 30, max: 35, name: 'obese (stage I)'},
  obese2: {min: 35, max: 40, name: 'really obese (stage II)'},
  obese3: {min: 40, max: Infinity, name: 'freaking obese (stage III)'}
}

can.Component.extend({

  tag: 'bmi-app',
  template: can.stache(`
  <h3>This is a demo app for Can-Hot (CanJS Hot Reloading).</h3>
  <p>You may try to change sources (js/css/less) inside "app" folder and see what happens.</p>
  <p>Press (ctrl+shift+R) to reload app (restore initial state).</p>
  <hr>
  <div class="title">BMI Calculator</div>
  <div class="sub">
    BMI is a Body Mass Index defined as the body mass divided by the square of the body height.
  </div>
  <bmi-slider {(value)}="weight" label="Weight (kg)" min="20" max="180" class=" {{result}}"/>
  <bmi-slider {(value)}="height" label="Height (cm)" min="50" max="220" class=" {{result}}"/>
  <div class="result">Your BMI is {{bmi}} - <span class="{{result}}">you are {{resultName}}</span>
  </div>
  `),

  viewModel: {
    weight: 80,
    height: 180,
    age: 25,
    bmi: function () {
      let h = this.attr('height') / 100
      let w = this.attr('weight')
      return (w / h / h).toFixed(1)
    },
    result: function () {
      var bmi = this.bmi()
      return Object.keys(bmiTable).reduce((prev, key) =>
        prev ||
          (bmi >= bmiTable[key].min && bmi < bmiTable[key].max) && key
      , '')
    },

    resultName: function () {
      var result = this.result()
      return bmiTable[result].name || result
    }
  }

})
