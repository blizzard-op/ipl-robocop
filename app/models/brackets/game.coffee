Model = require 'models/base/model'

module.exports = class Game extends Model
	defaults: ()->
		number: 0
		status: "ready"

	endWithWinner: (team)->
		@set 'winner',
			id: team.id
			name: team.get 'name'
		@set 'ends_at', moment().format("YYYY-MM-DDTHH:mm:ssZ")
		@set 'status', 'done'

	start: ()->
		@set 'status', 'underway'
		@set 'starts_at', moment().format("YYYY-MM-DDTHH:mm:ssZ")