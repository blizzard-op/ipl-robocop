View = require 'views/base/view'
template = require 'views/templates/brackets/match'

module.exports = class MatchView extends View
	template: template
	autoRender:true
	className: 'match'

	initialize:->
		super
		@model.on 'change:transform2d', @updatePosition
		@listenTo @model.matchup(), 'change:teams', ()=>
			@changeTeams()
		@changeTeams()

	render:->
		super
		teamsObs = for a in @model.teams()
			team = {}
			team.name = if a? and a.get('name') isnt 'TBD'  then a.get 'name' else ''
			team.points = if a? and a.get('name') isnt 'TBD' then a.get 'points' else ''
			team
		matchTime = @formatTime()
		@$el.html @template({teams: teamsObs, time: matchTime})
		@updatePosition()
		@

	formatTime: ()=>
		moment(@model.event().get 'starts_at', "MM/DD/YYYY hh:mm a").format("MM.DD hh:mmA")

	changeTeams:()=>
		@stopListening()
		@listenTo @model.event(), 'change:starts_at', ()=>
			@render()
		@listenTo @model.get('event').get('matchup'), 'change:teams', ()=>
			@changeTeams()
		for team in @model.teams() when team?
			@listenTo team, 'change', ()=>
				@render()
		@render()

	updatePosition:=>
		t2d = @model.get('transform2d')
		@$el.css
			top: t2d.y + t2d.paddingY
			left: t2d.x + t2d.paddingX