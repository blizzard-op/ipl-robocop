Event = require 'models/brackets/event'
Matchup = require 'models/brackets/matchup'
MatchTeam = require 'models/brackets/match-team'

describe 'Brackets/event', ->
	beforeEach ->
		@model = new Event()
		@testJSON = '{"id": "50c63a2e09f67b688e000034","title": "Acer v NsHoSeo","stream": {"id": "5088c239f767afac6e000001","name": "SC2 1"},"starts_at": "2013-02-14T16:00:00-08:00","ends_at": "2013-02-14T18:00:00-08:00","rebroadcast": false,"matchup": {"id": "50c63a2e09f67b688e000035","best_of": 9,"teams": [{"id": "5088ca61f767afae11000002","name": "NSHoSeo","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/nshoseo.png","points": 0},{"id": "5088ca61f767afae11000014","name": "Acer","image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/acer.png","points": 0}],"games": []},"groups": []}'
		@testOb = JSON.parse(@testJSON)
		@model.set @model.parse(@testOb)

	it 'should not mangle matchup types on parse',->
		expect(@model.get 'matchup').to.be.an.instanceof Matchup

	it 'should set simple types on parse',->
		expect(@model.get 'title').to.eql "Acer v NsHoSeo"

	it 'should not mangle team types on parse',->
		matchupTeams = @model.get('matchup').get 'teams'
		expect(matchupTeams[0]).to.be.an.instanceof MatchTeam

	it 'should set the correct teams',->
		matchupTeams = @model.get('matchup').get 'teams'
		expect(matchupTeams[0].get 'name').to.eql "NSHoSeo"
		expect(matchupTeams[1].get 'name').to.eql "Acer"