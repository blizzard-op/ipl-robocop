RootFinder = require 'utility/brackets/root-finder'
Rounds = require 'utility/brackets/rounds-from-match-list'

module.exports = class TreeViewFormatter
	@format: (root, xSpacing, ySpacing)->
		# console.log root.get('children')[1].get 'hasLoserSlot']
		loserHead = root.get('children')[1]
		winnerHead = root.get('children')[0]
		console.log root
		if root.get('children')[1].get 'hasLoserSlot'
			loserRounds = Rounds.convert loserHead
			winnerRounds = Rounds.convert winnerHead
			lMax = @singleTree(loserRounds, xSpacing, ySpacing)

			# ws = lMax.x
			winnerSpacing = ((lMax.x)) / (winnerRounds.length-1)
			wMax = @singleTree(winnerRounds, winnerSpacing, ySpacing)
			@addOffset loserHead, 0, wMax.y + ySpacing + 20

			t2d = _.clone(root.get 'transform2d')
			t2d.x = wMax.x + winnerSpacing
			t2d.y = @between(winnerHead, loserHead)
			root.set 'transform2d', t2d
		else
			rounds = Rounds.convert root
			@singleTree(rounds, xSpacing, ySpacing)

	@singleTree: (rounds, xSpacing, ySpacing)->
		startRound = 0
		max =
			x:0
			y:0
		# find the round with the most matches
		for i in [0...rounds.length]
			if rounds[i].length > rounds[startRound].length
				startRound = i

		# loop through the rounds, starting with the fattest one and format
		for i in [startRound...rounds.length]
			for j in [0...rounds[i].length]
				t2d =
					x: i * xSpacing
					y: 0
				if i is startRound
					t2d.y = j * ySpacing
				else if rounds[i][j].get('children')?.length > 0
					t2d.y += a.get('transform2d').y for a in rounds[i][j].get('children') when a?
					t2d.y /= rounds[i][j].get('children').length
				rounds[i][j].set 'transform2d', t2d
				max.x = Math.max t2d.x, max.x
				max.y = Math.max t2d.y, max.y

		# go back and format the rounds behind the fattest round
		for i in [startRound...0]
			for j in [0...rounds[i-1].length]
				t2d =
					x: (i-1) * xSpacing
					y: rounds[i-1][j].get('parent').get('transform2d').y
				rounds[i-1][j].set 'transform2d', t2d
		max

	@between: (leftHead, rightHead)=>
		half = (leftHead.get('transform2d').y + rightHead.get('transform2d').y) / 2

	@addOffset: (root, xOff=0, yOff=0)=>
		t2d = _.clone(root.get 'transform2d')
		t2d.x += xOff
		t2d.y += yOff
		root.set 'transform2d', t2d
		for child in root.get 'children'
			@addOffset(child, xOff, yOff)


