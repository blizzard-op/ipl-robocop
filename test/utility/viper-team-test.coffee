Viper = require 'utility/viper'
Team = require 'models/brackets/team'

describe 'Save Team to Viper', ->
	before ->
		@model = new Team({"seed":1,"name":"Viper Test Team","image_url":"","points":0})

	it 'should be be able to sync with Viper', (done)->
		Viper.saveTeam(@model, done)

	it 'should have an id after save',->
		expect(@model.id).to.exist

	after (done)->
		@model.destroy
			success: (data)=>
				done()
			error: (model, xhr)=>
				done()