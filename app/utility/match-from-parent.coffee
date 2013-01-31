Match = require 'models/brackets/match'

module.exports = class MatchFromParent
	# creates a new match and double links it
	@make: (parent, options={})->
		match = new Match(options)
		match.set 'parent', parent
		parent.get('children').push match
		match

	# creates a new match and adopts the parents children
	@insert: (parent, options={})=>
		match = new Match(options)
		match.set 'parent', parent
		match.set 'children', parent.get 'children'
		for child in match.get 'children'
			child.set 'parent', match
		parent.set 'children', [match]
		match