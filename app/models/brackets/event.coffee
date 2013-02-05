Model = require 'models/base/model'
Matchup = require 'models/brackets/matchup'

module.exports = class Event extends Model
	defaults: ()->
		title: "TBD vs. TBD"
		stream: {name: "SC2 1", id:"5088c239f767afac6e000001"}
		starts_at: moment().add('days', 10).format("MM/DD/YYYY hh:mm aZ")
		ends_at: moment().add('days', 10).add('hours', 1).format("MM-DD-YYYYTHH:mm:ssZ")
		rebroadcast: false
		matchup: new Matchup()
		groups: []

	toJSON:=>
		attr = _.clone(@attributes)
		attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm a").format("MM-DD-YYYYTHH:mm:ssZ")
		attr

	parse:(data)->
		data.matchup = @get('matchup').parse(data.matchup)
		data.starts_at = moment(data.starts_at, "MM-DD-YYYYTHH:mm:ssZ").format("MM/DD/YYYY hh:mm aZ")
		@