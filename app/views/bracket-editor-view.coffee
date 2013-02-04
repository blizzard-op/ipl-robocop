View = require 'views/base/view'
Collection = require 'models/base/collection'
BracketView = require 'views/brackets/bracket-view'
# Matches = require 'collections/brackets/matches'
mediator = require 'mediator'

module.exports = class BracketEditorView extends BracketView
	initialize:(options)->
		super(options)
		@delegate 'click', '.match', (ev)->@clickMatch(ev)
		@delegate 'click', '.hotzone', ()-> @deselect()
		@selected = []
	render: ->
		super
		$('<div class="hotzone">').appendTo(@$el).width(@$el.width()).height(@$el.height())
		@
	clickMatch: (ev)->
		unless ev.shiftKey is true
			@deselect()
		$(ev.currentTarget).addClass 'activeSelect'
		@selected.push $(ev.currentTarget).data('match')
		mediator.publish 'change:selected', @selected


	deselect: ()=>
		$('.match.activeSelect').removeClass 'activeSelect'
		@selected = []
		@model.url = ()->"http://test.ign.com:2121/brackets/v6/api/"
		@model.save()

		# Backbone.sync "create", @model,
		# 	jsonpCallback: "jsonp"
		# 	success: (data)-> console.log data
		# 	error: (er, xr)-> console.log er, xr, "problem"