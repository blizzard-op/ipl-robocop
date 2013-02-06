(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("test/collections/brackets/games-test", function(exports, require, module) {
  var Collection, Game, Games;

  Collection = require('models/base/collection');

  Game = require('models/brackets/game');

  Games = require('collections/brackets/games');

  describe('Brackets/game', function() {
    beforeEach(function() {
      this.model = new Game();
      return this.collection = new Games();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/collections/brackets/group-stages-test", function(exports, require, module) {
  var Collection, GroupStage, GroupStages;

  Collection = require('models/base/collection');

  GroupStage = require('models/brackets/group-stage');

  GroupStages = require('collections/brackets/group-stages');

  describe('Brackets/group', function() {
    beforeEach(function() {
      this.model = new GroupStage();
      return this.collection = new GroupStages();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/collections/brackets/matches-test", function(exports, require, module) {
  var Collection, Match, Matches;

  Collection = require('models/base/collection');

  Match = require('models/brackets/match');

  Matches = require('collections/brackets/matches');

  describe('Brackets/match', function() {
    beforeEach(function() {
      this.model = new Match();
      return this.collection = new Matches();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/collections/brackets/streams-test", function(exports, require, module) {
  var Collection, Stream, Streams;

  Collection = require('models/base/collection');

  Stream = require('models/brackets/stream');

  Streams = require('collections/brackets/streams');

  describe('Stream', function() {
    beforeEach(function() {
      this.model = new Stream();
      return this.collection = new Streams();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/collections/brackets/teams-test", function(exports, require, module) {
  var Collection, Team, Teams;

  Collection = require('models/base/collection');

  Team = require('models/brackets/team');

  Teams = require('collections/brackets/teams');

  describe('Brackets/team', function() {
    beforeEach(function() {
      this.model = new Team();
      return this.collection = new Teams();
    });
    afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
    it('should be an instance of team', function() {
      this.collection.add({});
      return expect(this.collection.at(0)).to.be.an.instanceOf(Team);
    });
    return it('should update to teams', function() {
      this.collection.update([
        {
          name: "robo",
          id: "0"
        }, {
          name: "cop",
          id: "1"
        }
      ]);
      expect(this.collection.at(0)).to.be.an.instanceOf(Team);
      return expect(this.collection.at(1)).to.be.an.instanceOf(Team);
    });
  });
  
});
window.require.register("test/collections/tools-test", function(exports, require, module) {
  var Collection, Tool, Tools;

  Collection = require('models/base/collection');

  Tool = require('models/tool');

  Tools = require('collections/tools');

  describe('Tools', function() {
    beforeEach(function() {
      this.model = new Tool();
      return this.collection = new Tools();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/models/admin-tools-test", function(exports, require, module) {
  var AdminTools;

  AdminTools = require('models/admin-tools');

  describe('AdminTools', function() {
    return beforeEach(function() {
      return this.model = new AdminTools();
    });
  });
  
});
window.require.register("test/models/admin-workspace-test", function(exports, require, module) {
  var AdminWorkspace;

  AdminWorkspace = require('models/admin-workspace');

  describe('AdminWorkspace', function() {
    return beforeEach(function() {
      return this.model = new AdminWorkspace();
    });
  });
  
});
window.require.register("test/models/brackets/bracket-test", function(exports, require, module) {
  var Bracket;

  Bracket = require('models/brackets/bracket');

  describe('Brackets/bracket', function() {
    return beforeEach(function() {
      return this.model = new Bracket();
    });
  });
  
});
window.require.register("test/models/brackets/event-test", function(exports, require, module) {
  var Event;

  Event = require('models/brackets/event');

  describe('Brackets/event', function() {
    return beforeEach(function() {
      return this.model = new Event();
    });
  });
  
});
window.require.register("test/models/brackets/game-test", function(exports, require, module) {
  var Game;

  Game = require('models/brackets/game');

  describe('Brackets/game', function() {
    return beforeEach(function() {
      return this.model = new Game();
    });
  });
  
});
window.require.register("test/models/brackets/group-stage-test", function(exports, require, module) {
  var GroupStage;

  GroupStage = require('models/brackets/group-stage');

  describe('Brackets/group', function() {
    return beforeEach(function() {
      return this.model = new GroupStage();
    });
  });
  
});
window.require.register("test/models/brackets/match-test", function(exports, require, module) {
  var Match;

  Match = require('models/brackets/match');

  describe('Brackets/match', function() {
    return beforeEach(function() {
      return this.model = new Match();
    });
  });
  
});
window.require.register("test/models/brackets/matchup-test", function(exports, require, module) {
  var Matchup;

  Matchup = require('models/brackets/matchup');

  describe('Matchup', function() {
    return beforeEach(function() {
      return this.model = new Matchup();
    });
  });
  
});
window.require.register("test/models/brackets/stream-test", function(exports, require, module) {
  var Stream;

  Stream = require('models/brackets/stream');

  describe('Stream', function() {
    return beforeEach(function() {
      return this.model = new Stream();
    });
  });
  
});
window.require.register("test/models/brackets/team-test", function(exports, require, module) {
  var Team;

  Team = require('models/brackets/team');

  describe('Brackets/team', function() {
    return beforeEach(function() {
      return this.model = new Team();
    });
  });
  
});
window.require.register("test/models/double-elim-generator-test", function(exports, require, module) {
  var DoubleElimGenerator;

  DoubleElimGenerator = require('models/double-elim-generator');

  describe('DoubleElimGenerator', function() {
    return beforeEach(function() {
      return this.model = new DoubleElimGenerator();
    });
  });
  
});
window.require.register("test/models/group-generator-test", function(exports, require, module) {
  var GroupGenerator;

  GroupGenerator = require('models/group-generator');

  describe('GroupGenerator', function() {
    return beforeEach(function() {
      return this.model = new GroupGenerator();
    });
  });
  
});
window.require.register("test/models/match-mutator-test", function(exports, require, module) {
  var MatchMutator;

  MatchMutator = require('models/match-mutator');

  describe('MatchMutator', function() {
    return beforeEach(function() {
      return this.model = new MatchMutator();
    });
  });
  
});
window.require.register("test/models/single-elim-wizard-test", function(exports, require, module) {
  var SingleElimWizard;

  SingleElimWizard = require('models/single-elim-wizard');

  describe('SingleElimWizard', function() {
    beforeEach(function() {
      return this.model = new SingleElimWizard({
        numPlayers: 16
      });
    });
    it('should be a non empty array', function() {
      return expect(this.model.generate().length).to.be.above(0);
    });
    return it('should have length of n-1', function() {
      return expect(this.model.generate()).to.have.length(15);
    });
  });
  
});
window.require.register("test/models/team-auto-seeder-test", function(exports, require, module) {
  var TeamAutoSeeder;

  TeamAutoSeeder = require('models/team-auto-seeder');

  describe('TeamAutoSeeder', function() {
    return beforeEach(function() {
      return this.model = new TeamAutoSeeder();
    });
  });
  
});
window.require.register("test/models/tool-test", function(exports, require, module) {
  var Tool;

  Tool = require('models/tool');

  describe('Tool', function() {
    return beforeEach(function() {
      return this.model = new Tool();
    });
  });
  
});
window.require.register("test/test-helpers", function(exports, require, module) {
  var chai, sinonChai;

  chai = require('chai');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  module.exports = {
    expect: chai.expect,
    sinon: require('sinon')
  };
  
});
window.require.register("test/views/admin-toolbar-view-test", function(exports, require, module) {
  var AdminToolbarView;

  AdminToolbarView = require('views/admin-toolbar-view');

  describe('AdminToolbarView', function() {
    return beforeEach(function() {
      return this.view = new AdminToolbarView();
    });
  });
  
});
window.require.register("test/views/admin-workspace-view-test", function(exports, require, module) {
  var AdminWorkspaceView;

  AdminWorkspaceView = require('views/admin-workspace-view');

  describe('AdminWorkspaceView', function() {
    return beforeEach(function() {
      return this.view = new AdminWorkspaceView();
    });
  });
  
});
window.require.register("test/views/bracket-editor-view-test", function(exports, require, module) {
  var BrackerEditorView;

  BrackerEditorView = require('views/bracket-editor-view');

  describe('BrackerEditorView', function() {
    return beforeEach(function() {
      return this.view = new BrackerEditorView();
    });
  });
  
});
window.require.register("test/views/brackets/bracket-view-test", function(exports, require, module) {
  var BracketView;

  BracketView = require('views/brackets/bracket-view');

  describe('bracketView', function() {
    return beforeEach(function() {
      return this.view = new BracketView();
    });
  });
  
});
window.require.register("test/views/brackets/group-view-test", function(exports, require, module) {
  var GroupView;

  GroupView = require('views/brackets/group-view');

  describe('Brackets/groupView', function() {
    return beforeEach(function() {
      return this.view = new GroupView();
    });
  });
  
});
window.require.register("test/views/brackets/match-view-test", function(exports, require, module) {
  var MatchView;

  MatchView = require('views/brackets/match-view');

  describe('MatchView', function() {
    return beforeEach(function() {
      return this.view = new MatchView();
    });
  });
  
});
window.require.register("test/views/game-sub-view-test", function(exports, require, module) {
  var GameSubView;

  GameSubView = require('views/game-sub-view');

  describe('GameSubView', function() {
    return beforeEach(function() {
      return this.view = new GameSubView();
    });
  });
  
});
window.require.register("test/views/header-view-test", function(exports, require, module) {
  var HeaderView, HeaderViewTest, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HeaderView = require('views/header-view');

  mediator = require('mediator');

  HeaderViewTest = (function(_super) {

    __extends(HeaderViewTest, _super);

    function HeaderViewTest() {
      return HeaderViewTest.__super__.constructor.apply(this, arguments);
    }

    HeaderViewTest.prototype.renderTimes = 0;

    HeaderViewTest.prototype.render = function() {
      HeaderViewTest.__super__.render.apply(this, arguments);
      return this.renderTimes += 1;
    };

    return HeaderViewTest;

  })(HeaderView);

  describe('HeaderView', function() {
    beforeEach(function() {
      return this.view = new HeaderViewTest;
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should display 2 links', function() {
      return expect(this.view.$el.find('a')).to.have.length(2);
    });
  });
  
});
window.require.register("test/views/home-page-view-test", function(exports, require, module) {
  var HomePageView;

  HomePageView = require('views/home-page-view');

  describe('HomePageView', function() {
    beforeEach(function() {
      return this.view = new HomePageView;
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should auto-render', function() {
      return expect(this.view.$el.find('img')).to.have.length(1);
    });
  });
  
});
window.require.register("test/views/tool-menus/group-menu-view-test", function(exports, require, module) {
  var GroupMenuView;

  GroupMenuView = require('views/tool-menus/group-menu-view');

  describe('GroupMenuView', function() {
    return beforeEach(function() {
      return this.view = new GroupMenuView();
    });
  });
  
});
window.require.register("test/views/tool-menus/match-menu-view-test", function(exports, require, module) {
  var MatchMenuView;

  MatchMenuView = require('views/tool-menus/match-menu-view');

  describe('MatchMenuView', function() {
    return beforeEach(function() {
      return this.view = new MatchMenuView();
    });
  });
  
});
window.require.register("test/views/tool-menus/team-menu-view-test", function(exports, require, module) {
  var TeamMenuView;

  TeamMenuView = require('views/tool-menus/team-menu-view');

  describe('TeamMenuView', function() {
    return beforeEach(function() {
      return this.view = new TeamMenuView();
    });
  });
  
});
window.require.register("test/views/tool-menus/wizard-menu-view-test", function(exports, require, module) {
  var WizardMenuView;

  WizardMenuView = require('views/tool-menus/wizard-menu-view');

  describe('WizardMenuView', function() {
    return beforeEach(function() {
      return this.view = new WizardMenuView();
    });
  });
  
});
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/brackets/games-test') : true;
if (valid) window.require('test/collections/brackets/games-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/brackets/group-stages-test') : true;
if (valid) window.require('test/collections/brackets/group-stages-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/brackets/matches-test') : true;
if (valid) window.require('test/collections/brackets/matches-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/brackets/streams-test') : true;
if (valid) window.require('test/collections/brackets/streams-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/brackets/teams-test') : true;
if (valid) window.require('test/collections/brackets/teams-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/collections/tools-test') : true;
if (valid) window.require('test/collections/tools-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/admin-tools-test') : true;
if (valid) window.require('test/models/admin-tools-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/admin-workspace-test') : true;
if (valid) window.require('test/models/admin-workspace-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/bracket-test') : true;
if (valid) window.require('test/models/brackets/bracket-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/event-test') : true;
if (valid) window.require('test/models/brackets/event-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/game-test') : true;
if (valid) window.require('test/models/brackets/game-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/group-stage-test') : true;
if (valid) window.require('test/models/brackets/group-stage-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/match-test') : true;
if (valid) window.require('test/models/brackets/match-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/matchup-test') : true;
if (valid) window.require('test/models/brackets/matchup-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/stream-test') : true;
if (valid) window.require('test/models/brackets/stream-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/brackets/team-test') : true;
if (valid) window.require('test/models/brackets/team-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/double-elim-generator-test') : true;
if (valid) window.require('test/models/double-elim-generator-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/group-generator-test') : true;
if (valid) window.require('test/models/group-generator-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/match-mutator-test') : true;
if (valid) window.require('test/models/match-mutator-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/single-elim-wizard-test') : true;
if (valid) window.require('test/models/single-elim-wizard-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/team-auto-seeder-test') : true;
if (valid) window.require('test/models/team-auto-seeder-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/tool-test') : true;
if (valid) window.require('test/models/tool-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/admin-toolbar-view-test') : true;
if (valid) window.require('test/views/admin-toolbar-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/admin-workspace-view-test') : true;
if (valid) window.require('test/views/admin-workspace-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/bracket-editor-view-test') : true;
if (valid) window.require('test/views/bracket-editor-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/brackets/bracket-view-test') : true;
if (valid) window.require('test/views/brackets/bracket-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/brackets/group-view-test') : true;
if (valid) window.require('test/views/brackets/group-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/brackets/match-view-test') : true;
if (valid) window.require('test/views/brackets/match-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/game-sub-view-test') : true;
if (valid) window.require('test/views/game-sub-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/header-view-test') : true;
if (valid) window.require('test/views/header-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/home-page-view-test') : true;
if (valid) window.require('test/views/home-page-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/tool-menus/group-menu-view-test') : true;
if (valid) window.require('test/views/tool-menus/group-menu-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/tool-menus/match-menu-view-test') : true;
if (valid) window.require('test/views/tool-menus/match-menu-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/tool-menus/team-menu-view-test') : true;
if (valid) window.require('test/views/tool-menus/team-menu-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/tool-menus/wizard-menu-view-test') : true;
if (valid) window.require('test/views/tool-menus/wizard-menu-view-test');
