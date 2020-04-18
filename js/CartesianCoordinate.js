/**
 * CartesianCoordinate class to create Cartesian Coordinate Plane on a jQuery element.
 *
 * @constructor
 * @param {jQuery} elem The jQuery element to work on.
 *
 *//**
 * CartesianCoordinate class to create Cartesian Coordinate Plane on a jQuery element.
 *
 * @constructor
 * @param {jQuery} elem               The jQuery element to work on.
 * @param {(Object&!jQuery)} settings The default settings of the coordinate plane.
 *
 */
var CartesianCoordinate = function(arg1, arg2) {
  this.$elem = $('body');
  this.settings = {
    width        : null, /* natural width */
    height       : null, /* natural height */
    scaledWidth  : null, /* scaled width */
    scaledHeight : null, /* scaled height */
    grid_size    : 50, /*px*/
    origin       : '50%, 50%',
    inverse_top  : true,
    inverse_left : false,
    show_grid    : false,
    coordinates  : []
  };
  this.events = {};

  if (arguments.length === 0) {

  }
  // @constructor CartesianCoordinate(jQuery)
  if (arguments.length > 0
    && arg1 instanceof jQuery) {
    this.$elem = $(arg1);
  }
  // @constructor CartesianCoordinate(jQuery, Object)
  if (arguments.length > 1
    && Object.prototype.toString.call(arg2) === '[object Object]') {
      try {
        this.settings = $.extend(this.settings, arg2);
      } catch (e) {
      }
  }

  this.init();

  return this;
}

CartesianCoordinate.prototype.init = function(first_argument) {
  var $main = $('<div class="cartesian-coordinate" />');
  var $wrapper = $('<div class="cartesian-coordinate-wrapper" />');
  var $plane = $('<div class="cartesian-coordinate-plane" />');
  this.$elem.append($main.html($wrapper.html($plane)));

  this.$main = $main;
  this.$wrapper = $wrapper;
  this.$plane = $plane;
};

CartesianCoordinate.prototype.on = function(event_name, callback) {
  var self = this;
  function get_coordinates(event) {
    var grid_size = self.get_grid_size();
    return {
      x: Math.round( (event.clientX - self.$wrapper.offset().left) / grid_size * (self.settings.inverse_left ? -1 : 1) *100)/100,
      y: Math.round( (event.clientY - self.$wrapper.offset().top ) / grid_size * (self.settings.inverse_top  ? -1 : 1) *100)/100
    };
  }

  if (self.events[event_name] == undefined) {
    self.events[event_name] = [];
  }
  if (event_name == 'resize') {
    if (typeof callback == 'function') {
      var handler = function(event) {
          callback(event);
      };
      self.events[event_name].push(handler);
      $(window).on('resize', handler);
    }
    return self;
  }

  if (typeof callback == 'function') {
    var handler = function(event) {
      var coordinates = get_coordinates(event);
      callback(event, coordinates.x, coordinates.y);
    }
    self.events[event_name].push(handler);
    self.$main.on(event_name, handler);
  }
  return self;
};

CartesianCoordinate.prototype.off = function(event_name) {
  if (this.events[event_name] == undefined) return;

  if (event_name == 'resize') {
    for (var i = this.events[event_name].length; i >= 0 ; i--) {
      var handler = this.events[event_name][i];
      if (handler == undefined) continue;
      $(window).off('resize', null, handler);
    }
    this.events[event_name] = [];
    return this;
  }

  for (var i = this.events[event_name].length; i >= 0 ; i--) {
    var handler = this.events[event_name][i];
    if (handler == undefined) continue;
    this.$main.off(event_name, null, handler);
  }
  this.events[event_name] = [];
  return this;
};

CartesianCoordinate.prototype.get_grid_size = function() {
  var f = 0.0;
  return (f=parseFloat(this.settings.grid_size)) != 'NaN' ? f : 50;
};

