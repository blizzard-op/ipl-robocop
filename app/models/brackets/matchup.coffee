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
		@updateGamesCount()
		@on 'change:best_of', ()=> @updateGamesCount()

	parse: (data)->
		nTeams = for i, team of data.teams
			matchTeams = @get 'teams'
			if matchTeams[i]?
				matchTeams[i].set team
			else
				matchTeams[i] = new MatchTeam(team)
		data.games = @get('games').update(data.games, {parse:true})
		@

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
				return team
			else
				return null

