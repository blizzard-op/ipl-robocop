Model = require 'models/base/model'
Matchup = require 'models/brackets/matchup'

module.exports = class Event extends Model
	defaults: ()->
		title: "TBD vs. TBD"
		stream: null
		starts_at: moment().subtract('years', 10).format("MM/DD/YYYY hh:mm aZ")
		ends_at: moment().subtract('years', 10).add('hours', 1).format("YYYY-MM-DDTHH:mm:ssZ")
		rebroadcast: false
		matchup: new Matchup()
		groups: [{
			"id": "5100451909f67b42a8000002",
			"name": "StarCraft II",
			"slug": "starcraft-2",
			"image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/logos/franchises/starcraft-2.png"
		}]

	initialize:(options)->
		super(options)
		@urlRoot = ()-> "http://esports.ign.com/content/v2/events"

	toJSON:=>
		# debugger
		attr = _.clone(@attributes)
		attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm aZ").format("YYYY-MM-DDTHH:mm:ssZ")
		attr

	parse:(data)->
		@set _.omit data, "matchup", "starts_at"
		@set 'starts_at', moment(@get 'starts_at', "YYYY-MM-DDTHH:mm:ssZ").format("MM/DD/YYYY hh:mm aZ")
		@get('matchup').parse(data.matchup)
		{}

	autoTitle:=>
		teams= for i in [0...2]
			if @get('matchup').get('teams')[i]? then @get('matchup').get('teams')[i].get 'name' else "TBD"
		@set 'title', teams.join " vs. "