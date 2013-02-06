Collection = require 'models/base/collection'
GroupStage = require 'models/brackets/group-stage'

module.exports = class GroupStages extends Collection
  model: GroupStage
