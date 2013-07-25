var Rx = require('rx');
var $ = require('jquery');
var _ = require('underscore');

var jq = $.fn;
var rx = Rx.Observable.prototype;

// jQuery plugins to get global coordinates adjusted for margins.
jq.gx                = require('./jquery/jquery.gx');
jq.gy                = require('./jquery/jquery.gy');
jq.grect             = require('./jquery/jquery.grect');

// Include the jQuery plugin for hardware-accelerated CSS transforms
                       require('./jquery/jquery.animate-enhanced')

// jQuery plugins for gestures as Observables
jq.endAsObservable   = require('./jquery/jquery.end');
jq.moveAsObservable  = require('./jquery/jquery.move');
jq.downAsObservable  = require('./jquery/jquery.down');
jq.pressAsObservable = require('./jquery/jquery.press');
jq.tapAsObservable   = require('./jquery/jquery.tap');
jq.dragAsObservable  = require('./jquery/jquery.drag');
jq.dropAsObservable  = require('./jquery/jquery.drop');

// Rx extensions to register drag and drop
// targets from Observable gesture sequences.
rx.registerDrag      = require('./rx/rx.register_drag');
rx.doDragActions     = require('./rx/rx.drag_actions');

var end_somewhere    = require('./events/end_somewhere');
var move_somewhere   = require('./events/move_somewhere');
var is_supported     = require('./events/is_supported');
var normalize_mouse  = require('./events/normalize_mouse_event');
var normalize_touch  = require('./events/normalize_touch_event');
var cancel_event     = require('./events/cancel_event');
var scan_deltas      = require('./events/scan_deltas');

module.exports       = Rx;