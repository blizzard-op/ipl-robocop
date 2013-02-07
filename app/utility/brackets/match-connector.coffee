module.exports = class MatchConnector
	@connect:(root, matchViews)->
		rootView = @findView root, matchViews
		$el = $('<div class="match-connector"></div>')
		y = x = Math.min Infinity
		h = 0
		for child in root.get 'children'
			childView = @findView child, matchViews

			if childView?
				y = Math.min childView.$el.position().top, y
				x = Math.min childView.$el.position().left + childView.$el.outerWidth(), x
				h = Math.max childView.$el.position().top, h
			true
		if h - y > 0
			$el.css
				top: y + rootView.$el.outerHeight() / 2
				left: x
				width: rootView.$el.position().left - x
				height: h - y
			$('<div class="top-bracket">').appendTo $el
			$('<div class="top-line">').appendTo $el
			$('<div class="bottom-bracket">').appendTo $el
			$('<div class="bottom-line">').appendTo $el
		else
			$el.css
				top: rootView.$el.position().top
				left: x
				width: rootView.$el.position().left - x
				height: rootView.$el.outerHeight()
			$('<div class="top-line full-width">').appendTo $el
			$('<div class="bottom-line full-width">').appendTo $el

		$el
	@findView: (root, matchViews)->
		_.find matchViews, (mV)-> if mV.model is root then true else false