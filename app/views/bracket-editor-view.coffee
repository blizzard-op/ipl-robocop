View = require 'views/base/view'
Collection = require 'models/base/collection'
BracketView = require 'views/brackets/bracket-view'
# Matches = require 'collections/brackets/matches'
mediator = require 'mediator'

module.exports = class BracketEditorView extends BracketView
	initialize:(options)->
		super(options)
		@model.url = ()->"http://test.ign.com:2121/brackets/v6/api/"
		mediator.subscribe 'save-bracket', @saveBracket
		@delegate 'click', '.match', (ev)->@clickMatch(ev)
		@delegate 'click', '.hotzone', ()-> @deselect()
		@delegate 'click', '.bracket-title', (ev)->@editTitle(ev)
		@delegate 'blur', '.bracket-title-input', (ev)->@saveTitle(ev)
		@selected = []

	render: ->
		super
		$('<div class="hotzone">').appendTo(@$el).width(@$el.width()).height(@$el.height())
		$('<input type="text" class="bracket-title-input">').appendTo(@.$('.label-layer span.bracket-title'))
		@

	saveBracket: ()=>
		@model.save()

	clickMatch: (ev)->
		unless ev.shiftKey is true
			@deselect()
		$(ev.currentTarget).addClass 'activeSelect'
		@selected.push $(ev.currentTarget).data('match')
		mediator.publish 'change:selected', @selected

	deselect: ()=>
		$('.match.activeSelect').removeClass 'activeSelect'
		@selected = []

		# Backbone.sync "create", @model,
		# 	jsonpCallback: "jsonp"
		# 	success: (data)-> console.log data
		# 	error: (er, xr)-> console.log er, xr, "problem"
	editTitle: (ev)=>
		$(ev.currentTarget).addClass 'editing'
		$(ev.currentTarget).find('input').focus().val @model.get('title')

	saveTitle:(ev)=>
		$(ev.currentTarget).parent('span').removeClass 'editing'
		newTitle = String($(ev.currentTarget).val().trim())
		@model.set 'title', newTitle
		@model.set 'slug', newTitle.toLowerCase().replace(/\ /g, '-')
		@.$('.bracket-title h1').text newTitle
		mediator.publish 'save-bracket'

