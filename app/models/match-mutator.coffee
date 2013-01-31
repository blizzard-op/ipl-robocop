Match = require 'models/brackets/match'

module.exports = class MatchMutator extends Match
	initialize:->
		super
		@on 'change', @showChanges
		@selected = []
		# attributes to ignore
		@ignore = ["transform2d","parent","children"]
	showChanges: ()->
		for m in @selected
			for key, v of _.omit(@changed, @ignore)
				m.set key, _.clone(@get(key))

	newAttrs: ()->
		@stopListening()
		@listenTo @get('event'), 'change', @eventChange
		@listenTo @matchup(), 'change', @matchupChange

	matchupChange:()->
		for m in _.tail(@selected)
			for key, v of _.omit(@matchup().changed, @ignore)
				m.matchup().set key, _.clone(@matchup().get(key))

	eventChange:()->
		for m in _.tail(@selected)
			for key, v of _.omit(@get('event').changed, @ignore)
				m.get('event').set key, _.clone(@get('event').get(key))