CartesianCoordinate.prototype.show_grid = function() {
  this.settings.show_grid = true;
  var $grid_layer = this.$plane.find('.cc-layer[role="grid_layer"]');
  if ($grid_layer.length <= 0) {
    $grid_layer = $('<div class="cc-layer" role="grid_layer" />').css({'z-index':1});
    this.$plane.prepend($grid_layer);
  }

  var grid_size = this.get_grid_size();

  var $verticals = CartesianCoordinate.getVerticalLine().addClass('cc-gridline');
  var $horizontals = CartesianCoordinate.getHorizontalLine().addClass('cc-gridline');

  this.draw_object(['grid_layer', '0, 0', $verticals.clone().addClass('cc-gridline-main')]);
  this.draw_object(['grid_layer', '0, 0', $horizontals.clone().addClass('cc-gridline-main')]);
  for (var x = 1, w = grid_size; w < this.$plane.width(); x++, w+=grid_size) {
    this.draw_object(['grid_layer', x+', 0', $verticals.clone()]);
    this.draw_object(['grid_layer', (-x)+', 0', $verticals.clone()]);
  }
  for (var y = 1, h = grid_size; h < this.$plane.height(); y++, h+=grid_size) {
    this.draw_object(['grid_layer', '0, '+y, $horizontals.clone()]);
    this.draw_object(['grid_layer', '0, '+(-y), $horizontals.clone()]);
  }

  $grid_layer.show();
  return this;
};

CartesianCoordinate.prototype.hide_grid = function(first_argument) {
  this.settings.show_grid = false;
  var $grid_layer = this.$plane.find('.cc-layer[role="grid_layer"]');
  if ($grid_layer.length > 0) {
    $grid_layer.hide();
  }
  return this;
};

CartesianCoordinate.prototype.clear_grid = function(first_argument) {
  this.settings.show_grid = false;
  var $grid_layer = this.$plane.find('.cc-layer[role="grid_layer"]');
  if ($grid_layer.length > 0) {
    $grid_layer.empty();
  }
  return this;
};

CartesianCoordinate.prototype.set = function(settings) {
  this.settings = $.extend(this.settings, settings);
  return this;
};

CartesianCoordinate.prototype.add = function(layer, coordinates, object) {
  this.settings.coordinates.push([layer, coordinates, object]);
  if (this.settings.show_grid) {
    this.settings.coordinates.push(['grid_layer', coordinates, CartesianCoordinate.getDot()]);
  }
  return this;
};

CartesianCoordinate.prototype.add_and_draw = function(layer, coordinates, object) {
  var value = [layer, coordinates, object];
  this.settings.coordinates.push(value);
  this.draw_object(value);
  if (this.settings.show_grid) {
    value = ['grid_layer', coordinates, CartesianCoordinate.getDot()];
    this.settings.coordinates.push(value);
    this.draw_object(value);
  }
  return this;
};

CartesianCoordinate.prototype.add_layer = function(layer_name) {
  var $layer = this.$plane.find('.cc-layer[role="'+layer_name+'"]');
  if ($layer.length <= 0) {
    $layer = $('<div class="cc-layer" role="'+layer_name+'" />');
    this.$plane.append($layer);
  }
  return this;
};

CartesianCoordinate.prototype.clear = function() {
  this.settings.coordinates = [];
  this.$plane.empty();
  return this;
}

CartesianCoordinate.prototype.destroy = function() {
  this.clear();
  for (var event_name in this.events) {
    this.off(event_name);
  }
  return this;
}

