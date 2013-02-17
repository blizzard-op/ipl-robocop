Viper = require 'utility/viper'
Event = require 'models/brackets/event'

describe 'Save Event to Viper', ->
	before ->
		@model = new Event()
		@testJSON = '{"title": "Viper Test Event","stream": {"id": "5088c239f767afac6e000001","name": "SC2 1"},"starts_at": "2003-02-14T16:00:00-08:00","ends_at": "2003-02-14T18:00:00-08:00","rebroadcast": false,"matchup": {"best_of": 1,"teams": [{"id": "5088ca61f767afae11000014","name": "Acer","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/acer.png","points": 0},{"id": "5088ca61f767afae11000002","name": "NSHoSeo","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/nshoseo.png","points": 0}],"games": []},"groups": []}'
		@testOb = JSON.parse(@testJSON)
		@model.set @model.parse(@testOb)

	it 'should be be able to sync with Viper', (done)->
		Viper.saveEvent(@model, done)

	it 'should have an id after save',->
		expect(@model.id).to.exist

	after (done)->
		@model.destroy
			success: (data)=>
				done()
			error: (model, xhr)=>
				done()