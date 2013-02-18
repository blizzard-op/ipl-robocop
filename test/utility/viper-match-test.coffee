Viper = require 'utility/viper'
Event = require 'models/brackets/event'
Match = require 'models/brackets/match'
MatchTeam = require 'models/brackets/match-team'

describe 'Save Match to Viper', ->
	before ->
		@model = new Match()
		@testJSON = '{"id" : "mid1","event" : {"title" : "Fnatic vs. LeiYa","starts_at" : "2003-02-18T13:51:00-08:00","ends_at" : "2003-02-18T14:51:56-08:00","stream" : null,"rebroadcast" : false,"matchup" : {"games" : [{"id" : null,"number" : 1,"status" : "ready","winner" : null}],"teams" : [{"id" : "5088cad2f767afae2e000021","name" : "Fnatic","image_url" : "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/fnatic.png","seed" : 1,"points" : 0},{"id" : "50b409302f098230d5000026","name" : "LeiYa","image_url" : "","seed" : 4,"points" : 0}]},"groups" : [ ]},"children" : [ ],"parent" : 0,"loserdropsto" : null,"transform2d" : {"x" : 0,"y" : 0,"paddingx" : 100,"paddingy" : 200},"hasloserslot" : false}'
		@testOb = JSON.parse(@testJSON)
		@model.parse(@testOb)

	it 'should have a Mcclane match id', ->
		expect(@model.id).to.equal "mid1"

	it 'should be be able to sync with Viper', (done)->
		Viper.saveMatch(@model, done)

	it 'should save after changes', (done)->
		mt = new MatchTeam({"id": "50b409392f098230d5000027","name": "Drewbie","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/drewbie.png","points": 0})
		@model.team(1, mt)
		@model.event().autoTitle()
		Viper.saveMatch(@model, done)

	it 'should have updated the title after save', ->
		expect(@model.event().get 'title').to.equal "Fnatic vs. Drewbie"

	after (done)->
		@model.event().destroy
			success: (data)=>
				done()
			error: (model, xhr)=>
				done()