CartesianCoordinate.prototype.draw = function() {
  /*
    Setting width and height

    if both scaledWidth and width is set, use scaledWidth;
    if only width is set, use width;
    else use default in css, i.e. 100%
    same logic for setting height
  */
  var width, height;
  if (this.settings.scaledWidth != null && this.settings.width != null) {
    width = this.settings.scaledWidth;
  } else if (this.settings.width != null) {
    width = this.settings.width;
  } else {
    width = null;
  }
  if (this.settings.scaledHeight != null && this.settings.height != null) {
    height = this.settings.scaledHeight;
  } else if (this.settings.height != null) {
    height = this.settings.height;
  } else {
    height = null;
  }
  this.$main.css({
    width: width != null ? width : '',
    height: height != null ? height : ''
  });

  /*
    Setting origin of the coordinate plane

    if both scaledWidth and width is set, use scaledWidth;
    if only width is set, use width;
    else use default in css, i.e. 100%
    same logic for setting height
  */
  var origin = this.settings.origin.split(',');
  var wrapper_left = 0, wrapper_top = 0;
  if (origin.length == 1) {
    wrapper_left = origin[0].trim();
    wrapper_top = origin[0].trim();
  } else if (origin.length == 2) {
    wrapper_left = origin[0].trim();
    wrapper_top = origin[1].trim();
  }
  this.$wrapper.css({top:wrapper_top,left:wrapper_left});


  if (this.settings.show_grid) {
    this.clear_grid();
    this.show_grid();
  } else {
    this.hide_grid();
  }
  for (var i = 0; i < this.settings.coordinates.length; i++) {
    this.draw_object(this.settings.coordinates[i]);
  }
  return this;
};

CartesianCoordinate.prototype.draw_object = function(value) {
  var self = this;
  var layer = value[0];
  var coordinates = value[1];
  var $object = $(value[2]);
  var layer_name = layer!='' ? layer : 'main';
  var $layer = self.$plane.find('.cc-layer[role="'+layer_name+'"]');
  if ($layer.length <= 0) {
    self.add_layer(layer_name);
    $layer = self.$plane.find('.cc-layer[role="'+layer_name+'"]');
  }

  if (!($layer[0].contains($object[0]))) {
    $layer.append($object);
  }

  function transformDOM($object, coordinates) {
    // convert coordinates into px
    var coor = coordinates.split(','), f = 0;
    var grid_size = self.get_grid_size();
    coor[0] = (f=parseFloat(coor[0])) != 'NaN' ? f * grid_size * (self.settings.inverse_left ? -1 : 1) : 0;
    coor[1] = (f=parseFloat(coor[1])) != 'NaN' ? f * grid_size * (self.settings.inverse_top ? -1 : 1) : 0;

    var offsetx = CartesianCoordinate.get_offsetx($object);
    var offsety = CartesianCoordinate.get_offsety($object);
    if (self.settings.show_grid) {
      $object.css({'outline':'1px dotted red'});
    } else {
      $object.css({'outline':''});
    }

    $object.css({
      'position'           : 'absolute',
      'top'                : coor[1]-offsety,
      'left'               : coor[0]-offsetx,
       // '-webkit-transform' : 'translate('+(coor[0]-offsetx)+'px, '+(coor[1]-offsety)+'px)',
       //    '-moz-transform' : 'translate('+(coor[0]-offsetx)+'px, '+(coor[1]-offsety)+'px)',
       //     '-ms-transform' : 'translate('+(coor[0]-offsetx)+'px, '+(coor[1]-offsety)+'px)',
       //      '-o-transform' : 'translate('+(coor[0]-offsetx)+'px, '+(coor[1]-offsety)+'px)',
       //         'transform' : 'translate('+(coor[0]-offsetx)+'px, '+(coor[1]-offsety)+'px)'
    });
  }

  function transform($object, coordinates) {
    // convert coordinates into px
    var coor = coordinates.split(','), f = 0;
    var grid_size = self.get_grid_size();
    coor[0] = (f=parseFloat(coor[0])) != 'NaN' ? f * grid_size * (self.settings.inverse_left ? -1 : 1) : 0;
    coor[1] = (f=parseFloat(coor[1])) != 'NaN' ? f * grid_size * (self.settings.inverse_top ? -1 : 1) : 0;

    $object.css({
       '-webkit-transform' : 'translate('+(coor[0])+'px, '+(coor[1])+'px)',
          '-moz-transform' : 'translate('+(coor[0])+'px, '+(coor[1])+'px)',
           '-ms-transform' : 'translate('+(coor[0])+'px, '+(coor[1])+'px)',
            '-o-transform' : 'translate('+(coor[0])+'px, '+(coor[1])+'px)',
               'transform' : 'translate('+(coor[0])+'px, '+(coor[1])+'px)'
    });
  }

  if ($object.hasClass('cc-image')) {
    // scale the image if needed
    var ratioW = 1.0, ratioH = 1.0;
    if (self.settings.scaledWidth != null && self.settings.width != null) {
      ratioW = self.settings.scaledWidth / self.settings.width;
    }
    if (self.settings.scaledHeight != null && self.settings.height != null) {
      ratioH = self.settings.scaledHeight / self.settings.height;
    }
    var $img = $object.find('>img');
    // TODO: wait image to load and get the naturalWidth and naturalHeight.
    if ($img.prop('naturalWidth') == 0 || $img.prop('naturalHeight') == 0) {
      $img.one('load', function() {
        $(this).css({width:$(this).prop('naturalWidth')*ratioW, height:$(this).prop('naturalHeight')*ratioH});
        transformDOM($object, coordinates);
      }).one('error', function() {
        console.log('Failed to load:' + $(this).attr('src'));
      });
    } else {
      $img.css({width:$img.prop('naturalWidth')*ratioW, height:$img.prop('naturalHeight')*ratioH});
      transformDOM($object, coordinates);
    }
  } else if ($object.hasClass('cc-text')) {
    var ratio = (self.settings.scaledWidth * self.settings.scaledHeight) / (self.settings.width * self.settings.height);
    // $object.css({'font-size':parseFloat(ratio)+'em'});
    transformDOM($object, coordinates);
  } else {
    transform($object, coordinates);
  }

  return self;
};

