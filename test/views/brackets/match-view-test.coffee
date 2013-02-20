MatchView = require 'views/brackets/match-view'
Match = require 'models/brackets/match'
describe 'Test MatchView', ->
	before ->
		@model = new Match()
		@testJSON = '{"id" : "mid1","event" : {"title" : "Fnatic vs. LeiYa","starts_at" : "2013-01-02T12:00:00-08:00","ends_at" : "2013-02-18T14:51:56-08:00","stream" : null,"rebroadcast" : false,"matchup" : {"games" : [{"id" : null,"number" : 1,"status" : "ready","winner" : null}],"teams" : [{"id" : "5088cad2f767afae2e000021","name" : "Fnatic","image_url" : "http://media.ign.com/ev/esports/ipl-static/shared/images/teams/fnatic.png","seed" : 1,"points" : 0},{"id" : "50b409302f098230d5000026","name" : "LeiYa","image_url" : "","seed" : 4,"points" : 0}]},"groups" : [ ]},"children" : [ ],"parent" : 0,"loserdropsto" : null,"transform2d" : {"x" : 0,"y" : 0,"paddingx" : 100,"paddingy" : 200},"hasloserslot" : false}'
		@testOb = JSON.parse(@testJSON)
		@model.parse(@testOb)

		@view = new MatchView({model: @model})
		@view.render()

	it 'should render', ->
		# console.log @model.event().get 'starts_at'
		expect(@view.$el.find 'span').to.have.length 4

	it 'should show date if before the event', ->
		@model.event().set 'starts_at', moment().add('days',2).format("MM/DD/YYYY hh:mm a")
		@view.render()
		expect(@view.$el.find '.time-rider').to.have.length 1

	it 'should show date if on the same day as event', ->
		@model.event().set 'starts_at', moment().subtract('hours', 1).format("MM/DD/YYYY hh:mm a")
		@view.render()
		expect(@view.$el.find '.time-rider').to.have.length 1

	it 'should hide date if after day of event', ->
		@model.event().set 'starts_at', moment().subtract('days', 2).format("MM/DD/YYYY hh:mm a")
		@view.render()
		expect(@view.$el.find '.time-rider').to.have.length 0