Model = require 'models/base/model'

module.exports = class Game extends Model
	defaults: ()->
		number: 0
		status: "ready"

	endWithWinner: (team)->
		@set 'winner',
			id: team.id
			name: team.get 'name'
		@set 'status', 'done'

	start: ()->
		@set 'status', 'active'