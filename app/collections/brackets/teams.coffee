Collection = require 'models/base/collection'
Team = require 'models/brackets/team'

module.exports = class teams extends Collection
	model: Team

	parse:(models)=>
		updated = []
		for i, team of models
			if team.id is "5088cad2f767afae2e000005"
				team.id = "tid" + i
			t = @get team.id
			if t?
				t.set team
				updated.push t
			else
				newTeam = new Team()
				newTeam.set team
				updated.push newTeam
		updated
