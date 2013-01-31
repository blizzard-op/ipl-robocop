Collection = require 'models/base/collection'
Tool = require 'models/tool'

module.exports = class Tools extends Collection
  model: Tool
