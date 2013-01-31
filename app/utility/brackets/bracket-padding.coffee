module.exports = class BracketPadding
	@padding = 
		top: 100
		right: 100
		bottom: 100
		left: 100
	@match = 
		width: 180
		height: 44

	@matches = null
	@groups = null

	@setBracket: (bracket, @$view)->
		@matches = bracket.get 'matches'
		@groups = bracket.get 'groups'
		@

	@addPadding: (options)->
		unless @matches?
			return false
		for k, v of options when @padding[k]?
			@padding[k] += parseInt(v)
		@updateBounds()
		@

	@setPadding: (options)->
		unless @matches?
			return false
		for k, v of options when @padding[k]?
			@padding[k] = parseInt(v)
		@updateBounds()
		@

	@moveMatches: (x, y=0)->
		unless @matches?
			return false
		@matches.each (match)=>
			t2d = _.clone match.get('transform2d')
			t2d.x += x
			t2d.y += y
			match.set 'transform2d', t2d
		@updateBounds()
		@

	@updateBounds: ()->
		@groups.each (group)=>
			t2d = _.clone group.get('transform2d')
			t2d.paddingX = @padding.left
			t2d.paddingY = @padding.top
			group.set 'transform2d', t2d
		@matches.each (match)=>
			t2d = _.clone match.get('transform2d')
			t2d.paddingX = @padding.left
			t2d.paddingY = @padding.top
			match.set 'transform2d', t2d
		maxX = maxY= 0
		maxX = match.get('transform2d').x + match.get('transform2d').paddingX for match in @matches.models when match.get('transform2d').x + match.get('transform2d').paddingX > maxX
		maxY = match.get('transform2d').y + match.get('transform2d').paddingY for match in @matches.models when match.get('transform2d').y + match.get('transform2d').paddingY > maxY
		@$view.css
			width: maxX + @padding.right + @match.width
			height: maxY + @padding.bottom