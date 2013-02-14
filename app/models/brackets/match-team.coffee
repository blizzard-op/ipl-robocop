Model = require 'models/base/model'

module.exports = class MatchTeam extends Model
	defaults: ()->
		name: "TBD"
		points: 0
		seed: 0
		# id: "5088cad2f767afae2e000005"

	initialize: (options)->
		super(options)
		@set 'points', 0

	toJSON:=>
		attrs = _.clone @attributes
		# if this is a TBD team, give it the TBD team id
		if attrs.id? and attrs.id.match(/^tid\d/)
			attrs.id = "5088cad2f767afae2e000005"
		attrs