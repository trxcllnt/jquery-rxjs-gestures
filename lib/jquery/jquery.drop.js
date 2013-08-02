var Rx = require('rx');
var _ = require('lodash');
var $ = require('jquery');
var drops = require('../rx/drop_targets');

module.exports = function() {
	
	var target = $(this);
	var subj = new Rx.Subject();
	
	drops.push([target, subj]);
	
	return subj.asObservable();
}