var App = (function() {
  function App(data) {
    this.collection = new Collection(data);
    this.view = new CollectionView(this.collection);
  }
  
  App.prototype.mount = function(selector) {
    $(selector).append(this.view.el);
  }
  
  return App;
})();
