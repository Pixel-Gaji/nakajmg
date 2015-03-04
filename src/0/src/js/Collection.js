var Collection= (function() {
  function Collection(data) {
    this.data = data;
    this.models = [];
    this._initilize();
  }
  
  Collection.prototype._initilize = function() {
    var _this = this;
    
    this.data.forEach(function(src, index) {
      var model = new Model(src);
      model.id = index;
      _this.models.push(model);
    });
  }
  
  Collection.prototype.allON = function() {
    this.models.forEach(function(model) {
      model.power = true;
    });
  }
  
  Collection.prototype.allOFF = function() {
    this.models.forEach(function(model) {
      model.power = false;
    });
  }
  
  return Collection;
})();
