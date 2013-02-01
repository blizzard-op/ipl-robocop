Model = require 'models/base/model'
GroupStage = require 'models/brackets/group-stage'
Teams = require 'collections/brackets/teams'
Matches = require 'collections/brackets/matches'

module.exports = class GroupGenerator extends Model
	newGroup: (options)->
		teamsCol = new Teams()
		matchCol = new Matches()
		if options.numTeams?
			for i in [0...parseInt(options.numTeams)]
				teamsCol.add
					name: "Team X" + (i + 1)
					seed: i + 1
		if options.numMatches?
			for i in [0...parseInt(options.numMatches)]
				matchCol.add
					bestOf: 1
		options.teams = teamsCol
		options.matches = matchCol
		new GroupStage(_.omit options, "numTeams", "numMatches")