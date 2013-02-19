TeamMenuView = require 'views/tool-menus/team-menu-view'
Bracket = require 'models/brackets/bracket'
SingleElimWizard = require 'models/single-elim-wizard'

describe 'TeamMenuView', ->
	before ->
		@sew = new SingleElimWizard({numPlayers: 4})
		@bracket = new Bracket()
		@teams = @bracket.get('teams')
		@teams.reset( @sew.makeTeams() )
		@view = new TeamMenuView({bracket: @bracket})


	it 'should show 4 teams', ->
		expect(@view.$el.find 'li').to.have.length 4

	it 'should not show a button for tbd teams', ->
		@teams.at(0).set({"id": "5088d119f767afaf68000002","name": "Megashock"})
		@teams.at(1).set({"id": "5088d119f767afaf68000005","name": "Orbit"})
		expect(@view.$el.find '.add-team').to.have.length 0

	it 'should show a add team button when the team has no ID', ->
		@teams.at(2).set({"name": "Lewis"})
		@teams.at(3).set({"name": "Martin"})
		@view.render()
		expect(@view.$el.find '.add-team').to.have.length 2