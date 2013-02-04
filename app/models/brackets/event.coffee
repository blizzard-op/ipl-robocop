Model = require 'models/base/model'
Matchup = require 'models/brackets/matchup'

module.exports = class Event extends Model
	defaults: ()->
		title: "TBD vs. TBD"
		stream: {name: "SC2 1", id:"5088c239f767afac6e000001"}
		starts_at: "02/26/2013 12:00 am PT" #moment().subtract('days', 10).format()
		ends_at: "02/26/2013 12:00 am PT" #moment().subtract('days', 10).format()
		rebroadcast: false
		matchup: new Matchup()
		groups: []

	toJSON:=>
		attr = _.clone(@attributes)
		attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm a").format("MM-DD-YYYYTHHss:mmZ")
		attr

	parse:(data)->
		data.matchup = @get('matchup').parse(data.matchup)
		data.starts_at = moment(data.starts_at, "MM-DD-YYYYTHHss:mmZ").format("MM/DD/YYYY hh:mm a Z")
		@