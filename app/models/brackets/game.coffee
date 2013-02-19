Model = require 'models/base/model'

module.exports = class Game extends Model
	defaults: ()->
		number: 0
		status: "ready"
	initialize:(options)->
		super options
		@urlRoot = ()-> "http://esports.ign.com/content/v2/games"

	endWithWinner: (team)=>
		@set 'winner',
			id: team.id
			name: team.name
		@set 'ends_at', moment().format("YYYY-MM-DDTHH:mm:ssZ")
		@set 'status', 'finished'

	start: ()=>
		@set 'status', 'underway'
		@set 'starts_at', moment().format("YYYY-MM-DDTHH:mm:ssZ")

	parse: (data)=>
		if data.success? and Boolean(data.success) is true
			return {}
		@set data
		if @get('status') is 'ready' and @get('starts_at')?
			@set 'status', 'underway'
		{}