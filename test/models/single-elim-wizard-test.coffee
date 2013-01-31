SingleElimWizard = require 'models/single-elim-wizard'

describe 'SingleElimWizard', ->
  beforeEach ->
    @model = new SingleElimWizard({numPlayers: 16})

  it 'should be a non empty array',->
  	expect(@model.generate().length).to.be.above 0 

  it 'should have length of n-1',->
    expect(@model.generate()).to.have.length 15