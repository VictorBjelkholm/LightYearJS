assert = require 'assert'
jsdom = require 'jsdom'
VActionRoot = require('../src/VActionRoot').VActionRoot;

html = "<input type='input' action='click:textboxes:click'></input>"

describe 'VAction Root Tests', () =>
  document = null
  sut = null
  before (done) =>
    jsdom.env(html, (errors, window) =>
      document = window.document
      sut = new VActionRoot(document)
      window.close()
      done()
    )

  it 'should find all elements with [action] attribute', () ->
    assert.equal 1, sut.actions.length
  it 'should create a corresponding action instance for every element', () ->
    action = sut.actions[0]
    assert.equal 'click:textboxes:click', action.fullName
