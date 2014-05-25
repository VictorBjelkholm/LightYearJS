VAction = require('./VAction').VAction

class VActionRoot
  @actionsEls: []
  @actions: []
  @document

  constructor: (@document) ->
    @actions = []
    @actionsEls = @document.querySelectorAll('[action]')
    for action in @actionsEls
      actionAttr = action.getAttribute('action')
      actionInstance = new VAction(action, actionAttr)
      @actions.push(actionInstance)

root = exports ? window
root.VActionRoot = VActionRoot
