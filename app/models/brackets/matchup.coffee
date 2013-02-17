Model = require 'models/base/model'
Game = require 'models/brackets/game'
Games = require 'collections/brackets/games'
MatchTeam = require 'models/brackets/match-team'

module.exports = class Matchup extends Model
	defaults: ()->
		teams: []
		games: new Games()
		best_of: 3

	initialize:(options)->
		super options
		@urlRoot = ()-> "http://esports.ign.com/content/v2/matchups"
		@updateGamesCount()
		@on 'change:best_of', ()=> @updateGamesCount()

	parse: (data)->
		if data.success? and Boolean(data.success) is true
			return {}
		if data.teams?
			if @get('teams').length > 1 and @get('teams')[0].id?
				fti = @get('teams')[0].id
				unless fti is data.teams[0].id
					data.teams = data.teams.reverse()

			if data.teams.length < 2
				data.teams.push {name:"TBD", points:0}

		nTeams = for i, team of data.teams
			matchTeams = @get 'teams'
			if matchTeams[i]?
				# if team.name is "TBD"
				# 	team.name = matchTeams[i].get('seed') + " TBD"
				matchTeams[i].set team
			else
				matchTeams[i] = new MatchTeam(team)
				matchTeams[i].set 'points', team.points
		@get('games').update(data.games, {parse:true})
		@set _.omit data, "teams", "games"
		{}

	updateGamesCount: ()=>
		bestOf = @get 'best_of'
		games = for i in [0...bestOf]
			new Game
				number: i+1
		@get('games').reset(games)

	pointFor: (teamName)=>
		for team in @get 'teams' when team.get('name') is teamName
			team.set 'points', team.get('points') + 1
			if team.get('points') > @get('best_of') / 2
				return {winner:team, matchDecided:true}
			else
				return {winner:team, matchDecided:false}

	reset: =>
		@get('games').each (game)->
			game.unset 'winner'
			game.set 'status', 'ready'
		_.each @get('teams'), (team)-> team.set 'points', 0