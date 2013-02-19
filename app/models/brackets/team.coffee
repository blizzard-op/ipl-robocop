Model = require 'models/base/model'

module.exports = class Team extends Model
	defaults: ()->
		name: "TBD"
		image_url: ""
		seed: 0

	initialize: (options)->
		super options
		@urlRoot = ()-> "http://esports.ign.com/content/v2/teams"
