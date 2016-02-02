import can from 'can'
import $ from 'jquery'

// set hotDeps on template files for hot-reload
if (typeof System !== 'undefined' && System.loads) {
  var instantiate = System.instantiate
  System.instantiate = function (load) {
    if (load.name && /(stache|mustache|ejs)\/system/.test(load.name)) {
      load.hotDeps = true
    }
    return instantiate.apply(this, arguments)
  }
}

var removeContainedElements = (elements) => {
  var i = 0
  while (elements.length > i) {
    let contained = elements.reduce((contains, e) => {
      return contains || $.contains(e, elements[i])
    }, false)
    contained ? elements.splice(i, 1) : i++
  }
}

const canHot = {
  preserveState: false,
  reloadedTags: [],
  tagToComponent: [],
  insertedEvent: true,
  removedEvent: true,
  hotEvents: true,
  reload: () => {
    if (!canHot.reloadedTags.length) return

    var tags = canHot.reloadedTags.reduce((prev, tag) =>
        prev.concat(can.makeArray($(tag)))
      , [])
    removeContainedElements(tags)
    tags.forEach(tag => tag.forceUpdate())
    canHot.reloadedTags = []
  },
  after: () => {
    canHot.reload()
  },
  teardown: () => {
    can.route &&
    can.route._teardown &&
    can.route._teardown()
  },
  config: (options) => {
    for (let key in options) {
      if (canHot.hasOwnProperty(key)) {
        canHot[key] = options[key]
      } else {
        console.warn(`[can-hot] illegal config option ${key}`)
      }
    }
  }
}

var oldSetup = can.Component.setup

var knownTags = {}

can.Component.setup = function (stat, proto) {
  if (knownTags[proto.tag]) {
    canHot.reloadedTags.push(proto.tag)
  } else {
    knownTags[proto.tag] = true
  }

  oldSetup.apply(this, arguments)
  canHot.tagToComponent[proto.tag] = this
}

var getControl = ($el) => {
  var controls = can.data($el, 'controls')
  if (!controls) {
    console.warn('[can-hot] element does not have "controls" data', $el)
    return
  }
  var viewModel = $el.viewModel()
  return controls.filter((control) =>
    control.viewModel === viewModel
  )[0]
}

var checkAndRunEvent = ($el, event, check) => {
  var control = check && getControl($el)
  if (control && typeof control[event] === 'function') {
    control[event]($el, {})
  }
}

var oldPrototypeSetup = can.Component.prototype.setup

can.Component.prototype.setup = function (el, componentTagData) {
  var self = this

  el.forceUpdate = function () {
    var $el = can.$(el)
    var viewModel = $el.viewModel()
    var state = viewModel.attr()

    checkAndRunEvent($el, 'removed', canHot.removedEvent)
    checkAndRunEvent($el, 'beforeHot', canHot.hotEvents)
    checkAndRunEvent($el, 'destroy', true)

    $el.html('')
    can.data($el, 'preventDataBindings', false)
    var Component = canHot.tagToComponent[self.tag]
    Component.prototype.setup(el, componentTagData)

    checkAndRunEvent($el, 'inserted', canHot.insertedEvent)
    checkAndRunEvent($el, 'afterHot', canHot.hotEvents)

    if (canHot.preserveState) {
      delete state['%root']
      $el.viewModel().attr(state)
    }
  }
  oldPrototypeSetup.apply(this, arguments)
}

export default canHot
