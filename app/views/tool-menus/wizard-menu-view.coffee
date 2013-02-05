View = require 'views/base/view'
template = require 'views/templates/wizard-menu'
Matches = require 'collections/brackets/matches'
Teams = require 'collections/brackets/teams'
MatchPruner = require 'utility/brackets/match-pruner'
DoubleElim = require 'models/double-elim-generator'
Fuser = require 'utility/fuse-trees'
FlattenTree = require 'utility/brackets/flatten-tree'
RootFinder = require 'utility/brackets/root-finder'

module.exports = class WizardMenuView extends View
	template: template
	container: '#menu-container'
	id: 'wizard-menu'
	className: 'admin-menu clearfix'
	autoRender: true
	events:
		'change #num-players': ()-> @changePlayers()
		'click .btn-primary': ()-> @clickWizard()
		'submit': ()-> false

	initialize: (options)->
		@bracket = options.bracket
		@doubleElimGen = new DoubleElim()
		super

	changePlayers:=>
		@model.set 'numPlayers', parseInt @.$('#num-players').val()

	clickWizard:=>
		fullTree = @model.generate()
		wlb = fullTree
		if @.$('input:radio[name ="optionsRadios"]:checked').val() is "double"
			loserTree = @doubleElimGen.generate( @model.get('numPlayers'), fullTree )
			wlb = FlattenTree.flatten(Fuser.fuse(RootFinder.find(fullTree), RootFinder.find(loserTree)))
		matches = MatchPruner.prune(wlb, parseInt @.$('#num-players').val())
		@bracket.get('matches').reset( matches )
		@bracket.get('teams').reset( @model.makeTeams() )