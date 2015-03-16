(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, app, data;

App = require("./App");

data = [
  {
    color: 'blue',
    power: true
  }, {
    color: 'red',
    power: false
  }, {}
];

app = new App(data);

app.mount("#app");



},{"./App":2}],2:[function(require,module,exports){
var App, Collection, CollectionView;

Collection = require("./Collection");

CollectionView = require("./CollectionView.coffee");

module.exports = App = (function() {
  function App(data) {
    this.collection = new Collection(data);
    this.collectionView = new CollectionView(this.collection);
  }

  App.prototype.mount = function(selector) {
    return $(selector).append(this.collectionView.el);
  };

  return App;

})();



},{"./Collection":3,"./CollectionView.coffee":4}],3:[function(require,module,exports){
var Collection, Model;

Model = require("./Model");

module.exports = Collection = (function() {
  function Collection(data) {
    this.data = data;
    this._initialize();
  }

  Collection.prototype._initialize = function() {
    this.models = [];
    return this.data.forEach((function(_this) {
      return function(data, index) {
        var model;
        model = new Model(data);
        model.id = index;
        return _this.models.push(model);
      };
    })(this));
  };

  Collection.prototype.allOn = function() {
    return this.models.forEach(function(model) {
      return model.power = true;
    });
  };

  Collection.prototype.allOff = function() {
    return this.models.forEach(function(model) {
      return model.power = false;
    });
  };

  return Collection;

})();



},{"./Model":5}],4:[function(require,module,exports){
var CollectionView, ModelView;

ModelView = require("./ModelView");

module.exports = CollectionView = (function() {
  function CollectionView(collection) {
    this.collection = collection;
    this.render();
    this._eventify();
  }

  CollectionView.prototype.render = function() {
    this.el = $("<div>");
    this.modelViews = [];
    this.collection.models.forEach((function(_this) {
      return function(model, index) {
        var modelView;
        modelView = new ModelView(model, _this);
        _this.modelViews.push(modelView);
        return _this.el.append(modelView.el);
      };
    })(this));
    this.$turnOnBtn = $("<button>").text("ON");
    this.$turnOffBtn = $("<button>").text("OFF");
    this.el.append(this.$turnOnBtn, this.$turnOffBtn);
    return this;
  };

  CollectionView.prototype._eventify = function() {
    this.el.on("click:switch", (function(_this) {
      return function(e, model) {
        return _this.update(model.id);
      };
    })(this));
    this.$turnOnBtn.on("click", (function(_this) {
      return function() {
        _this.collection.allOn();
        return _this.updateAll();
      };
    })(this));
    return this.$turnOffBtn.on("click", (function(_this) {
      return function() {
        _this.collection.allOff();
        return _this.updateAll();
      };
    })(this));
  };

  CollectionView.prototype.update = function(index) {
    return this.modelViews[index].update();
  };

  CollectionView.prototype.updateAll = function() {
    return this.modelViews.forEach(function(modelView) {
      return modelView.update();
    });
  };

  return CollectionView;

})();



},{"./ModelView":6}],5:[function(require,module,exports){
var Model;

module.exports = Model = (function() {
  function Model(opt) {
    this.power = !!opt.power;
    this.color = opt.color || "yellow";
  }

  Model.prototype.turnOn = function() {
    return this.power = true;
  };

  Model.prototype.turnOff = function() {
    return this.power = false;
  };

  Model.prototype.toggle = function() {
    if (this.power) {
      return this.turnOff();
    } else {
      return this.turnOn();
    }
  };

  return Model;

})();



},{}],6:[function(require,module,exports){
var ModelView;

module.exports = ModelView = (function() {
  function ModelView(model, collectionView) {
    this.collectionView = collectionView;
    this.model = model;
    this.render();
    this._eventify();
  }

  ModelView.prototype.render = function() {
    var $el, color;
    $el = $("<div>");
    this.$btn = $("<button>").text("switch");
    color = this.model.power ? this.model.color : 'black';
    $el.css({
      backgroundColor: color,
      width: 100,
      height: 100
    });
    $el.append(this.$btn);
    this.el = $el;
    return this;
  };

  ModelView.prototype._eventify = function() {
    return this.$btn.on("click", (function(_this) {
      return function() {
        _this.model.toggle();
        return _this.collectionView.el.trigger("click:switch", _this.model);
      };
    })(this));
  };

  ModelView.prototype.update = function() {
    var color;
    color = this.model.power ? this.model.color : "black";
    this.el.css({
      backgroundColor: color
    });
    return this.el.find("button").toggleClass("on", this.model.power);
  };

  return ModelView;

})();



},{}]},{},[1]);
