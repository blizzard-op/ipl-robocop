DoubleElimGenerator = require 'models/double-elim-generator'
Fuser = require 'utility/fuse-trees'
FlattenTree = require 'utility/brackets/flatten-tree'
RootFinder = require 'utility/brackets/root-finder'
SingleElimWizard = require 'models/single-elim-wizard'
MatchPruner = require 'utility/brackets/match-pruner'

describe 'DoubleElimGenerator', ->
	before ->
		@model = new SingleElimWizard()
		@doubleElimGen = new DoubleElimGenerator()
		@model.set 'numPlayers', 28
		@winnerTree = @model.generate()
		wlb = @winnerTree
		@loserTree = @doubleElimGen.generate( @model.get('numPlayers'), @winnerTree )
		wlb = FlattenTree.flatten(Fuser.fuse(RootFinder.find(@winnerTree), RootFinder.find(@loserTree)))
		@winnerTree = MatchPruner.prune( @winnerTree, @model.get('numPlayers'))
		@matches = MatchPruner.prune(wlb,@model.get('numPlayers'))

	it 'should generate a bracket with the right number of matches', ->
		expect(@matches.length).to.equal (@model.get('numPlayers') * 2) - 2

	it 'should generate a bracket where every winner match has a loser drop match', ->
		expect(_.every(@winnerTree, (match)=>
			ob = match.get('loserDropsTo')
			lm = _.findWhere(@matches, {cid: ob.match.cid})
			lm?
		)).to.be.true
