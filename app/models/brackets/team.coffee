Model = require 'models/base/model'

module.exports = class Team extends Model
	defaults: ()->
		name: "TBD"
		image_url: ""