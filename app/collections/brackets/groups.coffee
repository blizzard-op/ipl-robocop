Collection = require 'models/base/collection'
Group = require 'models/brackets/group'

module.exports = class Groups extends Collection
  model: Group