CartesianCoordinate.getDot = function() {
  return $('<div class="cc-dot" />');
};

CartesianCoordinate.getVerticalLine = function() {
  return $('<div class="cc-line vertical" />');
};

CartesianCoordinate.getHorizontalLine = function() {
  return $('<div class="cc-line horizontal" />');
};

// calculate offset
CartesianCoordinate.get_offsetx = function($object) {
  if (!($object instanceof jQuery)) return 0;
  if ($object.hasClass('left')) {
    return 0;
  } else if ($object.hasClass('right')) {
    return $object.width();
  } else if ($object.hasClass('center')) {
    return $object.width() / 2;
  } else {
    return $object.width() / 2;
  }
}

CartesianCoordinate.get_offsety = function($object) {
  if (!($object instanceof jQuery)) return 0;
  if ($object.hasClass('top')) {
    return 0;
  } else if ($object.hasClass('bottom')) {
    return $object.height();
  } else if ($object.hasClass('middle')) {
    return $object.height() / 2;
  } else {
    return $object.height() / 2;
  }
}

CartesianCoordinate.prototype.get_coordinates = function($object) {
  var self = this, grid_size = self.get_grid_size(), f = 0;
  var top = (f=parseFloat($object.css('top'))) != 'NaN' ? f : 0;
  var left = (f=parseFloat($object.css('left'))) != 'NaN' ? f : 0;
  var coorX = Math.round( (left + CartesianCoordinate.get_offsetx($object)) / grid_size * (self.settings.inverse_left ? -1 : 1) *100)/100;
  var coorY = Math.round( (top  + CartesianCoordinate.get_offsety($object)) / grid_size * (self.settings.inverse_top  ? -1 : 1) *100)/100;
  return coorX + ', ' + coorY;
}

CartesianCoordinate.prototype.update = function($object, layer, coordinates) {
  if (!($object instanceof jQuery)) return false;
  var self = this;
  var rowIdx = null;
  for (var i = 0; i < self.settings.coordinates.length; i++) {
    if (!is_array(self.settings.coordinates[i]) || self.settings.coordinates[i].length != 3) continue;
    if (!(self.settings.coordinates[i][2] instanceof jQuery)) continue;
    if (self.settings.coordinates[i][2][0] != $object[0]) continue;
    rowIdx = i;
  }
  if (rowIdx == null) return false;
  if (layer != undefined && layer != null) {
    self.settings.coordinates[rowIdx][0] = layer;
  }
  if (coordinates != undefined && coordinates != null) {
    self.settings.coordinates[rowIdx][1] = coordinates;
  }
  return true;
}