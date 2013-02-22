Matchup = require 'models/brackets/matchup'

describe 'Matchup', ->
	beforeEach ->
		@model = new Matchup()

	it 'Should send best_of to Mcclane', ->
		expect(@model.toJSON().best_of).to.equal 3