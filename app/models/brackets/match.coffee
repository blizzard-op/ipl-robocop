Model = require 'models/base/model'
Event = require 'models/brackets/event'
MatchTeam = require 'models/brackets/match-team'

module.exports = class Match extends Model
	defaults: ()->
		parent: null
		children: []
		loserDropsTo: null
		hasLoserSlot: false
		event: new Event()
		transform2d:
			x:0
			y:0
			paddingX:0
			paddingY:0

	initialize: (options)->
		super options

	parse:(data)->
		data.event = @get('event').parse(data.event)
		data

	toJSON: =>
		attr = _.clone(@attributes)
		attr.id = "mid" + _.indexOf @collection.models, @

		attr.parent = if attr.parent? then _.indexOf @collection.models, attr.parent else null
		attr.children = for i in [0...attr.children.length]
			if attr.children[i]? then _.indexOf(@collection.models, attr.children[i]) else null
		if attr.loserDropsTo?
			attr.loserDropsTo.match = _.indexOf(@collection.models, attr.loserDropsTo.match)
		else
			attr.loserDropsTo = null

		@set 'id', attr.id
		attr

	advance: (team)=>
		parent = @get 'parent'
		if parent?
			parent.team(parent.whichSlot(@), new MatchTeam(team.attributes))
		loserMatch = @get 'loserDropsTo'
		if loserMatch?
			# console.log loserMatch.slot
			loser = if @teams()[0].get('name') is team.get('name') then @teams()[1] else @teams()[0]
			loserMatch.match.team(loserMatch.slot, new MatchTeam(loser.attributes))

	whichSlot: (childMatch)->
		unless _.contains(@get('children'), childMatch)
			return 0
		if @get 'hasLoserSlot'
			return 1
		_.indexOf(@get('children'), childMatch)

	isLoser: ()=>
		if @get('hasLoserSlot') then true else false

	# convenience getters

	teams: (teamSet)=>
		if teamSet?
			@get('event').get('matchup').set 'teams', teamSet
		@get('event').get('matchup').get('teams')

	team: (at, team=null)=>
		if team?
			@teams()[at] = team
			@matchup().trigger 'change:teams'
		@teams()[at]

	matchup: ()=>
		@get('event').get('matchup')

	event: ()=>
		@get 'event'

	games: ()=>
		@matchup().get 'games'