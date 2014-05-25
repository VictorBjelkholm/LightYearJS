assert = require 'assert'
VAction = require('../src/VAction').VAction;

describe 'Action tests', () ->
  it 'parse the action string to type, namespace, action', () ->
    action = new VAction(null, 'type:namespace:action')
    assert.equal 'type', action.type
    assert.equal 'namespace', action.namespace
    assert.equal 'action', action.action
  xit 'should listen to events on attached element'
  xit 'should publish event to mediator on event'
