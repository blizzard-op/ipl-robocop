View = require 'views/base/view'
Collection = require 'models/base/collection'
BracketView = require 'views/brackets/bracket-view'
BracketUrls = require 'utility/brackets/bracket-urls'
mediator = require 'mediator'
Mcclane = require 'utility/mcclane'

module.exports = class BracketEditorView extends BracketView
	initialize:(options)->
		super(options)
		@model.url = ()-> BracketUrls.apiBase+"/brackets/v6/api/"

		@delegate 'click', '.match', (ev)->@clickMatch(ev)
		@delegate 'click', '.hotzone', ()-> @deselect()
		@delegate 'click', '.bracket-title', (ev)->@editTitle(ev)
		@delegate 'blur', '.bracket-title-input', (ev)->@saveTitle(ev)
		@selected = []

	render: ->
		super
		$('<div class="hotzone">').appendTo(@$el).width(@$el.width()).height(@$el.height())
		$('<input type="text" class="bracket-title-input">').appendTo(@.$('.label-layer span.bracket-title'))
		@

	saveBracket: ()=>
		@model.save null,
			xhrFields:
				withCredentials: true

	clickMatch: (ev)=>
		unless ev.shiftKey is true
			@deselect()
		unless $(ev.currentTarget).hasClass('activeSelect')
			@selected.push $(ev.currentTarget).data('match')
			$(ev.currentTarget).addClass 'activeSelect'
			mediator.publish 'change:selected', @selected

	deselect: ()=>
		$('.match.activeSelect').removeClass 'activeSelect'
		@selected = []

	editTitle: (ev)=>
		$(ev.currentTarget).addClass 'editing'
		$(ev.currentTarget).find('input').focus().val @model.get('title')

	saveTitle:(ev)=>
		$(ev.currentTarget).parent('span').removeClass 'editing'
		newTitle = String($(ev.currentTarget).val().trim())
		@model.set 'title', newTitle
		@model.set 'slug', newTitle.toLowerCase().replace(/\ /g, '-')
		@.$('.bracket-title h1').text @model.get 'title'
		Mcclane.save()
