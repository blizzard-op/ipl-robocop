Collection = require 'models/base/collection'
Team = require 'models/brackets/team'

module.exports = class teams extends Collection
	model: Team