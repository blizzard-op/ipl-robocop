Model = require 'models/base/model'
RoundsFromMatchList = require 'utility/brackets/rounds-from-match-list'
RootFinder = require 'utility/brackets/root-finder'
mediator = require 'mediator'

module.exports = class TeamAutoSeeder extends Model
	defaults:
		bracket: null
		seedMatches: null
		enabled: true
	initialize:(options)->
		super
		@set 'bracket', options.bracket
		@get('bracket').get('teams').comparator = (team)-> team.get 'seed'
		@listenTo @get('bracket').get('matches'), 'reset', ()-> @updateSeedMatches()
		@listenTo @get('bracket').get('teams'), 'sort', ()-> @updateTeams()
		@listenTo @get('bracket').get('teams'), 'reset', ()-> @updateTeams()
		mediator.subscribe 'groupAdded', ()-> true

	updateSeedMatches:()=>
		matches = @get('bracket').get('matches')
		root = RootFinder.find(matches.models)
		seedMatches = @seedDive(root)
		@set 'seedMatches', seedMatches

	seedDive:(root, seedMatches=[])=>
		teams = root.teams()
		for i, team of teams
			seedMatches[team.get 'seed'] =
				match: root
				slot: i
		for child in root.get('children') when not child.isLoser()
			@seedDive(child, seedMatches)
		seedMatches

	updateTeams:()=>
		if @get 'enabled'
			teams = @get('bracket').get('teams')
			seedMatches = @get 'seedMatches'
			for i, team of teams.models
				teams = _.clone(seedMatches[parseInt(i)+1].match.teams())
				teams[seedMatches[parseInt(i)+1].slot] = team
				seedMatches[parseInt(i)+1].match.matchup().set 'teams', teams
				seedMatches[parseInt(i)+1].match.event().autoTitle()

	retitleSeeds:()=>
		seedMatches = @get 'seedMatches'
		for container in seedMatches when container?
			container.match.event().autoTitle()
