View = require 'views/base/view'
template = require 'views/templates/game-sub'

module.exports = class GameSubView extends View
	template: template
	tagName: "li"
	container: "#game-container"
	class: "game-sub-view"

	initialize:(options)->
		super(options)

	setMatchup:(matchup)=>
		@matchup = matchup
		@

	render:->
		super
		options = {}
		options.gameNumber = @model.get 'number'
		options.teams = for team in @matchup.get 'teams'
			{id: team.id
			name: team.get 'name'}
		@$el.html @template(options)
		@$el.addClass @model.get('status').replace(/\ /g, "-")
		@