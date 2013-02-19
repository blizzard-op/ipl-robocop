Viper = require 'utility/viper'
Event = require 'models/brackets/event'

describe 'Save Matchup to Viper', ->
	before ->
		@model = new Event()
		@testJSON = '{"title": "Viper Matchup Test Event","stream": {"id": "5088c239f767afac6e000001","name": "SC2 1"},"starts_at": "2003-02-14T16:00:00-08:00","ends_at": "2003-02-14T18:00:00-08:00","rebroadcast": false,"matchup": {"best_of": 1,"teams": [{"id": "5088ca61f767afae11000014","name": "Acer","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/acer.png","points": 0},{"id": "5088ca61f767afae11000002","name": "NSHoSeo","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/nshoseo.png","points": 0}],"games": []},"groups": []}'
		@testOb = JSON.parse(@testJSON)
		@firstTeamId = @testOb.matchup.teams[0].name
		@model.set @model.parse(@testOb)

	# it 'should be be able to sync with Viper without first saving event', (done)->
	# 	Viper.saveMatchup(@model, done)

	# it 'should have an id after save',->
	# 	expect(@model.get('matchup').id).to.exist

	# it 'should keep teams in the same order',->
	# 	expect(@model.get('matchup').get('teams')[0].get 'name').to.equal @firstTeamId

	after (done)->
		@model.destroy
			success: (data)=>
				done()
			error: (model, xhr)=>
				done()