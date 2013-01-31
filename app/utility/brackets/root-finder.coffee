module.exports = class RootFinder
	#finds the first match without a parent
	@find: (matches) =>
		for match in matches
			unless match.get('parent')?
				return match

	@findLoserRoot: (matches)=>
		for match in matches
			unless match.get('parent')?
				return match.get('children')[1]

	@findWinnerRoot: (matches)=>
		for match in matches
			unless match.get('parent')?
				return match.get('children')[0]