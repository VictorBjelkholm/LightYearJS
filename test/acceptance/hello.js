var expect = chai.expect;

describe('acceptance tests', function() {
  describe('action root', function() {
    it('find elements with data-action', function() {
      var actionRoot = new VActionRoot(document);
      expect(actionRoot.actions.length).to.equal(4);
    });
  });
  describe('mediator', function() {
    it('should be able to react to events', function(done) {
      VMediator.subscribe("button:click", function(ev) {
        console.log('Reacting to button click!');
        expect(ev.target.value).to.equal('Button Master!');
        done();
      });
      $('.rootTest[action="click:button:click"]').trigger('click');
    });
    it('let two instances subscribe to the same channel', function(done) {
      var hello = 'hola mundo';
      VMediator.subscribe('namespace2:action', function() {
        //First subscriber
      });
      VMediator.subscribe('namespace2:action', function(eventData) {
        expect(hello).to.equal(eventData);
        done();
      });

      VMediator.publish('namespace2:action', hello);
    })
  });
});
