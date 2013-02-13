View = require 'views/base/view'
template = require 'views/templates/brackets/bracket'
MatchView = require 'views/brackets/match-view'
GroupView = require 'views/brackets/group-view'
RootFinder = require 'utility/brackets/root-finder'
Rounds = require 'utility/brackets/rounds-from-match-list'
Formatter = require 'utility/brackets/tree-view-formatter'
Padding = require 'utility/brackets/bracket-padding'
Connector = require 'utility/brackets/match-connector'

module.exports = class BracketView extends View
	template: template
	container: '#bracket-container'
	id: 'bracket-layer'
	autoRender: true
	initialize: (options, padding={top: 200, right: 400, bottom: 200, left: 100})->
		super(options)
		@listenTo @model.get('matches'), 'reset', ()=>
			@renderCount = 0
			@render()
		@listenTo @model.get('groups'), 'add', ()=>
			@render()
		Padding.match.width = 180
		Padding.match.height = 60
		@padding = padding
		@renderCount = 0

	render: ->
		super
		matches = @model.get 'matches'
		groups = @model.get 'groups'
		seed = RootFinder.find(matches.models)

		matchViews = []
		unless seed?
			return @
		if @renderCount < 1
			Formatter.format(seed, Padding.match.width, Padding.match.height)
			Padding.setBracket @model, @$el
			Padding.setPadding(@padding)
		for match in matches.models
			mv = new MatchView({model:match})
			mv.$el.data 'match', mv.model
			mv.$el.appendTo @$el.find('.match-layer')
			matchViews.push mv
		for group in groups.models
			gv = new GroupView(model:group)
			gv.$el.data 'group', gv.model
			gv.$el.appendTo @$el.find('.match-layer')
		Padding.updateBounds()
		# place title
		@.$('span.bracket-title h1').text(@model.get 'title')
		@.$('span.bracket-title').css
			position: 'absolute'
			top: Padding.padding.top - 70
			left: Padding.padding.left
		#connect everything
		for match in matches.models
			if match.get('children').length > 0
				Connector.connect(match, matchViews).appendTo @$el.find('.line-layer')
		++@renderCount
	@