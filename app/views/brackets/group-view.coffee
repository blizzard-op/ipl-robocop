View = require 'views/base/view'
template = require 'views/templates/brackets/group-stage'

module.exports = class GroupView extends View
	template: template
	autoRender: true
	className: 'group'
	initialize: ->
		super
		@model.on 'change:transform2d', @updatePosition
		@listenTo @model.get('teams'), 'add remove', @render
		@listenTo @model.get('matches'), 'add remove', @render
	updatePosition: =>
		t2d = @model.get('transform2d')
		@$el.css
			top: t2d.y + t2d.paddingY
			left: t2d.x + t2d.paddingX

	render:->
		super
		group = {}
		group.title = @model.get 'title'
		group.matches = for i, match of @model.get('matches').models
			parseInt(i) + 1
		group.teams = @model.get('teams').map (team)-> team.get 'name'
		@$el.html @template(group)
		matches = @model.get 'matches'
		for i, match of matches.models
			@.$('.match').eq(i).data 'match', match
		@