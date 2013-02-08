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
		groups: [{
			"id": "5100451909f67b42a8000002",
			"name": "StarCraft II",
			"slug": "starcraft-2",
			"image_url": "http://media.ign.com/ev/esports/ipl-static/shared/images/logos/franchises/starcraft-2.png"
		}]

	toJSON:=>
		attr = _.clone(@attributes)
		attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm a").format("MM-DD-YYYYTHH:mm:ssZ")
		attr

	parse:(data)->
		data.matchup = @get('matchup').parse(data.matchup)
		data.starts_at = moment(data.starts_at, "MM-DD-YYYYTHH:mm:ssZ").format("MM/DD/YYYY hh:mm aZ")
		@

	autoTitle:=>
		teams= for i in [0...2]
			if @get('matchup').get('teams')[i]? then @get('matchup').get('teams')[i].get 'name' else "TBD"
		@set 'title', teams.join " vs. "