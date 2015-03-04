var ModelView = (function() {
  function ModelView(model, collectionView) {
    this.collectionView = collectionView;
    this.model = model;
    this.el = $('<div>');
    this.render();
  }
  
  ModelView.prototype.render = function() {
    var _this = this;
    
    var $frag = $(document.createDocumentFragment());
    var $btn = $('<button>switch</button>');
    var color = this.model.power ? this.model.color : 'black';
    
    this.el.css({
      backgroundColor: color,
      width: 100, height: 100
    });
    
    $btn.toggleClass('on', this.model.power);

    $btn.on('click', function() {
      _this.model.toggle();
      _this.collectionView.trigger('click:switch', _this.model);
    });
    
    $frag.append($btn);
    this.el.html($frag);
    
    return this;
  }
  
  ModelView.prototype.update = function() {
    var color = this.model.power ? this.model.color : 'black';
    
    this.el.css({
      backgroundColor: color
    });
    this.el.find('button').toggleClass('on', this.model.power);
  }
  
  return ModelView;
})();
