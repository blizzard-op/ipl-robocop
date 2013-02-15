Model = require 'models/base/model'
RoundsFromMatchList = require 'utility/brackets/rounds-from-match-list'
RootFinder = require 'utility/brackets/root-finder'
mediator = require 'mediator'
MatchTeam = require 'models/brackets/match-team'

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
		@listenTo @get('bracket'), 'sync', ()-> @updateSeedMatches()
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

	replaceTeam:(oldTeam, newTeam)=>
		matches = @get('bracket').get('matches')
		replaced = false
		for m in matches.models
			needReplace = _.find m.teams(), (team)-> team.get('name') is oldTeam.name
			if needReplace?
				needReplace.set _.omit newTeam, "points"
				replaced = true
		if replaced
			return
		seedMatches = @get 'seedMatches'
		for m in seedMatches when m?
			needReplace = _.find m.match.teams(), (team)-> team.get('seed') is oldTeam.seed
			if needReplace?
				needReplace.set _.omit newTeam, "points"

	updateTeams:()=>
		if @get 'enabled'
			teams = @get('bracket').get('teams')
			seedMatches = @get 'seedMatches'
			for i, team of teams.models
				teams = _.clone(seedMatches[parseInt(i)+1].match.teams())
				teams[seedMatches[parseInt(i)+1].slot] = team
				matchTeam = new MatchTeam( team.attributes )
				seedMatches[parseInt(i)+1].match.team(seedMatches[parseInt(i)+1].slot, matchTeam)
				seedMatches[parseInt(i)+1].match.event().autoTitle()

	retitleSeeds:()=>
		seedMatches = @get 'seedMatches'
		for container in seedMatches when container?
			container.match.event().autoTitle()
