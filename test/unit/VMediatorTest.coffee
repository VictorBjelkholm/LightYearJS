assert = require 'assert'
VMediator = require('../src/VMediator').VMediator


describe 'VMediator Tests', () ->
  before () =>
    @mediator = VMediator

  it 'should be able to publish/subscribe events', (done) =>
    hello = 'hola mundo'
    @mediator.Subscribe 'namespace:action', (eventData) ->
      assert.equal hello, eventData
      done()

    @mediator.Publish 'namespace:action', hello

  it 'should be able to install mediator to object', (done) =>
    self = this
    randomObject = () ->
      this.name = "Josef"
      self.mediator.InstallTo(this)
      this.onChange = (newName) =>
        this.name = newName
      this.Subscribe 'random:change', this.onChange
      this

    sut = new randomObject()
    sut.Publish 'random:change', 'newname!'

    assert.equal 'newname!', sut.name
    done()

  it 'should throw error if channel doesn\'t exists', () =>
    try
      @mediator.Publish 'helvete:klicka'
    catch error
      assert.equal 'No channel like that', error.message

