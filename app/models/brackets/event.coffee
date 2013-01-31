Model = require 'models/base/model'
Matchup = require 'models/brackets/matchup'

module.exports = class Event extends Model
	defaults: ()->
		title: ""
		stream: null
		starts_at: ""
		ends_at: ""
		rebroadcast: false
		matchup: new Matchup()
		groups: []