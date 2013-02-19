Viper = require 'utility/viper'
Event = require 'models/brackets/event'

describe 'Save Game to Viper', ->
	before ->
		@model = new Event()
		@testJSON = '{"title": "Viper Matchup Test Event","stream": {"id": "5088c239f767afac6e000001","name": "SC2 1"},"starts_at": "2003-02-14T16:00:00-08:00","ends_at": "2003-02-14T18:00:00-08:00","rebroadcast": false,"matchup": {"best_of": 1,"teams": [{"id": "5088ca61f767afae11000014","name": "Acer","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/acer.png","points": 0},{"id": "5088ca61f767afae11000002","name": "NSHoSeo","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/nshoseo.png","points": 0}],"games": []},"groups": []}'
		@testOb = JSON.parse(@testJSON)
		@model.set @model.parse(@testOb)
		@game = @model.get('matchup').get('games').at(0)

	it 'should be be able to sync with Viper without first saving event', (done)->
		Viper.saveGame(@model, @game, done)

	it 'should have an id after save',->
		expect(@model.get('matchup').get('games').at(0).id).to.exist

	it 'should have the status "ready" before starting', ->
		expect(@game.get 'status').to.equal "ready"

	it 'should save without error after starting game', (done)->
		@game.start()
		Viper.saveGame(@model, @game, done)

	it 'should have the status "underway" after saving', ->
		expect(@game.get 'status').to.equal "underway"

	it 'should save without error after ending a game', (done)->
		@game.endWithWinner(@model.get('matchup').get('teams')[0])
		Viper.saveGame(@model, @game, done)

	it 'should have the status "finished" after saving', ->
		expect(@game.get 'status').to.equal "finished"

	after (done)->
		@model.destroy
			success: (data)=>
				done()
			error: (model, xhr)=>
				done()