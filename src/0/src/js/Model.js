var Model = (function() {
  function Model(opt) {
    this.power = !!opt.power;
    this.color = opt.color || 'yellow';
  }
  
  Model.prototype.on = function() {
    this.power = true;
  }

  Model.prototype.off = function() {
    this.power = false;
  }
  
  Model.prototype.toggle = function() {
    this.power ? this.off() : this.on();
  }
  
  return Model;
})();
