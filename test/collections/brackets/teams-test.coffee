Collection = require 'models/base/collection'
Team = require 'models/brackets/team'
Teams = require 'collections/brackets/teams'

describe 'Brackets/team', ->
	beforeEach ->
		@model = new Team()
		@collection = new Teams()

	afterEach ->
		@model.dispose()
		@collection.dispose()

	it 'should be an instance of team', ->
		@collection.add {}
		expect(@collection.at(0)).to.be.an.instanceOf Team

	it 'should update to teams', ->
		@collection.update([{name:"robo", id:"0"},{name:"cop", id:"1"}])
		expect(@collection.at(0)).to.be.an.instanceOf Team
		expect(@collection.at(1)).to.be.an.instanceOf Team