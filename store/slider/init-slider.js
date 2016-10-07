function initSlider(param){
	var $ = jQuery,
		cssTransitionEnabled = !($.browser.msie && Math.floor($.browser.version) <= 9);

	var slider = $(document.createElement('p'));
	$(param.contents).each(function(){
		slider.append((this.link ?
				$(document.createElement('a')).attr({href: this.link}) :
				$(document.createElement('span')))
			.append($(document.createElement('img')).attr({src: this.image})));
	});
	slider = slider.simpleSlider({
		controller: false,
		random: !! param.random,
		setItemActivity: function(activity, element, event){
			if(event === 'init') return;
			if(activity) slider[cssTransitionEnabled ? 'css' : 'animate']({left: 0 - $(element).position().left +'px'});
		}
	});
	$(param.target).empty().append(slider);
	if(param.contents.length > 1)
		$(param.target)
			.append($(document.createElement('em'))
				.addClass('prev')
				.click(slider.previous))
			.append($(document.createElement('em'))
				.addClass('next')
				.click(slider.next));
	slider.start(param.interval);
};
