import can from 'can'
import 'can/view/stache/'
import $ from 'jquery'

import test from 'tape'
import tapColor from 'tap-browser-color'

import canHot from '../can-hot'

canHot.config({preserveState: true})

tapColor()

test('Load component', (t) => {
  System.import('test/test-component').then(() => {
    $(() => {
      $('body').append(can.stache('<test-component/>'))
      t.end()
    })
  })
})

test('Reload updated component with preserveState', (t) => {
  System.import('test/test-component-updated').then(() => {
    t.ok(canHot.reloadedTags.length === 1 &&
      canHot.reloadedTags[0] === 'test-component',
      'reloadedTags contain one test-component')

    t.ok(window._insertedCalled === true,
      'Inserted method called')

    canHot.reload()
    t.ok(canHot.reloadedTags.length === 0, 'reloadedTags cleared')
    t.ok(/updated/.test($('h1').text()), 'Title updated')
    t.ok(/JESUS CHRIST/.test($('h2').text()), 'Name updated')
    t.ok($('h3').text() === '33', 'Age stays the same')

    t.ok(window._insertedCalled === false,
      'Removed method called on reloaded component')

    t.ok(window._updatedInsertedCalled === true,
      'Inserted method called on updated component')

    t.end()
  })
})

test('Reload without preserveState', (t) => {

  canHot.config({preserveState: false})
  canHot.reloadedTags.push('test-component')
  canHot.reload()

  canHot.config({preserveState: false})
  canHot.reloadedTags.push('test-component')
  canHot.reload()
  t.ok($('h3').text() === '2033', 'Age updated')
  t.end()
})
