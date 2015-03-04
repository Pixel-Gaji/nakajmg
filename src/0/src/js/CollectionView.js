var CollectionView = (function() {
  function CollectionView(collection) {
    this.collection = collection;
    this.el = $('<div>');
    this.render();
    this._eventify();
  }
  
  CollectionView.prototype._eventify = function() {
    var _this = this;
    this.el.on('click:switch', function(e, model) {
      // _this.render();
      _this.update(model.id);
    });
  }
  
  CollectionView.prototype.render = function() {
    var _this = this;
    
    this.views = [];
    var $frag = $(document.createDocumentFragment());
    this.collection.models.forEach(function(model, index) {
      var modelView = new ModelView(model, _this.el);
      _this.views.push(modelView);
      $frag.append(modelView.el);
    });
    this.el.html($frag);
    
    var $on = $('<button>ON</button>')
      .on('click', function() {
        _this.collection.allON();
        _this.updateAll();
      });
    
    var $off = $('<button>OFF</button>')
      .on('click', function() {
        _this.collection.allOFF();
        _this.updateAll();
      });
      
    this.el.append($on, $off);
    
    return this;
  }
  
  CollectionView.prototype.update = function(index) {
    // this.views[index].render();
    this.views[index].update();
  }
  
  CollectionView.prototype.updateAll = function() {
    this.views.forEach(function(modelView) {
      modelView.update();
    });
  }
  
  return CollectionView;
})();
