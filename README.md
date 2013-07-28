rx-js-gestures
===============

Unifying mouse and touch event gestures written in RxJS. Uses touch events if your device supports touch events, otherwise falls back to mouse events.  

Unifies gesture names under a common API. For example, "touchstart" and "mousedown" map to "downAsObservable".  

jQuery plugins:
```javascript
// These decide what to listen for based on device support:
// An Observable that dispatches normalized `mousedown` or `touchstart` events.
$.fn.downAsObservable  = function(){}
// An Observable that dispatches normalized `mousemove` or `touchmove` events.
$.fn.moveAsObservable  = function(){}
// An Observable that dispatches normalized `mouseup` or `touchend` events.
$.fn.endAsObservable   = function(){}
// An Observable that dispatches normalized `mousedown` or `touchstart` events after an activation time
// and assuming the pointer device didn't move outside the radius defined by `distance` ({x: num, y: num })
// during activation time. Distance defaults to {x: 10, y: 10}.
$.fn.pressAsObservable = function(activation_time, distance){}
// An Observable that dispatches normalized `mousedown` or `touchdown` events that have corresponding
// `mouseup` or `touchend` events dispatched before the timeout_time and assuming the corresponding `end`
// event occurred within the radius defined by `distance` ({x: num, y: num}).
// Distance defaults to {x: 10, y: 10}.
$.fn.tapAsObservable   = function(timeout_time, distance){}
// An Observable that dispatches normalized `mousemove` or `touchmove` events after a press event
// with an optional activation_time and distance.
// Completes when the pointer is released.
$.fn.dragAsObservable  = function(activation_time, distance){}
// An Observable that dispatches the last normalized `mousemove` or `touchmove` event of a registered
// drag target dropped on him.
$.fn.dropAsObservable  = function(){}
```

Additions to the Rx.Observable prototype:
```javascript
// Publishes the drag Observable, listening for when it completes.
// On completion, checks the list of drop targets to see if the
// item was dropped on one of them.
rx.registerDrag  = function(target, type, data){}
// Moves the target following the dispatched drag events.
rx.doDragActions = function(target, classnames){}

```
