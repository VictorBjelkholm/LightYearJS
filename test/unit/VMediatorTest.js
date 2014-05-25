assert = require('assert');
VMediator = require('../../src/VMediator').VMediator;

describe('VMediator Tests', function() {
  var self = this;
  before(function() {
    self.mediator = VMediator;
  });

  it('should be able to publish/subscribe events', function(done) {
    hello = 'hola mundo';
    self.mediator.subscribe('namespace:action', function(eventData) {
      assert.equal(hello, eventData);
      done();
    });
    self.mediator.publish('namespace:action', hello);
  });

  it('should be able to install mediator to object', function() {
    function randomObject() {
      var _this = this;
      this.name = 'Josef';
      self.mediator.install(this);

      this.onChange = function(newName) {
        _this.name = newName;
      }

      this.subscribe('random:change', this.onChange);
      return this;
    }

    sut = new randomObject();
    sut.publish('random:change', 'newname!');

    assert.equal('newname!', sut.name);
  })

  it('should throw error if channel doesn\'t exists', function() {
    try {
      self.mediator.publish('helvete:klicka');
    } catch (error) {
      assert.equal('No channel like that', error.message);
    }
  });

})
