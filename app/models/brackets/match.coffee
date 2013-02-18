Model = require 'models/base/model'
Event = require 'models/brackets/event'
MatchTeam = require 'models/brackets/match-team'
Viper = require 'utility/viper'

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
		teamOrder: []

	initialize: (options)->
		super options

	parse:(data)->
		@get('event').parse(data.event)
		@set _.omit data, "event"
		{}

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
		touched = []
		if parent?
			parent.team(parent.whichSlot(@), new MatchTeam(team.attributes))
			parent.event().autoTitle()
			touched.push parent
		loserMatch = @get 'loserDropsTo'
		if loserMatch?
			loser = if @teams()[0].get('name') is team.get('name') then @teams()[1] else @teams()[0]
			loserMatch.match.team(loserMatch.slot, new MatchTeam(loser.attributes))
			loserMatch.match.event().autoTitle()
			touched.push loserMatch
		touched

	whichSlot: (childMatch)->
		unless _.contains(@get('children'), childMatch)
			return 0
		if @get('hasLoserSlot') or @get('children').length is 1
			return 1
		_.indexOf(@get('children'), childMatch)

	isLoser: ()=>
		if @get('hasLoserSlot') then true else false

	noTBDs: ()=>
		hasTBD = _.find @teams(), (team)=> team.get('name') is 'TBD' or team.get('name').match(/(\d) TBD/)?
		return !hasTBD?

	started: ()=>
		firstStart = @games().find (game)-> game.get('starts_at')?
		return firstStart?

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