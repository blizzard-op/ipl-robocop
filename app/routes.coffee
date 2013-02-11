module.exports = (match) ->
	match 'brackets/v6/admin', 'admin#index'
	match 'brackets/v6/admin/', 'admin#index'
	match 'brackets/v6/admin/edit/:slug', 'admin#editBracket'
	match 'brackets/v6/admin/load', 'open#index'