/*--------------------------------------------------------------------
  jQuery SimpleSlider
                                           version 1.0.2 (7 Dec 2012)
                                                       Kazuhisa Togo
----------------------------------------------------------------------
  <!> Requirements
    + jQuery
----------------------------------------------------------------------
  Copyright (c) 2012 Kazuhisa Togo

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use, copy,
  modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.
--------------------------------------------------------------------*/

(function($){
	$.fn.simpleSlider = function(param){
		var stage = this;
		if(! param) param = {};
		param = $.extend({
			prepare              : null,
			ready                : null,
			items                : null,
			itemsIgnore          : null,
			setItemActivity      : null,
			controller           : null,
			setControllerActivity: null,
			selected             : null,
			random               : false,
			defaultId            : 0,
			defaultInterval      : 3,
			ativeControllerClass : 'active',
			ativeItemClass       : 'active',
			observedEvents       : ['click', 'keypress']
		}, param);
		if(param.prepare)
			param.prepare.call(stage);
		stage.items = [];
		var currentID = parseInt(param.defaultId);
		var onInterval = false;
		var itemsIgnore = $(param.itemsIgnore).get();

		var controllerBuilder;
		if(typeof param.controller === 'function'){
			controllerBuilder = function(){
				return param.controller.apply(stage, arguments)
			};
		} else {
			controllerBuilder = (function(){
				if(param.controller === false)
					return function(){ return null; };
				var container;
				if(param.controller){
					container = $(param.controller)[0];
				} else {
					container = document.createElement('ul');
					stage.append(container);
					itemsIgnore.push(container);
				}
				return function(id, e){
					var controller = document.createElement('li');
					$(container).append(controller);
					$(controller).append(document.createTextNode(id));
					return controller;
				}
			})();
		}

		var setControllerActivity;
		if(typeof param.setControllerActivity === 'function'){
			setControllerActivity = param.setControllerActivity;
		} else {
			setControllerActivity = (function(){
				var ativeControllerClass = param.ativeControllerClass;
				if(ativeControllerClass == '') return function(){};
				return function(activity, element, event){
					$(element)[activity ? 'addClass' : 'removeClass'](ativeControllerClass);
				}
			})();
		}

		var setItemActivity;
		if(typeof param.setItemActivity === 'function'){
			setItemActivity = param.setItemActivity;
		} else {
			setItemActivity = (function(){
				var ativeItemClass = param.ativeItemClass;
				if(ativeItemClass == '') return function(){};
				return function(activity, element, event){
					$(element)[activity ? 'addClass' : 'removeClass'](ativeItemClass);
				}
			})();
		}

		var setSelector = (function(){
			var observedEvents = param.observedEvents;
			if(typeof observedEvents === 'string') observedEvents = [observedEvents];
			var lastStatus = [];
			return function(id, item){
				item.select = function(){
					if(! onInterval) stage.resetInterval();
					$(stage.items).each(function(i, e){
						activity = (i === id);
						if(lastStatus[i] === activity) return;
						lastStatus[i] = activity;
						e.setActivity.call(e, activity, e, (onInterval ? 'interval' : 'manual'));
						if(e.controller !== null)
							e.controller.setActivity.call(e.controller, activity, e.controller, (onInterval ? 'interval' : 'manual'));
					});
					if(param.selected)
						param.selected.call(stage, onInterval);
				};
				if(item.controller !== null){
					$(observedEvents).each(function(a, eventName){
						$(item.controller).bind(eventName, function(){
							item.select(true);
						});
					});
				}
			};
		})();
		stage.add = function(e){
			$(e).each(function(i, e){
				var id = stage.items.length;
				e.setActivity = setItemActivity;
				e.setActivity.call(e, e, id === currentID, 'init');
				if((e.controller = controllerBuilder(id, e)) !== null){
					e.controller.setActivity = setControllerActivity;
					e.controller.setActivity.call(e.controller, activity, e.controller, 'init');
				}
				setSelector(id, e);
				stage.items.push(e);
				return stage;
			});
		};

		stage.select = function(id){
			if(! stage.items.length) return;
			stage.items[id].select();
			return stage;
		};
		stage.next = function(){
			currentID++;
			if(currentID >= stage.items.length)
				currentID = 0;
			stage.select(currentID);
			return stage;
		};
		stage.previous = function(){
			currentID--;
			if(currentID < 0)
				currentID = stage.items.length-1;
			stage.select(currentID);
			return stage;
		};
		stage.first = function(){
			currentID = 0;
			stage.select(currentID);
			return stage;
		};
		stage.last = function(){
			currentID = stage.items.length-1;
			stage.select(currentID);
			return stage;
		};
		stage.random = function(){
			if(stage.items.length < 2) return stage;
			if(stage.items.length < 3) return stage.next();
			var rand;
			while(currentID === (rand = Math.floor(Math.random() * stage.items.length)));
			stage.select(currentID = rand);
			return stage;
		};

		(function(){
			var slideTimer = null;
			var slideInterval;
			var intervalCall = function(){
				onInterval = true;
				stage[param.random ? 'random' : 'next']();
				onInterval = false;
			};
			stage.stop = function(){
				clearInterval(slideTimer);
				slideTimer = null;
				return stage;
			};
			stage.start = function(interval){
				if(! (interval = interval || param.defaultInterval)) return stage.stop();
				slideInterval = interval;
				if(slideTimer !== null) stage.stop();
				slideTimer = setInterval(intervalCall, interval*1000);
				return stage;
			};
			stage.resetInterval = function(){
				if(slideInterval)
					stage.start(slideInterval);
			};
		})();

		(function(){
			var items = [];
			if(typeof param.items === 'function'){
				items = param.items.call(stage);
			} else if(param.items){
				items = $(param.items);
			} else if(param.items !== false){
				items = $((stage[0] || stage).childNodes);
			}
			items.each(function(i, e){
				if($.inArray(e, itemsIgnore) >= 0) return;
				stage.add(e);
			});
			if(param.random && items.length)
				currentID = Math.floor(Math.random() * items.length);
		})();

		if(param.ready)
			param.ready.call(stage);

		return stage;
	};
})(jQuery);
