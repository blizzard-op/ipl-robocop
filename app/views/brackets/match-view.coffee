View = require 'views/base/view'
template = require 'views/templates/brackets/match'

module.exports = class MatchView extends View
	template: template
	autoRender:true
	className: 'match'

	initialize:->
		super
		@model.on 'change:transform2d', @updatePosition
		@listenTo @model.get('event').get('matchup'), 'change:teams', ()=>
			@changeTeams()

	render:->
		super
		teamNames = for a in @model.teams()
			if a? then a.get 'name' else ''
		@$el.html @template({teams: teamNames})
		@updatePosition()
		@

	changeTeams:()=>
		@stopListening()
		@listenTo @model.get('event').get('matchup'), 'change:teams', ()=>
			@changeTeams()
		for team in @model.teams()
			@listenTo team, 'change', ()=>
				@render()
		@render()

	updatePosition:=>
		t2d = @model.get('transform2d')
		@$el.css
			top: t2d.y + t2d.paddingY
			left: t2d.x + t2d.paddingX