var Rx = require('rx');
var $ = require('jquery');
var _ = require('underscore');

var jq = $.fn;
var rx = Rx.Observable.prototype;

var is_supported     = require('./events/is_supported');
var normalize_mouse  = require('./events/normalize_mouse_event');
var normalize_touch  = require('./events/normalize_touch_event');
var cancel_event     = require('./events/cancel_event');
var scan_deltas      = require('./events/scan_deltas');

// jQuery plugins to get global coordinates adjusted for margins.
jq.gx                = require('./jquery/jquery.gx');
jq.gy                = require('./jquery/jquery.gy');
jq.grect             = require('./jquery/jquery.grect');

// jQuery plugins for gestures as Observables
jq.downAsObservable  = require('./jquery/jquery.down');
jq.moveAsObservable  = require('./jquery/jquery.move');
jq.endAsObservable   = require('./jquery/jquery.end');
jq.pressAsObservable = require('./jquery/jquery.press');
jq.tapAsObservable   = require('./jquery/jquery.tap');
jq.dragAsObservable  = require('./jquery/jquery.drag');
jq.dropAsObservable  = require('./jquery/jquery.drop');

// Rx extensions to register drag and drop
// targets from Observable gesture sequences.
rx.registerDrag	     = require('./rx/rx.register_drag');
rx.dragTarget	     = require('./rx/rx.drag_target');
rx.dragClone	     = require('./rx/rx.drag_clone');

module.exports       = Rx;