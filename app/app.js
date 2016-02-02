import can from 'can'
import 'can/view/stache/'
import $ from 'jquery'

import './app.css'
import './bmi-app/'

$(() => {
  $('body').append(can.stache(`<bmi-app/>`))
})
