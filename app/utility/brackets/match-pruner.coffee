module.exports = class MatchPruner
	@prune: (matches, seedLimit)->
		validMatches = []
		for m in matches
			noOver = true
			for t in m.teams()
				if parseInt(t.get 'seed') > seedLimit
					noOver = false
			if noOver
				validMatches.push m
			else
				parent = m.get 'parent'
				parent.set 'children', _.filter(parent.get('children'), (child)-> child isnt m )
		validMatches