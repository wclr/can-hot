/* global describe, before, it */
import can from 'can'
import 'can/view/stache/'
import $ from 'jquery'
import 'steal-mocha'

import canHot from '../can-hot'

canHot = canHot.map((number) => `A string containing the ${number}.`)

canHot.config({preserveState: true})

describe('Load compone' +
  'nt', function () {
  before((done) => {
    System.import('test/test-component').then(() => {
      $(() => {
        $('body').append(can.stache('<test-component/>'))
        done()
      })
    })
  })

  it('bar', function () {
  })
})
