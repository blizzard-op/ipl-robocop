Model = require 'models/base/model'
Event = require 'models/brackets/event'

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
		attr.loserDropsTo = if attr.loserDropsTo? then _.indexOf(@collection.models, attr.loserDropsTo) else null
		@set 'id', attr.id
		attr

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
		@teams()[at]

	matchup: ()=>
		@get('event').get('matchup')

	event: ()=>
		@get 'event'