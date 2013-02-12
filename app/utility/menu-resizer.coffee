module.exports = class MenuResizer
	@auto: ($el)->
		if $el.outerHeight() > $(window).outerHeight()-100
			$el.height($(window).outerHeight()-100)
			$el.css
				overflow: "scroll"
		else
			$el.css
				overflow: "visible"
				height: "auto"