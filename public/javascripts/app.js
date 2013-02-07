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

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  HeaderController = require('controllers/header-controller');

  Layout = require('views/layout');

  mediator = require('mediator');

  routes = require('routes');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Brunch example application';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      return new HeaderController();
    };

    Application.prototype.initMediator = function() {
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("collections/brackets/games", function(exports, require, module) {
  var Collection, Game, Games,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Game = require('models/brackets/game');

  module.exports = Games = (function(_super) {

    __extends(Games, _super);

    function Games() {
      this.parse = __bind(this.parse, this);

      this.next = __bind(this.next, this);
      return Games.__super__.constructor.apply(this, arguments);
    }

    Games.prototype.model = Game;

    Games.prototype.comparator = function(game) {
      return game.get('number');
    };

    Games.prototype.next = function(winner) {
      var firstInProgress, firstReady;
      if (winner == null) {
        winner = null;
      }
      firstInProgress = this.find(function(game) {
        return game.get('status') === 'in progress';
      });
      firstReady = this.find(function(game) {
        return game.get('status') === 'ready';
      });
      if (firstInProgress != null) {
        firstInProgress.set('status', 'finished');
      }
      if (firstReady != null) {
        firstReady.set('status', 'in progress');
      }
      if (winner != null) {
        return firstInProgress.set('winner', _.pick(winner.attributes, 'id', 'name'));
      }
    };

    Games.prototype.parse = function(models) {
      var i, updated, _i, _ref;
      updated = [];
      for (i = _i = 0, _ref = models.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.at(i) != null) {
          updated[i] = this.at(i);
          updated[i].set(models[i]);
        } else {
          updated[i] = new Game(models[i]);
        }
      }
      return updated;
    };

    return Games;

  })(Collection);
  
});
window.require.register("collections/brackets/group-stages", function(exports, require, module) {
  var Collection, GroupStage, GroupStages,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  GroupStage = require('models/brackets/group-stage');

  module.exports = GroupStages = (function(_super) {

    __extends(GroupStages, _super);

    function GroupStages() {
      return GroupStages.__super__.constructor.apply(this, arguments);
    }

    GroupStages.prototype.model = GroupStage;

    return GroupStages;

  })(Collection);
  
});
window.require.register("collections/brackets/matches", function(exports, require, module) {
  var Collection, Match, Matches,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Match = require('models/brackets/match');

  module.exports = Matches = (function(_super) {

    __extends(Matches, _super);

    function Matches() {
      this.parse = __bind(this.parse, this);
      return Matches.__super__.constructor.apply(this, arguments);
    }

    Matches.prototype.model = Match;

    Matches.prototype.initialize = function(options) {
      return Matches.__super__.initialize.call(this, options);
    };

    Matches.prototype.parse = function(models) {
      var child, i, j, m, match, nc, newMatch, updated, _i, _len, _ref;
      updated = [];
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        match = models[_i];
        m = this.get(match.id);
        if (m != null) {
          m.set(_.omit(m.parse(match), 'event'));
          updated.push(m);
        } else {
          newMatch = new Match();
          newMatch.set(newMatch.parse(match));
          updated.push(newMatch);
        }
      }
      for (j in updated) {
        match = updated[j];
        if (updated[match.get('parent')] != null) {
          updated[j].set('parent', updated[match.get('parent')]);
        } else {
          match.set('parent', null);
        }
        if (updated[(_ref = match.get('loserDropsTo')) != null ? _ref.match : void 0] != null) {
          match.set('loserDropsTo', {
            match: updated[match.get('loserDropsTo').match],
            slot: match.get('loserDropsTo').slot
          });
        } else {
          match.set('loserDropsTo', null);
        }
        nc = (function() {
          var _ref1, _results;
          _ref1 = match.get('children');
          _results = [];
          for (i in _ref1) {
            child = _ref1[i];
            if (updated[child] != null) {
              _results.push(updated[child]);
            } else {
              _results.push(null);
            }
          }
          return _results;
        })();
        updated[j].set('children', nc);
      }
      return updated;
    };

    return Matches;

  })(Collection);
  
});
window.require.register("collections/brackets/streams", function(exports, require, module) {
  var Collection, Stream, Streams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Stream = require('models/brackets/stream');

  module.exports = Streams = (function(_super) {

    __extends(Streams, _super);

    function Streams() {
      return Streams.__super__.constructor.apply(this, arguments);
    }

    Streams.prototype.model = Stream;

    Streams.prototype.comparator = function(stream) {
      return stream.get('name');
    };

    return Streams;

  })(Collection);
  
});
window.require.register("collections/brackets/teams", function(exports, require, module) {
  var Collection, Team, teams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Team = require('models/brackets/team');

  module.exports = teams = (function(_super) {

    __extends(teams, _super);

    function teams() {
      return teams.__super__.constructor.apply(this, arguments);
    }

    teams.prototype.model = Team;

    return teams;

  })(Collection);
  
});
window.require.register("collections/tools", function(exports, require, module) {
  var Collection, Tool, Tools,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Tool = require('models/tool');

  module.exports = Tools = (function(_super) {

    __extends(Tools, _super);

    function Tools() {
      return Tools.__super__.constructor.apply(this, arguments);
    }

    Tools.prototype.model = Tool;

    return Tools;

  })(Collection);
  
});
window.require.register("controllers/admin-controller", function(exports, require, module) {
  var AdminWorkspace, AdminWorkspaceView, AdminsController, Bracket, BracketView, Controller, Tools, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  AdminWorkspaceView = require('views/admin-workspace-view');

  AdminWorkspace = require('models/admin-workspace');

  Tools = require('collections/tools');

  Bracket = require('models/brackets/bracket');

  BracketView = require('views/bracket-editor-view');

  mediator = require('mediator');

  module.exports = AdminsController = (function(_super) {

    __extends(AdminsController, _super);

    function AdminsController() {
      return AdminsController.__super__.constructor.apply(this, arguments);
    }

    AdminsController.prototype.index = function() {
      this.bracket = new Bracket();
      return this.bracketLoaded();
    };

    AdminsController.prototype.editBracket = function(routeVars) {
      var _this = this;
      this.bracket = new Bracket();
      this.bracketLoaded();
      return this.bracket.fetch({
        url: "http://test.ign.com:2121/brackets/v6/api/" + routeVars.slug,
        success: function(data) {
          return _this.bracketView.render();
        }
      });
    };

    AdminsController.prototype.bracketLoaded = function() {
      this.tools = new Tools();
      this.workspaceView = new AdminWorkspaceView({
        collection: this.tools,
        model: this.bracket
      });
      return this.bracketView = new BracketView({
        model: this.bracket
      });
    };

    return AdminsController;

  })(Controller);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/header-controller", function(exports, require, module) {
  var Controller, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView();
    };

    return HeaderController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var mediator;

  mediator = require('mediator');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/admin-tools", function(exports, require, module) {
  var AdminTools, Model, SingleElimWizard,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  SingleElimWizard = require('models/single-elim-wizard');

  module.exports = AdminTools = (function(_super) {

    __extends(AdminTools, _super);

    function AdminTools() {
      return AdminTools.__super__.constructor.apply(this, arguments);
    }

    AdminTools.prototype.initialize = function() {
      return this.set('wizard', new SingleElimWizard());
    };

    return AdminTools;

  })(Model);
  
});
window.require.register("models/admin-workspace", function(exports, require, module) {
  var AdminWorkspace, Bracket, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Bracket = require('models/brackets/bracket');

  module.exports = AdminWorkspace = (function(_super) {

    __extends(AdminWorkspace, _super);

    function AdminWorkspace() {
      return AdminWorkspace.__super__.constructor.apply(this, arguments);
    }

    AdminWorkspace.prototype.initialize = function() {};

    return AdminWorkspace;

  })(Model);
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("models/brackets/bracket", function(exports, require, module) {
  var Bracket, GroupStages, Matches, Model, Teams,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matches = require('collections/brackets/matches');

  Teams = require('collections/brackets/teams');

  GroupStages = require('collections/brackets/group-stages');

  module.exports = Bracket = (function(_super) {

    __extends(Bracket, _super);

    function Bracket() {
      this.parse = __bind(this.parse, this);
      return Bracket.__super__.constructor.apply(this, arguments);
    }

    Bracket.prototype.defaults = function() {
      return {
        userId: null,
        sessionId: null,
        title: "Your Title",
        slug: "some-slug",
        kind: "ipl6",
        labels: [],
        matches: new Matches(),
        groups: new GroupStages(),
        teams: new Teams()
      };
    };

    Bracket.prototype.initialize = function(options) {
      return Bracket.__super__.initialize.call(this, options);
    };

    Bracket.prototype.parse = function(data) {
      var matches;
      this.get('teams').update(data.teams);
      data.teams = this.get('teams');
      matches = this.get('matches');
      matches.update(data.matches, {
        parse: true
      });
      data.groups = this.get('groups');
      data.matches = matches;
      return data;
    };

    return Bracket;

  })(Model);
  
});
window.require.register("models/brackets/event", function(exports, require, module) {
  var Event, Matchup, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matchup = require('models/brackets/matchup');

  module.exports = Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      this.autoTitle = __bind(this.autoTitle, this);

      this.toJSON = __bind(this.toJSON, this);
      return Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.defaults = function() {
      return {
        title: "TBD vs. TBD",
        stream: {
          name: "SC2 1",
          id: "5088c239f767afac6e000001"
        },
        starts_at: moment().add('days', 10).format("MM/DD/YYYY hh:mm aZ"),
        ends_at: moment().add('days', 10).add('hours', 1).format("MM-DD-YYYYTHH:mm:ssZ"),
        rebroadcast: false,
        matchup: new Matchup(),
        groups: []
      };
    };

    Event.prototype.toJSON = function() {
      var attr;
      attr = _.clone(this.attributes);
      attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm a").format("MM-DD-YYYYTHH:mm:ssZ");
      return attr;
    };

    Event.prototype.parse = function(data) {
      data.matchup = this.get('matchup').parse(data.matchup);
      data.starts_at = moment(data.starts_at, "MM-DD-YYYYTHH:mm:ssZ").format("MM/DD/YYYY hh:mm aZ");
      return this;
    };

    Event.prototype.autoTitle = function() {
      var i, teams;
      teams = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i < 2; i = ++_i) {
          if (this.get('matchup').get('teams')[i] != null) {
            _results.push(this.get('matchup').get('teams')[i].get('name'));
          } else {
            _results.push("TBD");
          }
        }
        return _results;
      }).call(this);
      return this.set('title', teams.join(" vs. "));
    };

    return Event;

  })(Model);
  
});
window.require.register("models/brackets/game", function(exports, require, module) {
  var Game, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.defaults = function() {
      return {
        number: 0,
        status: "ready"
      };
    };

    Game.prototype.endWithWinner = function(team) {
      this.set('winner', {
        id: team.id,
        name: team.get('name')
      });
      return this.set('status', 'done');
    };

    Game.prototype.start = function() {
      return this.set('status', 'active');
    };

    return Game;

  })(Model);
  
});
window.require.register("models/brackets/group-stage", function(exports, require, module) {
  var GroupStage, Matches, Model, Teams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matches = require('collections/brackets/matches');

  Teams = require('collections/brackets/teams');

  module.exports = GroupStage = (function(_super) {

    __extends(GroupStage, _super);

    function GroupStage() {
      return GroupStage.__super__.constructor.apply(this, arguments);
    }

    GroupStage.prototype.defaults = function() {
      return {
        title: "Group",
        teams: new Teams(),
        matches: new Matches(),
        teamWL: {},
        advanceTo: [],
        finished: false,
        transform2d: {
          x: 0,
          y: 0,
          paddingX: 0,
          paddingY: 0
        }
      };
    };

    return GroupStage;

  })(Model);
  
});
window.require.register("models/brackets/match-team", function(exports, require, module) {
  var MatchTeam, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = MatchTeam = (function(_super) {

    __extends(MatchTeam, _super);

    function MatchTeam() {
      return MatchTeam.__super__.constructor.apply(this, arguments);
    }

    MatchTeam.prototype.defaults = function() {
      return {
        name: "TBD",
        points: 0,
        seed: 0
      };
    };

    MatchTeam.prototype.initialize = function(options) {
      MatchTeam.__super__.initialize.call(this, options);
      return this.set('points', 0);
    };

    return MatchTeam;

  })(Model);
  
});
window.require.register("models/brackets/match", function(exports, require, module) {
  var Event, Match, MatchTeam, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Event = require('models/brackets/event');

  MatchTeam = require('models/brackets/match-team');

  module.exports = Match = (function(_super) {

    __extends(Match, _super);

    function Match() {
      this.games = __bind(this.games, this);

      this.event = __bind(this.event, this);

      this.matchup = __bind(this.matchup, this);

      this.team = __bind(this.team, this);

      this.teams = __bind(this.teams, this);

      this.isLoser = __bind(this.isLoser, this);

      this.advance = __bind(this.advance, this);

      this.toJSON = __bind(this.toJSON, this);
      return Match.__super__.constructor.apply(this, arguments);
    }

    Match.prototype.defaults = function() {
      return {
        parent: null,
        children: [],
        loserDropsTo: null,
        hasLoserSlot: false,
        event: new Event(),
        transform2d: {
          x: 0,
          y: 0,
          paddingX: 0,
          paddingY: 0
        }
      };
    };

    Match.prototype.initialize = function(options) {
      return Match.__super__.initialize.call(this, options);
    };

    Match.prototype.parse = function(data) {
      data.event = this.get('event').parse(data.event);
      return data;
    };

    Match.prototype.toJSON = function() {
      var attr, i;
      attr = _.clone(this.attributes);
      attr.id = "mid" + _.indexOf(this.collection.models, this);
      attr.parent = attr.parent != null ? _.indexOf(this.collection.models, attr.parent) : null;
      attr.children = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = attr.children.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (attr.children[i] != null) {
            _results.push(_.indexOf(this.collection.models, attr.children[i]));
          } else {
            _results.push(null);
          }
        }
        return _results;
      }).call(this);
      if (attr.loserDropsTo != null) {
        attr.loserDropsTo.match = _.indexOf(this.collection.models, attr.loserDropsTo.match);
      } else {
        attr.loserDropsTo = null;
      }
      this.set('id', attr.id);
      return attr;
    };

    Match.prototype.advance = function(team) {
      var loser, loserMatch, parent;
      parent = this.get('parent');
      if (parent != null) {
        parent.team(parent.whichSlot(this), new MatchTeam(team.attributes));
      }
      loserMatch = this.get('loserDropsTo');
      if (loserMatch != null) {
        loser = this.teams()[0].get('name') === team.get('name') ? this.teams()[1] : this.teams()[0];
        return loserMatch.match.team(loserMatch.slot, new MatchTeam(loser.attributes));
      }
    };

    Match.prototype.whichSlot = function(childMatch) {
      if (!_.contains(this.get('children'), childMatch)) {
        return 0;
      }
      if (this.get('hasLoserSlot')) {
        return 1;
      }
      return _.indexOf(this.get('children'), childMatch);
    };

    Match.prototype.isLoser = function() {
      if (this.get('hasLoserSlot')) {
        return true;
      } else {
        return false;
      }
    };

    Match.prototype.teams = function(teamSet) {
      if (teamSet != null) {
        this.get('event').get('matchup').set('teams', teamSet);
      }
      return this.get('event').get('matchup').get('teams');
    };

    Match.prototype.team = function(at, team) {
      if (team == null) {
        team = null;
      }
      if (team != null) {
        this.teams()[at] = team;
        this.matchup().trigger('change:teams');
      }
      return this.teams()[at];
    };

    Match.prototype.matchup = function() {
      return this.get('event').get('matchup');
    };

    Match.prototype.event = function() {
      return this.get('event');
    };

    Match.prototype.games = function() {
      return this.matchup().get('games');
    };

    return Match;

  })(Model);
  
});
window.require.register("models/brackets/matchup", function(exports, require, module) {
  var Game, Games, MatchTeam, Matchup, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Game = require('models/brackets/game');

  Games = require('collections/brackets/games');

  MatchTeam = require('models/brackets/match-team');

  module.exports = Matchup = (function(_super) {

    __extends(Matchup, _super);

    function Matchup() {
      this.pointFor = __bind(this.pointFor, this);

      this.updateGamesCount = __bind(this.updateGamesCount, this);
      return Matchup.__super__.constructor.apply(this, arguments);
    }

    Matchup.prototype.defaults = function() {
      return {
        teams: [],
        games: new Games(),
        best_of: 3
      };
    };

    Matchup.prototype.initialize = function(options) {
      var _this = this;
      Matchup.__super__.initialize.call(this, options);
      this.updateGamesCount();
      return this.on('change:best_of', function() {
        return _this.updateGamesCount();
      });
    };

    Matchup.prototype.parse = function(data) {
      var i, matchTeams, nTeams, team;
      nTeams = (function() {
        var _ref, _results;
        _ref = data.teams;
        _results = [];
        for (i in _ref) {
          team = _ref[i];
          matchTeams = this.get('teams');
          if (matchTeams[i] != null) {
            _results.push(matchTeams[i].set(team));
          } else {
            matchTeams[i] = new MatchTeam(team);
            _results.push(matchTeams[i].set('points', team.points));
          }
        }
        return _results;
      }).call(this);
      data.games = this.get('games').update(data.games, {
        parse: true
      });
      return this;
    };

    Matchup.prototype.updateGamesCount = function() {
      var bestOf, games, i;
      bestOf = this.get('best_of');
      games = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= bestOf ? _i < bestOf : _i > bestOf; i = 0 <= bestOf ? ++_i : --_i) {
          _results.push(new Game({
            number: i + 1
          }));
        }
        return _results;
      })();
      return this.get('games').reset(games);
    };

    Matchup.prototype.pointFor = function(teamName) {
      var team, _i, _len, _ref;
      _ref = this.get('teams');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        team = _ref[_i];
        if (!(team.get('name') === teamName)) {
          continue;
        }
        team.set('points', team.get('points') + 1);
        if (team.get('points') > this.get('best_of') / 2) {
          return {
            winner: team,
            matchDecided: true
          };
        } else {
          return {
            winner: team,
            matchDecided: false
          };
        }
      }
    };

    return Matchup;

  })(Model);
  
});
window.require.register("models/brackets/stream", function(exports, require, module) {
  var Model, Stream,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Stream = (function(_super) {

    __extends(Stream, _super);

    function Stream() {
      return Stream.__super__.constructor.apply(this, arguments);
    }

    return Stream;

  })(Model);
  
});
window.require.register("models/brackets/team", function(exports, require, module) {
  var Model, Team,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Team = (function(_super) {

    __extends(Team, _super);

    function Team() {
      return Team.__super__.constructor.apply(this, arguments);
    }

    Team.prototype.defaults = function() {
      return {
        name: "TBD",
        image_url: ""
      };
    };

    return Team;

  })(Model);
  
});
window.require.register("models/double-elim-generator", function(exports, require, module) {
  var Advance, DoubleElimGenerator, FlattenTree, Huffman, Match, MatchFromParent, Model, RootFinder, Rounds,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Match = require('models/brackets/match');

  Huffman = require('utility/huffman-code');

  MatchFromParent = require('utility/match-from-parent');

  RootFinder = require('utility/brackets/root-finder');

  Rounds = require('utility/brackets/rounds-from-match-list');

  FlattenTree = require('utility/brackets/flatten-tree');

  Advance = require('utility/auto-advance');

  module.exports = DoubleElimGenerator = (function(_super) {

    __extends(DoubleElimGenerator, _super);

    function DoubleElimGenerator() {
      this.generate = __bind(this.generate, this);
      return DoubleElimGenerator.__super__.constructor.apply(this, arguments);
    }

    DoubleElimGenerator.prototype.generate = function(numPlayers, winnersMatches) {
      var flat, i, j, loserRounds, lr, m, match, properPlayers, root, teams, winnerRounds, _i, _j, _k, _ref, _ref1, _ref2;
      properPlayers = Math.pow(2, Math.ceil(Math.log(numPlayers) / Math.log(2)));
      winnerRounds = Math.log(properPlayers) / Math.log(2);
      root = RootFinder.find(winnersMatches);
      loserRounds = [];
      loserRounds[0] = [];
      loserRounds[0][0] = new Match({
        hasLoserSlot: true
      });
      loserRounds[0][0].teams([Huffman.followString(Huffman.losersInRound(1, properPlayers)[0], root)]);
      for (i = _i = 1; 1 <= winnerRounds ? _i < winnerRounds : _i > winnerRounds; i = 1 <= winnerRounds ? ++_i : --_i) {
        lr = Huffman.losersInRound(i + 1, properPlayers);
        if (loserRounds[i] == null) {
          loserRounds[i] = [];
        }
        if (i < winnerRounds - 1) {
          for (j in lr) {
            m = lr[j];
            loserRounds[i].push(MatchFromParent.make(loserRounds[i - 1][parseInt(parseInt(j) / 2)], {
              hasLoserSlot: true
            }));
            teams = [Huffman.followString(m, root)];
            loserRounds[i][j].teams(teams);
          }
        } else {
          for (j in lr) {
            m = lr[j];
            if (!(parseInt(j) % 2 === 0)) {
              continue;
            }
            match = parseInt(j);
            loserRounds[i].push(MatchFromParent.make(loserRounds[i - 1][match / 2], {
              hasLoserSlot: true
            }));
            loserRounds[i][match / 2].teams([Huffman.followString(lr[match + 1], root), Huffman.followString(lr[match], root)]);
          }
        }
      }
      for (i = _j = 0, _ref = loserRounds.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        if (((_ref1 = loserRounds[i + 1]) != null ? _ref1.length : void 0) > loserRounds[i].length) {
          for (j = _k = 0, _ref2 = loserRounds[i].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
            MatchFromParent.insert(loserRounds[i][j]);
          }
        }
      }
      flat = FlattenTree.flatten(loserRounds[0][0]);
      loserRounds = Rounds.convert(loserRounds[0][0]);
      this.advanceAll(loserRounds);
      this.setupLoserDrops(winnersMatches, loserRounds);
      return flat;
    };

    DoubleElimGenerator.prototype.advanceAll = function(loserRounds) {
      var i, j, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = loserRounds.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (j = _j = 0, _ref1 = loserRounds[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(Advance.on(loserRounds[i][j], 'seed'));
          }
          return _results1;
        })());
      }
      return _results;
    };

    DoubleElimGenerator.prototype.setupLoserDrops = function(winnersMatches, loserRounds) {
      var lSeed, match, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = winnersMatches.length; _i < _len; _i++) {
        match = winnersMatches[_i];
        lSeed = match.team(1).get('seed');
        _results.push(match.set('loserDropsTo', this.findFirst(lSeed, loserRounds)));
      }
      return _results;
    };

    DoubleElimGenerator.prototype.findFirst = function(seed, loserRounds) {
      var i, j, teams, _i, _j, _ref, _ref1;
      for (i = _i = 0, _ref = loserRounds.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = loserRounds[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          teams = loserRounds[i][j].teams();
          if (_.find(teams, function(team) {
            return team.get('seed') === seed;
          }) != null) {
            return {
              match: loserRounds[i][j],
              slot: teams[0].get('seed') === seed ? 0 : 1
            };
          }
        }
      }
    };

    return DoubleElimGenerator;

  })(Model);
  
});
window.require.register("models/group-generator", function(exports, require, module) {
  var GroupGenerator, GroupStage, Matches, Model, Teams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  GroupStage = require('models/brackets/group-stage');

  Teams = require('collections/brackets/teams');

  Matches = require('collections/brackets/matches');

  module.exports = GroupGenerator = (function(_super) {

    __extends(GroupGenerator, _super);

    function GroupGenerator() {
      return GroupGenerator.__super__.constructor.apply(this, arguments);
    }

    GroupGenerator.prototype.newGroup = function(options) {
      var i, matchCol, teamsCol, _i, _j, _ref, _ref1;
      teamsCol = new Teams();
      matchCol = new Matches();
      if (options.numTeams != null) {
        for (i = _i = 0, _ref = parseInt(options.numTeams); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          teamsCol.add({
            name: "Team X" + (i + 1),
            seed: i + 1
          });
        }
      }
      if (options.numMatches != null) {
        for (i = _j = 0, _ref1 = parseInt(options.numMatches); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          matchCol.add({
            bestOf: 1
          });
        }
      }
      options.teams = teamsCol;
      options.matches = matchCol;
      return new GroupStage(_.omit(options, "numTeams", "numMatches"));
    };

    return GroupGenerator;

  })(Model);
  
});
window.require.register("models/match-mutator", function(exports, require, module) {
  var Match, MatchMutator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Match = require('models/brackets/match');

  module.exports = MatchMutator = (function(_super) {

    __extends(MatchMutator, _super);

    function MatchMutator() {
      this.advance = __bind(this.advance, this);
      return MatchMutator.__super__.constructor.apply(this, arguments);
    }

    MatchMutator.prototype.initialize = function() {
      MatchMutator.__super__.initialize.apply(this, arguments);
      this.on('change', this.showChanges);
      this.selected = [];
      return this.ignore = ["transform2d", "parent", "children"];
    };

    MatchMutator.prototype.advance = function(team) {
      return _.first(this.selected).advance(team);
    };

    MatchMutator.prototype.showChanges = function() {
      var key, m, v, _i, _len, _ref, _results;
      _ref = this.selected;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = _.omit(this.changed, this.ignore);
          _results1 = [];
          for (key in _ref1) {
            v = _ref1[key];
            _results1.push(m.set(key, _.clone(this.get(key))));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    MatchMutator.prototype.newAttrs = function() {
      this.stopListening();
      this.listenTo(this.get('event'), 'change', this.eventChange);
      return this.listenTo(this.matchup(), 'change', this.matchupChange);
    };

    MatchMutator.prototype.matchupChange = function() {
      var key, m, v, _i, _len, _ref, _results;
      _ref = _.tail(this.selected);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = _.omit(this.matchup().changed, this.ignore);
          _results1 = [];
          for (key in _ref1) {
            v = _ref1[key];
            _results1.push(m.matchup().set(key, _.clone(this.matchup().get(key))));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    MatchMutator.prototype.eventChange = function() {
      var key, m, v, _i, _len, _ref, _results;
      _ref = _.tail(this.selected);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = _.omit(this.get('event').changed, this.ignore);
          _results1 = [];
          for (key in _ref1) {
            v = _ref1[key];
            _results1.push(m.get('event').set(key, _.clone(this.get('event').get(key))));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return MatchMutator;

  })(Match);
  
});
window.require.register("models/single-elim-wizard", function(exports, require, module) {
  var Bracket, Match, MatchTeam, Model, SingleElimWizard,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Bracket = require('models/brackets/bracket');

  Match = require('models/brackets/match');

  MatchTeam = require('models/brackets/match-team');

  module.exports = SingleElimWizard = (function(_super) {

    __extends(SingleElimWizard, _super);

    function SingleElimWizard() {
      this.makeMatches = __bind(this.makeMatches, this);

      this.makeTeams = __bind(this.makeTeams, this);

      this.generate = __bind(this.generate, this);
      return SingleElimWizard.__super__.constructor.apply(this, arguments);
    }

    SingleElimWizard.prototype.defaults = {
      matchBuffer: [],
      numPlayers: 16,
      type: "single-elim"
    };

    SingleElimWizard.prototype.generate = function() {
      var numRounds, properPlayers, seedMatch;
      this.set('matchBuffer', []);
      properPlayers = Math.pow(2, Math.ceil(Math.log(this.get('numPlayers')) / Math.log(2)));
      numRounds = Math.ceil(Math.log(this.get('numPlayers')) / Math.log(2));
      seedMatch = new Match();
      seedMatch.teams([
        new MatchTeam({
          seed: 1
        }), new MatchTeam({
          seed: 2
        })
      ]);
      this.get('matchBuffer').push(seedMatch);
      this.makeMatches(seedMatch, 0, numRounds - 1);
      _.each(this.get('matchBuffer'), function(match) {
        return _.each(match.teams(), function(team) {
          return team.set('name', "");
        });
      });
      return this.get('matchBuffer');
    };

    SingleElimWizard.prototype.makeTeams = function() {
      var i, teams, _i, _ref, _results;
      teams = [];
      _results = [];
      for (i = _i = 0, _ref = this.get('numPlayers'); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(teams[i] = new MatchTeam({
          seed: i + 1,
          name: (i + 1) + " TBD",
          id: "tid" + i
        }));
      }
      return _results;
    };

    SingleElimWizard.prototype.makeMatches = function(thisMatch, depth, maxDepth) {
      var children, i, matchBuffer, thisTeams, _i, _ref;
      matchBuffer = this.get('matchBuffer');
      thisTeams = thisMatch.teams();
      children = [];
      for (i = _i = 0, _ref = thisTeams.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (depth < maxDepth) {
          children[i] = new Match({
            parent: thisMatch
          });
          children[i].teams([
            new MatchTeam({
              seed: thisTeams[i].get('seed')
            }), new MatchTeam({
              seed: (Math.pow(2, depth) * 4) - (thisTeams[i].get('seed') - 1)
            })
          ]);
          matchBuffer.push(children[i]);
          this.makeMatches(children[i], depth + 1, maxDepth);
        }
      }
      return thisMatch.set('children', children);
    };

    return SingleElimWizard;

  })(Model);
  
});
window.require.register("models/team-auto-seeder", function(exports, require, module) {
  var Model, RootFinder, RoundsFromMatchList, TeamAutoSeeder, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  RoundsFromMatchList = require('utility/brackets/rounds-from-match-list');

  RootFinder = require('utility/brackets/root-finder');

  mediator = require('mediator');

  module.exports = TeamAutoSeeder = (function(_super) {

    __extends(TeamAutoSeeder, _super);

    function TeamAutoSeeder() {
      this.updateTeams = __bind(this.updateTeams, this);

      this.seedDive = __bind(this.seedDive, this);

      this.updateSeedMatches = __bind(this.updateSeedMatches, this);
      return TeamAutoSeeder.__super__.constructor.apply(this, arguments);
    }

    TeamAutoSeeder.prototype.defaults = {
      bracket: null,
      seedMatches: null,
      enabled: true
    };

    TeamAutoSeeder.prototype.initialize = function(options) {
      TeamAutoSeeder.__super__.initialize.apply(this, arguments);
      this.set('bracket', options.bracket);
      this.get('bracket').get('teams').comparator = function(team) {
        return team.get('seed');
      };
      this.listenTo(this.get('bracket').get('matches'), 'reset', function() {
        return this.updateSeedMatches();
      });
      this.listenTo(this.get('bracket').get('teams'), 'sort', function() {
        return this.updateTeams();
      });
      this.listenTo(this.get('bracket').get('teams'), 'reset', function() {
        return this.updateTeams();
      });
      return mediator.subscribe('groupAdded', function() {
        return true;
      });
    };

    TeamAutoSeeder.prototype.updateSeedMatches = function() {
      var matches, root, seedMatches;
      matches = this.get('bracket').get('matches');
      root = RootFinder.find(matches.models);
      seedMatches = this.seedDive(root);
      return this.set('seedMatches', seedMatches);
    };

    TeamAutoSeeder.prototype.seedDive = function(root, seedMatches) {
      var child, i, team, teams, _i, _len, _ref;
      if (seedMatches == null) {
        seedMatches = [];
      }
      teams = root.teams();
      for (i in teams) {
        team = teams[i];
        seedMatches[team.get('seed')] = {
          match: root,
          slot: i
        };
      }
      _ref = root.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (!child.isLoser()) {
          this.seedDive(child, seedMatches);
        }
      }
      return seedMatches;
    };

    TeamAutoSeeder.prototype.updateTeams = function() {
      var i, seedMatches, team, teams, _ref, _results;
      if (this.get('enabled')) {
        teams = this.get('bracket').get('teams');
        seedMatches = this.get('seedMatches');
        _ref = teams.models;
        _results = [];
        for (i in _ref) {
          team = _ref[i];
          teams = _.clone(seedMatches[parseInt(i) + 1].match.teams());
          teams[seedMatches[parseInt(i) + 1].slot] = team;
          seedMatches[parseInt(i) + 1].match.matchup().set('teams', teams);
          _results.push(seedMatches[parseInt(i) + 1].match.event().autoTitle());
        }
        return _results;
      }
    };

    return TeamAutoSeeder;

  })(Model);
  
});
window.require.register("models/tool", function(exports, require, module) {
  var Model, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Tool = (function(_super) {

    __extends(Tool, _super);

    function Tool() {
      return Tool.__super__.constructor.apply(this, arguments);
    }

    Tool.prototype.defaults = {
      label: null,
      slug: "tool",
      menu: null,
      logic: null
    };

    Tool.prototype.initialize = function() {
      Tool.__super__.initialize.apply(this, arguments);
      if (this.has('menu')) {
        return this.get('menu').model = this.get('logic');
      }
    };

    return Tool;

  })(Model);
  
});
window.require.register("routes", function(exports, require, module) {
  
  module.exports = function(match) {
    match('brackets/v6/admin', 'admin#index');
    match('brackets/v6/admin/', 'admin#index');
    return match('brackets/v6/admin/edit/:slug', 'admin#editBracket');
  };
  
});
window.require.register("utility/auto-advance", function(exports, require, module) {
  var AutoAdvance, Match, MatchTeam;

  Match = require('models/brackets/match');

  MatchTeam = require('models/brackets/match-team');

  module.exports = AutoAdvance = (function() {

    function AutoAdvance() {}

    AutoAdvance.on = function(match, attr) {
      var parent, slot, winner;
      parent = match.get('parent');
      if (parent == null) {
        return null;
      }
      slot = parent.whichSlot(match);
      winner = _.min(match.teams(), function(team) {
        return team.get(attr);
      });
      return parent.team(slot, new MatchTeam(winner.attributes));
    };

    AutoAdvance.team = function(team) {
      var parent;
      parent = match.get('parent');
      if (parent == null) {
        return null;
      }
    };

    return AutoAdvance;

  })();
  
});
window.require.register("utility/brackets/bracket-padding", function(exports, require, module) {
  var BracketPadding;

  module.exports = BracketPadding = (function() {

    function BracketPadding() {}

    BracketPadding.padding = {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    };

    BracketPadding.match = {
      width: 180,
      height: 44
    };

    BracketPadding.matches = null;

    BracketPadding.groups = null;

    BracketPadding.setBracket = function(bracket, $view) {
      this.$view = $view;
      this.matches = bracket.get('matches');
      this.groups = bracket.get('groups');
      return this;
    };

    BracketPadding.addPadding = function(options) {
      var k, v;
      if (this.matches == null) {
        return false;
      }
      for (k in options) {
        v = options[k];
        if (this.padding[k] != null) {
          this.padding[k] += parseInt(v);
        }
      }
      this.updateBounds();
      return this;
    };

    BracketPadding.setPadding = function(options) {
      var k, v;
      if (this.matches == null) {
        return false;
      }
      for (k in options) {
        v = options[k];
        if (this.padding[k] != null) {
          this.padding[k] = parseInt(v);
        }
      }
      this.updateBounds();
      return this;
    };

    BracketPadding.moveMatches = function(x, y) {
      var _this = this;
      if (y == null) {
        y = 0;
      }
      if (this.matches == null) {
        return false;
      }
      this.matches.each(function(match) {
        var t2d;
        t2d = _.clone(match.get('transform2d'));
        t2d.x += x;
        t2d.y += y;
        return match.set('transform2d', t2d);
      });
      this.updateBounds();
      return this;
    };

    BracketPadding.updateBounds = function() {
      var match, maxX, maxY, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      this.groups.each(function(group) {
        var t2d;
        t2d = _.clone(group.get('transform2d'));
        t2d.paddingX = _this.padding.left;
        t2d.paddingY = _this.padding.top;
        return group.set('transform2d', t2d);
      });
      this.matches.each(function(match) {
        var t2d;
        t2d = _.clone(match.get('transform2d'));
        t2d.paddingX = _this.padding.left;
        t2d.paddingY = _this.padding.top;
        return match.set('transform2d', t2d);
      });
      maxX = maxY = 0;
      _ref = this.matches.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        if (match.get('transform2d').x + match.get('transform2d').paddingX > maxX) {
          maxX = match.get('transform2d').x + match.get('transform2d').paddingX;
        }
      }
      _ref1 = this.matches.models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        match = _ref1[_j];
        if (match.get('transform2d').y + match.get('transform2d').paddingY > maxY) {
          maxY = match.get('transform2d').y + match.get('transform2d').paddingY;
        }
      }
      return this.$view.css({
        width: maxX + this.padding.right + this.match.width,
        height: maxY + this.padding.bottom
      });
    };

    return BracketPadding;

  })();
  
});
window.require.register("utility/brackets/flatten-tree", function(exports, require, module) {
  var FlattenTree;

  module.exports = FlattenTree = (function() {

    function FlattenTree() {}

    FlattenTree.flatten = function(root, buffer) {
      var child, _i, _len, _ref;
      if (buffer == null) {
        buffer = [];
      }
      buffer.push(root);
      _ref = root.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        this.flatten(child, buffer);
      }
      return buffer;
    };

    return FlattenTree;

  })();
  
});
window.require.register("utility/brackets/match-connector", function(exports, require, module) {
  var MatchConnector;

  module.exports = MatchConnector = (function() {

    function MatchConnector() {}

    MatchConnector.connect = function(root, matchViews) {
      var $el, child, childView, h, rootView, x, y, _i, _len, _ref;
      rootView = this.findView(root, matchViews);
      $el = $('<div class="match-connector"></div>');
      y = x = Math.min(Infinity);
      h = 0;
      _ref = root.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        childView = this.findView(child, matchViews);
        if (childView != null) {
          y = Math.min(childView.$el.position().top, y);
          x = Math.min(childView.$el.position().left + childView.$el.outerWidth(), x);
          h = Math.max(childView.$el.position().top, h);
        }
        true;
      }
      if (h - y > 0) {
        $el.css({
          top: y + rootView.$el.outerHeight() / 2,
          left: x,
          width: rootView.$el.position().left - x,
          height: h - y
        });
        $('<div class="top-bracket">').appendTo($el);
        $('<div class="top-line">').appendTo($el);
        $('<div class="bottom-bracket">').appendTo($el);
        $('<div class="bottom-line">').appendTo($el);
      } else {
        $el.css({
          top: rootView.$el.position().top,
          left: x,
          width: rootView.$el.position().left - x,
          height: rootView.$el.outerHeight()
        });
        $('<div class="top-line full-width">').appendTo($el);
        $('<div class="bottom-line full-width">').appendTo($el);
      }
      return $el;
    };

    MatchConnector.findView = function(root, matchViews) {
      return _.find(matchViews, function(mV) {
        if (mV.model === root) {
          return true;
        } else {
          return false;
        }
      });
    };

    return MatchConnector;

  })();
  
});
window.require.register("utility/brackets/match-pruner", function(exports, require, module) {
  var MatchPruner;

  module.exports = MatchPruner = (function() {

    function MatchPruner() {}

    MatchPruner.prune = function(matches, seedLimit) {
      var m, noOver, parent, t, validMatches, _i, _j, _len, _len1, _ref;
      validMatches = [];
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        m = matches[_i];
        noOver = true;
        _ref = m.teams();
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          t = _ref[_j];
          if (parseInt(t.get('seed')) > seedLimit) {
            noOver = false;
          }
        }
        if (noOver) {
          validMatches.push(m);
        } else {
          parent = m.get('parent');
          parent.set('children', _.filter(parent.get('children'), function(child) {
            return child !== m;
          }));
        }
      }
      return validMatches;
    };

    return MatchPruner;

  })();
  
});
window.require.register("utility/brackets/root-finder", function(exports, require, module) {
  var RootFinder;

  module.exports = RootFinder = (function() {

    function RootFinder() {}

    RootFinder.find = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match;
        }
      }
    };

    RootFinder.findLoserRoot = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match.get('children')[1];
        }
      }
    };

    RootFinder.findWinnerRoot = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match.get('children')[0];
        }
      }
    };

    return RootFinder;

  }).call(this);
  
});
window.require.register("utility/brackets/rounds-from-match-list", function(exports, require, module) {
  var RoundsFromMatchList;

  module.exports = RoundsFromMatchList = (function() {

    function RoundsFromMatchList() {}

    RoundsFromMatchList.convert = function(root) {
      var rnds;
      rnds = [];
      if (root != null) {
        RoundsFromMatchList.rec(root, 0, rnds);
      }
      return rnds.reverse();
    };

    RoundsFromMatchList.rec = function(ti, depth, buffer) {
      var i, _i, _ref, _results;
      if (buffer[depth] == null) {
        buffer[depth] = [];
      }
      buffer[depth].push(ti);
      _results = [];
      for (i = _i = 0, _ref = ti.get('children').length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (ti.get('children')[i] != null) {
          _results.push(RoundsFromMatchList.rec(ti.get('children')[i], depth + 1, buffer));
        }
      }
      return _results;
    };

    return RoundsFromMatchList;

  }).call(this);
  
});
window.require.register("utility/brackets/tree-view-formatter", function(exports, require, module) {
  var RootFinder, Rounds, TreeViewFormatter;

  RootFinder = require('utility/brackets/root-finder');

  Rounds = require('utility/brackets/rounds-from-match-list');

  module.exports = TreeViewFormatter = (function() {

    function TreeViewFormatter() {}

    TreeViewFormatter.format = function(root, xSpacing, ySpacing) {
      var lMax, loserHead, loserRounds, rounds, t2d, wMax, winnerHead, winnerRounds, winnerSpacing;
      loserHead = root.get('children')[1];
      winnerHead = root.get('children')[0];
      if (root.get('children')[1].get('hasLoserSlot')) {
        loserRounds = Rounds.convert(loserHead);
        winnerRounds = Rounds.convert(winnerHead);
        lMax = this.singleTree(loserRounds, xSpacing, ySpacing);
        winnerSpacing = lMax.x / (winnerRounds.length - 1);
        wMax = this.singleTree(winnerRounds, winnerSpacing, ySpacing);
        this.addOffset(loserHead, 0, wMax.y + ySpacing + 20);
        t2d = _.clone(root.get('transform2d'));
        t2d.x = wMax.x + winnerSpacing;
        t2d.y = this.between(winnerHead, loserHead);
        return root.set('transform2d', t2d);
      } else {
        rounds = Rounds.convert(root);
        return this.singleTree(rounds, xSpacing, ySpacing);
      }
    };

    TreeViewFormatter.singleTree = function(rounds, xSpacing, ySpacing) {
      var a, i, j, max, startRound, t2d, _i, _j, _k, _l, _len, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      startRound = 0;
      max = {
        x: 0,
        y: 0
      };
      for (i = _i = 0, _ref = rounds.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (rounds[i].length > rounds[startRound].length) {
          startRound = i;
        }
      }
      for (i = _j = startRound, _ref1 = rounds.length; startRound <= _ref1 ? _j < _ref1 : _j > _ref1; i = startRound <= _ref1 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = rounds[i].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          t2d = {
            x: i * xSpacing,
            y: 0
          };
          if (i === startRound) {
            t2d.y = j * ySpacing;
          } else if (((_ref3 = rounds[i][j].get('children')) != null ? _ref3.length : void 0) > 0) {
            _ref4 = rounds[i][j].get('children');
            for (_l = 0, _len = _ref4.length; _l < _len; _l++) {
              a = _ref4[_l];
              if (a != null) {
                t2d.y += a.get('transform2d').y;
              }
            }
            t2d.y /= rounds[i][j].get('children').length;
          }
          rounds[i][j].set('transform2d', t2d);
          max.x = Math.max(t2d.x, max.x);
          max.y = Math.max(t2d.y, max.y);
        }
      }
      for (i = _m = startRound; startRound <= 0 ? _m < 0 : _m > 0; i = startRound <= 0 ? ++_m : --_m) {
        for (j = _n = 0, _ref5 = rounds[i - 1].length; 0 <= _ref5 ? _n < _ref5 : _n > _ref5; j = 0 <= _ref5 ? ++_n : --_n) {
          t2d = {
            x: (i - 1) * xSpacing,
            y: rounds[i - 1][j].get('parent').get('transform2d').y
          };
          rounds[i - 1][j].set('transform2d', t2d);
        }
      }
      return max;
    };

    TreeViewFormatter.between = function(leftHead, rightHead) {
      var half;
      return half = (leftHead.get('transform2d').y + rightHead.get('transform2d').y) / 2;
    };

    TreeViewFormatter.addOffset = function(root, xOff, yOff) {
      var child, t2d, _i, _len, _ref, _results;
      if (xOff == null) {
        xOff = 0;
      }
      if (yOff == null) {
        yOff = 0;
      }
      t2d = _.clone(root.get('transform2d'));
      t2d.x += xOff;
      t2d.y += yOff;
      root.set('transform2d', t2d);
      _ref = root.get('children');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(TreeViewFormatter.addOffset(child, xOff, yOff));
      }
      return _results;
    };

    return TreeViewFormatter;

  }).call(this);
  
});
window.require.register("utility/fuse-trees", function(exports, require, module) {
  var FuseTree, Match, MatchTeam;

  Match = require('models/brackets/match');

  MatchTeam = require('models/brackets/match-team');

  module.exports = FuseTree = (function() {

    function FuseTree() {}

    FuseTree.fuse = function(leftRoot, rightRoot) {
      var newHead;
      newHead = new Match({
        children: [leftRoot, rightRoot]
      });
      newHead.teams([
        new MatchTeam({
          name: '',
          seed: 1
        }), new MatchTeam({
          name: '',
          seed: 2
        })
      ]);
      leftRoot.set('parent', newHead);
      rightRoot.set('parent', newHead);
      return newHead;
    };

    return FuseTree;

  })();
  
});
window.require.register("utility/huffman-code", function(exports, require, module) {
  var HuffmanCode;

  module.exports = HuffmanCode = (function() {

    function HuffmanCode() {}

    HuffmanCode.losersInRound = function(round, players) {
      var lTree;
      lTree = HuffmanCode.createLookup(round);
      if (round % 2 === 0) {
        lTree.children.reverse();
      }
      if (players > 32 && round >= 5) {
        _.map(lTree.children, function(child) {
          return child.children.reverse();
        });
      }
      return HuffmanCode.flattenTree(lTree, round);
    };

    HuffmanCode.createLookup = function(depth, parentVal, addVal) {
      if (parentVal == null) {
        parentVal = "";
      }
      if (addVal == null) {
        addVal = "";
      }
      return {
        val: parentVal + addVal,
        children: depth - 1 === 0 ? [] : [this.createLookup(depth - 1, parentVal + addVal, 0), this.createLookup(depth - 1, parentVal + addVal, 1)]
      };
    };

    HuffmanCode.flattenTree = function(tree, maxDepth, buffer, depth) {
      var a, _i, _len, _ref;
      if (buffer == null) {
        buffer = [];
      }
      if (depth == null) {
        depth = 0;
      }
      if (depth === maxDepth || tree.children.length < 1) {
        buffer.push(tree.val);
      } else {
        _ref = tree.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          this.flattenTree(a, maxDepth, buffer, depth + 1);
        }
      }
      return buffer;
    };

    HuffmanCode.followString = function(str, match) {
      var nc;
      if (str.length > 0) {
        nc = parseInt(str.charAt(0));
        return HuffmanCode.followString(str.slice(1, str.length), match.get('children')[nc]);
      } else {
        return match.teams()[1];
      }
    };

    return HuffmanCode;

  }).call(this);
  
});
window.require.register("utility/int-to-alphabet", function(exports, require, module) {
  var IntToAlphabet;

  module.exports = IntToAlphabet = (function() {

    function IntToAlphabet() {}

    IntToAlphabet.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    IntToAlphabet.get = function(num) {
      var i, letterCount, ret, _i;
      num = parseInt(num);
      letterCount = Math.ceil(num / IntToAlphabet.alphabet.length);
      ret = "";
      for (i = _i = 0; 0 <= letterCount ? _i < letterCount : _i > letterCount; i = 0 <= letterCount ? ++_i : --_i) {
        ret += IntToAlphabet.alphabet.charAt(num - (IntToAlphabet.alphabet.length * i) - 1);
      }
      return ret;
    };

    return IntToAlphabet;

  }).call(this);
  
});
window.require.register("utility/match-from-parent", function(exports, require, module) {
  var Match, MatchFromParent;

  Match = require('models/brackets/match');

  module.exports = MatchFromParent = (function() {

    function MatchFromParent() {}

    MatchFromParent.make = function(parent, options) {
      var match;
      if (options == null) {
        options = {};
      }
      match = new Match(options);
      match.set('parent', parent);
      parent.get('children').push(match);
      return match;
    };

    MatchFromParent.insert = function(parent, options) {
      var child, match, _i, _len, _ref;
      if (options == null) {
        options = {};
      }
      match = new Match(options);
      match.set('parent', parent);
      match.set('children', parent.get('children'));
      _ref = match.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.set('parent', match);
      }
      parent.set('children', [match]);
      return match;
    };

    return MatchFromParent;

  }).call(this);
  
});
window.require.register("utility/select-default", function(exports, require, module) {
  var DefaultSelect;

  module.exports = DefaultSelect = (function() {

    function DefaultSelect() {}

    DefaultSelect.byLabel = function($el, name) {
      return $($el).each(function() {});
    };

    DefaultSelect.byValue = function($el, value) {};

    return DefaultSelect;

  }).call(this);
  
});
window.require.register("views/admin-toolbar-view", function(exports, require, module) {
  var AdminToolbarView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/admin-toolbar');

  module.exports = AdminToolbarView = (function(_super) {

    __extends(AdminToolbarView, _super);

    function AdminToolbarView() {
      this.openMenu = __bind(this.openMenu, this);
      return AdminToolbarView.__super__.constructor.apply(this, arguments);
    }

    AdminToolbarView.prototype.autoRender = true;

    AdminToolbarView.prototype.container = '#toolbar-container';

    AdminToolbarView.prototype.id = 'admin-toolbar';

    AdminToolbarView.prototype.template = template;

    AdminToolbarView.prototype.events = {
      "click .btn": function(ev) {
        return this.openMenu($(ev.currentTarget).attr('id'));
      }
    };

    AdminToolbarView.prototype.initialize = function() {
      AdminToolbarView.__super__.initialize.apply(this, arguments);
      this.$curMenu = null;
      return this.curSlug = "";
    };

    AdminToolbarView.prototype.render = function() {
      var a, buttons;
      AdminToolbarView.__super__.render.apply(this, arguments);
      buttons = (function() {
        var _i, _len, _ref, _results;
        _ref = this.collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          if (a.has('label')) {
            _results.push({
              label: a.get('label'),
              slug: a.get('slug')
            });
          }
        }
        return _results;
      }).call(this);
      return this.$el.html(this.template({
        btns: buttons
      }));
    };

    AdminToolbarView.prototype.openMenu = function(curBtnSlug) {
      var a, _i, _len, _ref, _ref1, _results;
      if (curBtnSlug !== this.curSlug) {
        _ref = this.collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          if (a.get('slug') === curBtnSlug) {
            if ((_ref1 = this.$curMenu) != null) {
              _ref1.fadeOut();
            }
            this.$curMenu = a.get('menu').$el;
            this.curSlug = curBtnSlug;
            a.get('menu').$el.fadeIn();
            this.$('.btn').removeClass('active');
            if (a.has('label')) {
              this.$('#' + a.get('slug')).addClass('active');
            }
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return AdminToolbarView;

  })(View);
  
});
window.require.register("views/admin-workspace-view", function(exports, require, module) {
  var AdminToolbarView, AdminWorkspaceView, GroupGenerator, GroupMenu, MatchMenu, MatchMutator, SingleElimWizard, TeamAutoSeeder, TeamMenuView, View, WizardMenuView, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/admin-workspace');

  AdminToolbarView = require('views/admin-toolbar-view');

  WizardMenuView = require('views/tool-menus/wizard-menu-view');

  SingleElimWizard = require('models/single-elim-wizard');

  TeamMenuView = require('views/tool-menus/team-menu-view');

  TeamAutoSeeder = require('models/team-auto-seeder');

  MatchMenu = require('views/tool-menus/match-menu-view');

  MatchMutator = require('models/match-mutator');

  GroupMenu = require('views/tool-menus/group-menu-view');

  GroupGenerator = require('models/group-generator');

  module.exports = AdminWorkspaceView = (function(_super) {

    __extends(AdminWorkspaceView, _super);

    function AdminWorkspaceView() {
      return AdminWorkspaceView.__super__.constructor.apply(this, arguments);
    }

    AdminWorkspaceView.prototype.autoRender = true;

    AdminWorkspaceView.prototype.className = 'workspace';

    AdminWorkspaceView.prototype.container = '#page-container';

    AdminWorkspaceView.prototype.template = template;

    AdminWorkspaceView.prototype.initialize = function(options) {
      var _this = this;
      AdminWorkspaceView.__super__.initialize.apply(this, arguments);
      this.collection.add({
        label: "Wizard",
        slug: "wizard-menu",
        logic: new SingleElimWizard(),
        menu: new WizardMenuView({
          bracket: this.model
        })
      });
      this.collection.add({
        label: "Teams",
        slug: "teams-menu",
        logic: new TeamAutoSeeder({
          bracket: this.model
        }),
        menu: new TeamMenuView({
          bracket: this.model
        })
      });
      this.collection.add({
        slug: "match-menu",
        logic: new MatchMutator(),
        menu: new MatchMenu({
          bracket: this.model
        })
      });
      this.collection.add({
        label: "Groups",
        slug: "groups-menu",
        logic: new GroupGenerator(),
        menu: new GroupMenu({
          bracket: this.model
        })
      });
      this.toolbar = new AdminToolbarView({
        collection: this.collection
      });
      return _.each(this.collection.models, function(tool) {
        return tool.get('menu').toolbar = _this.toolbar;
      });
    };

    AdminWorkspaceView.prototype.render = function() {
      var a, i, _ref;
      AdminWorkspaceView.__super__.render.apply(this, arguments);
      this.toolbar.$el.appendTo(this.$('#toolbar-container'));
      _ref = this.collection.models;
      for (i in _ref) {
        a = _ref[i];
        this.collection.models[i].get('menu').$el.appendTo(this.$('#menu-container')).hide();
      }
      this.toolbar.openMenu(this.collection.at(0).get('slug'));
      return this;
    };

    return AdminWorkspaceView;

  })(View);
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/bracket-editor-view", function(exports, require, module) {
  var BracketEditorView, BracketView, Collection, View, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Collection = require('models/base/collection');

  BracketView = require('views/brackets/bracket-view');

  mediator = require('mediator');

  module.exports = BracketEditorView = (function(_super) {

    __extends(BracketEditorView, _super);

    function BracketEditorView() {
      this.saveTitle = __bind(this.saveTitle, this);

      this.editTitle = __bind(this.editTitle, this);

      this.deselect = __bind(this.deselect, this);
      return BracketEditorView.__super__.constructor.apply(this, arguments);
    }

    BracketEditorView.prototype.initialize = function(options) {
      BracketEditorView.__super__.initialize.call(this, options);
      this.delegate('click', '.match', function(ev) {
        return this.clickMatch(ev);
      });
      this.delegate('click', '.hotzone', function() {
        return this.deselect();
      });
      this.delegate('click', '.bracket-title', function(ev) {
        return this.editTitle(ev);
      });
      this.delegate('blur', '.bracket-title-input', function(ev) {
        return this.saveTitle(ev);
      });
      return this.selected = [];
    };

    BracketEditorView.prototype.render = function() {
      BracketEditorView.__super__.render.apply(this, arguments);
      $('<div class="hotzone">').appendTo(this.$el).width(this.$el.width()).height(this.$el.height());
      $('<input type="text" class="bracket-title-input">').appendTo(this.$('.label-layer span.bracket-title'));
      return this;
    };

    BracketEditorView.prototype.clickMatch = function(ev) {
      if (ev.shiftKey !== true) {
        this.deselect();
      }
      $(ev.currentTarget).addClass('activeSelect');
      this.selected.push($(ev.currentTarget).data('match'));
      return mediator.publish('change:selected', this.selected);
    };

    BracketEditorView.prototype.deselect = function() {
      $('.match.activeSelect').removeClass('activeSelect');
      this.selected = [];
      this.model.url = function() {
        return "http://test.ign.com:2121/brackets/v6/api/";
      };
      return this.model.save();
    };

    BracketEditorView.prototype.editTitle = function(ev) {
      $(ev.currentTarget).addClass('editing');
      return $(ev.currentTarget).find('input').focus().val(this.model.get('title'));
    };

    BracketEditorView.prototype.saveTitle = function(ev) {
      var newTitle;
      $(ev.currentTarget).parent('span').removeClass('editing');
      newTitle = String($(ev.currentTarget).val().trim());
      this.model.set('title', newTitle);
      this.model.set('slug', newTitle.toLowerCase().replace(/\ /g, '-'));
      return this.$('.bracket-title h1').text(newTitle);
    };

    return BracketEditorView;

  })(BracketView);
  
});
window.require.register("views/brackets/bracket-view", function(exports, require, module) {
  var BracketView, Connector, Formatter, GroupView, MatchView, Padding, RootFinder, Rounds, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/bracket');

  MatchView = require('views/brackets/match-view');

  GroupView = require('views/brackets/group-view');

  RootFinder = require('utility/brackets/root-finder');

  Rounds = require('utility/brackets/rounds-from-match-list');

  Formatter = require('utility/brackets/tree-view-formatter');

  Padding = require('utility/brackets/bracket-padding');

  Connector = require('utility/brackets/match-connector');

  module.exports = BracketView = (function(_super) {

    __extends(BracketView, _super);

    function BracketView() {
      return BracketView.__super__.constructor.apply(this, arguments);
    }

    BracketView.prototype.template = template;

    BracketView.prototype.container = '#bracket-container';

    BracketView.prototype.id = 'bracket-layer';

    BracketView.prototype.autoRender = true;

    BracketView.prototype.initialize = function(options, padding) {
      var _this = this;
      if (padding == null) {
        padding = {
          top: 200,
          right: 400,
          bottom: 200,
          left: 100
        };
      }
      BracketView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.model.get('matches'), 'reset', function() {
        _this.renderCount = 0;
        return _this.render();
      });
      this.listenTo(this.model.get('groups'), 'add', function() {
        return _this.render();
      });
      Padding.match.width = 180;
      Padding.match.height = 60;
      this.padding = padding;
      return this.renderCount = 0;
    };

    BracketView.prototype.render = function() {
      var group, groups, gv, match, matchViews, matches, mv, seed, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      BracketView.__super__.render.apply(this, arguments);
      matches = this.model.get('matches');
      groups = this.model.get('groups');
      seed = RootFinder.find(matches.models);
      matchViews = [];
      if (seed == null) {
        return this;
      }
      if (this.renderCount < 1) {
        Formatter.format(seed, Padding.match.width, Padding.match.height);
        Padding.setBracket(this.model, this.$el);
        Padding.setPadding(this.padding);
      }
      _ref = matches.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        mv = new MatchView({
          model: match
        });
        mv.$el.data('match', mv.model);
        mv.$el.appendTo(this.$el.find('.match-layer'));
        matchViews.push(mv);
      }
      _ref1 = groups.models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        group = _ref1[_j];
        gv = new GroupView({
          model: group
        });
        gv.$el.data('group', gv.model);
        gv.$el.appendTo(this.$el.find('.match-layer'));
      }
      Padding.updateBounds();
      this.$('span.bracket-title h1').text(this.model.get('title'));
      this.$('span.bracket-title').css({
        position: 'absolute',
        top: Padding.padding.top - 70,
        left: Padding.padding.left
      });
      _ref2 = matches.models;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        match = _ref2[_k];
        if (match.get('children').length > 0) {
          Connector.connect(match, matchViews).appendTo(this.$el.find('.line-layer'));
        }
      }
      return ++this.renderCount;
    };

    BracketView;


    return BracketView;

  })(View);
  
});
window.require.register("views/brackets/group-view", function(exports, require, module) {
  var GroupView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/group-stage');

  module.exports = GroupView = (function(_super) {

    __extends(GroupView, _super);

    function GroupView() {
      this.updatePosition = __bind(this.updatePosition, this);
      return GroupView.__super__.constructor.apply(this, arguments);
    }

    GroupView.prototype.template = template;

    GroupView.prototype.autoRender = true;

    GroupView.prototype.className = 'group';

    GroupView.prototype.initialize = function() {
      GroupView.__super__.initialize.apply(this, arguments);
      this.model.on('change:transform2d', this.updatePosition);
      this.listenTo(this.model.get('teams'), 'add remove', this.render);
      return this.listenTo(this.model.get('matches'), 'add remove', this.render);
    };

    GroupView.prototype.updatePosition = function() {
      var t2d;
      t2d = this.model.get('transform2d');
      return this.$el.css({
        top: t2d.y + t2d.paddingY,
        left: t2d.x + t2d.paddingX
      });
    };

    GroupView.prototype.render = function() {
      var group, i, match, matches, _ref;
      GroupView.__super__.render.apply(this, arguments);
      group = {};
      group.title = this.model.get('title');
      group.matches = (function() {
        var _ref, _results;
        _ref = this.model.get('matches').models;
        _results = [];
        for (i in _ref) {
          match = _ref[i];
          _results.push(parseInt(i) + 1);
        }
        return _results;
      }).call(this);
      group.teams = this.model.get('teams').map(function(team) {
        return team.get('name');
      });
      this.$el.html(this.template(group));
      matches = this.model.get('matches');
      _ref = matches.models;
      for (i in _ref) {
        match = _ref[i];
        this.$('.match').eq(i).data('match', match);
      }
      return this;
    };

    return GroupView;

  })(View);
  
});
window.require.register("views/brackets/match-view", function(exports, require, module) {
  var MatchView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/match');

  module.exports = MatchView = (function(_super) {

    __extends(MatchView, _super);

    function MatchView() {
      this.updatePosition = __bind(this.updatePosition, this);

      this.changeTeams = __bind(this.changeTeams, this);
      return MatchView.__super__.constructor.apply(this, arguments);
    }

    MatchView.prototype.template = template;

    MatchView.prototype.autoRender = true;

    MatchView.prototype.className = 'match';

    MatchView.prototype.initialize = function() {
      var _this = this;
      MatchView.__super__.initialize.apply(this, arguments);
      this.model.on('change:transform2d', this.updatePosition);
      return this.listenTo(this.model.get('event').get('matchup'), 'change:teams', function() {
        return _this.changeTeams();
      });
    };

    MatchView.prototype.render = function() {
      var a, team, teamsObs;
      MatchView.__super__.render.apply(this, arguments);
      teamsObs = (function() {
        var _i, _len, _ref, _results;
        _ref = this.model.teams();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          team = {};
          team.name = a != null ? a.get('name') : '';
          team.points = (a != null) && a.get('name') !== '' ? a.get('points') : '';
          _results.push(team);
        }
        return _results;
      }).call(this);
      this.$el.html(this.template({
        teams: teamsObs
      }));
      this.updatePosition();
      return this;
    };

    MatchView.prototype.changeTeams = function() {
      var team, _i, _len, _ref,
        _this = this;
      this.stopListening();
      this.listenTo(this.model.get('event').get('matchup'), 'change:teams', function() {
        return _this.changeTeams();
      });
      _ref = this.model.teams();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        team = _ref[_i];
        this.listenTo(team, 'change', function() {
          return _this.render();
        });
      }
      return this.render();
    };

    MatchView.prototype.updatePosition = function() {
      var t2d;
      t2d = this.model.get('transform2d');
      return this.$el.css({
        top: t2d.y + t2d.paddingY,
        left: t2d.x + t2d.paddingX
      });
    };

    return MatchView;

  })(View);
  
});
window.require.register("views/game-sub-view", function(exports, require, module) {
  var GameSubView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/game-sub');

  module.exports = GameSubView = (function(_super) {

    __extends(GameSubView, _super);

    function GameSubView() {
      this.setMatchup = __bind(this.setMatchup, this);
      return GameSubView.__super__.constructor.apply(this, arguments);
    }

    GameSubView.prototype.template = template;

    GameSubView.prototype.tagName = "li";

    GameSubView.prototype.container = "#game-container";

    GameSubView.prototype["class"] = "game-sub-view";

    GameSubView.prototype.initialize = function(options) {
      return GameSubView.__super__.initialize.call(this, options);
    };

    GameSubView.prototype.setMatchup = function(matchup) {
      this.matchup = matchup;
      return this;
    };

    GameSubView.prototype.render = function() {
      var options, team;
      GameSubView.__super__.render.apply(this, arguments);
      options = {};
      options.gameNumber = this.model.get('number');
      options.teams = (function() {
        var _i, _len, _ref, _results;
        _ref = this.matchup.get('teams');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          team = _ref[_i];
          _results.push({
            id: team.id,
            name: team.get('name')
          });
        }
        return _results;
      }).call(this);
      this.$el.html(this.template(options));
      this.$el.addClass(this.model.get('status').replace(/\ /g, "-"));
      return this;
    };

    return GameSubView;

  })(View);
  
});
window.require.register("views/header-view", function(exports, require, module) {
  var HeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'navbar navbar-fixed-top';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    return HeaderView;

  })(View);
  
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var HomePageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.container = '#page-container';

    HomePageView.prototype.template = template;

    return HomePageView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("views/templates/admin-toolbar", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<button class=\"btn\" id=\"";
    stack1 = depth0.slug;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" >\n		";
    stack1 = depth0.label;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\n	</button>\n	";
    return buffer;}

    buffer += "<div class=\"btn-group btn-group\">\n	";
    stack1 = depth0.btns;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>";
    return buffer;});
});
window.require.register("views/templates/admin-workspace", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"bracket-container\">\n</div>\n<div id=\"toolbar-container\"></div>\n<div id=\"menu-container\"></div>\n";});
});
window.require.register("views/templates/brackets/bracket", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"line-layer\">\n</div>\n<div class=\"match-layer\">\n</div>\n<div class=\"label-layer\">\n<span class=\"bracket-title\"><h1></h1></span>\n</div>";});
});
window.require.register("views/templates/brackets/group-stage", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n		<li>";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "</li>\n	";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    buffer += "\n		<li><button class=\"btn btn-mini match\">";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "</button></li>\n	";
    return buffer;}

    buffer += "<h3>";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h3>\n<ul class=\"group-team-list\">\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>\n<ul class=\"match-list\">\n	";
    stack1 = depth0.matches;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>";
    return buffer;});
});
window.require.register("views/templates/brackets/match", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<span class=\"team-label\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</span>\n	<span class=\"team-score\">";
    stack1 = depth0.points;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</span>\n";
    return buffer;}

    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { return stack1; }
    else { return ''; }});
});
window.require.register("views/templates/game-sub", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<button class=\"btn btn-small btn-primary btn-block team-btn\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</button>\n	";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<button class=\"btn btn-small btn-block\" disabled>";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</button>\n	";
    return buffer;}

    buffer += "<div class=\"ready\">\n	<div class=\"game-header\">Game #";
    foundHelper = helpers.gameNumber;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.gameNumber; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</div>\n</div>\n<div class=\"in-progress\">\n	<span>Winner:</span>\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>\n<div class=\"finished\">\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>";
    return buffer;});
});
window.require.register("views/templates/group-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<li class=\"clearfix\">\n			<strong>";
    stack1 = depth0.title;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</strong>\n			<div class=\"group-input\">\n				<label>Players</label>\n				<input type=\"text\" value=\"";
    stack1 = depth0.players;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" class=\"span1 group-players-input\" >\n			</div>\n			<div class=\"group-input\">\n				<label>Matches</label>\n				<input type=\"text\" value=\"";
    stack1 = depth0.matches;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" class=\"span1 group-matches-input\">\n			</div>\n		</li>\n	";
    return buffer;}

    buffer += "<form>\n	<fieldset>\n	<legend>Edit Groups</legend>\n	<ul>\n	";
    stack1 = depth0.groups;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</ul>\n	<hr>\n	<label>Add Group</label>\n	<button class=\"btn btn-success\">+</button>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"navbar-inner\">\n<div class=\"brand\">\n</div>\n<ul class=\"nav\">\n	<li>\n		<a class=\"header-link\" href=\"test/\">Load Bracket</a>\n	</li>\n	<li>\n		<a class=\"header-link\" href=\"http://brunch.readthedocs.org/\">Publish</a>\n	</li>\n</ul>\n</div>";});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<a href=\"http://brunch.io/\">\n  <img src=\"http://brunch.io/images/brunch.png\" alt=\"Brunch\" />\n</a>\n";});
});
window.require.register("views/templates/match-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<form>\n	<fieldset>\n	<legend>Edit Match</legend>\n\n	<div id=\"teams-area\">\n		<label>Title</label>\n		<input type=\"text\" id=\"match-title\" value=\"";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">\n		<label>Teams</label>\n		<select id=\"team1\" class=\"team-list\" slot=\"0\" >\n		</select>\n		<select id=\"team2\" class=\"team-list\" slot=\"1\" >\n		</select>\n	</div>\n\n	<div id=\"games-area\">\n		<label>Best of</label>\n		<input type=\"text\" class=\"span1 best-of-input\" value=";
    foundHelper = helpers.bestOf;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.bestOf; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + ">\n		<ul id=\"game-container\">\n		</ul>\n		<button class=\"btn btn-success\" id=\"start-game-btn\">Start Game</button>\n	</div>\n\n	<div id=\"event-area\">\n		<label>Stream</label>\n		<select id=\"stream-select\" class=\"stream-list\">\n		</select>\n		<label>Start time</label>\n		<input type=\"text\" id=\"start-time\" value=\"";
    foundHelper = helpers.startsAt;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.startsAt; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">\n		<label>Groups</label>\n		<select multiple=\"multiple\" id=\"group-select\">\n		</select></div>\n\n	<hr>\n	<a href=\"#\">Click here to edit in IPL-Koala</a>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/team-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<li class=\"team-field\">\n		<span class=\"team-label\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\n			<button class=\"btn btn-mini edit-team\"><i class=\"icon-pencil\"></i></button>\n		</span>\n		<span class=\"team-edit-label\">\n			<input class=\"team-input\" value=\"";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" >\n			<button class=\"btn btn-mini edit-team\"><i class=\"icon-ok\"></i></button>\n		</span>\n	</li>	\n";
    return buffer;}

    buffer += "<form>\n	<legend>\nTeam seeding\n	</legend>\n	<fieldset>\n		<label class=\"checkbox\">\n			<input id=\"enable-seeding\" type=\"checkbox\" checked > Auto-seeding\n		</label>\n		<ol id=\"team-sort-list\">\n";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		</ol>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/wizard-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<form>\n	<legend>Generate matches</legend>\n	<fieldset>\n		<label>Number of players</label>\n		<input type=\"text\" value=\"16\" id=\"num-players\">\n		<label class=\"radio\">\n  			<input type=\"radio\" name=\"optionsRadios\" id=\"optionsElimination1\" value=\"single\" checked>\n  		Single elimination\n		</label>\n		<label class=\"radio\">\n		  <input type=\"radio\" name=\"optionsRadios\" id=\"optionsElimination2\" value=\"double\">\n		  Double elimination\n		</label>\n		\n			<button type=\"submit\" class=\"btn btn-primary\">Generate</button>\n		\n	</fieldset>\n</form>";});
});
window.require.register("views/tool-menus/group-menu-view", function(exports, require, module) {
  var GroupMenuView, GroupStage, Padding, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/group-menu');

  GroupStage = require('models/brackets/group-stage');

  Padding = require('utility/brackets/bracket-padding');

  module.exports = GroupMenuView = (function(_super) {

    __extends(GroupMenuView, _super);

    function GroupMenuView() {
      return GroupMenuView.__super__.constructor.apply(this, arguments);
    }

    GroupMenuView.prototype.autoRender = true;

    GroupMenuView.prototype.template = template;

    GroupMenuView.prototype.container = '#menu-container';

    GroupMenuView.prototype.id = 'group-menu';

    GroupMenuView.prototype.className = 'admin-menu clearfix';

    GroupMenuView.prototype.events = {
      'click .btn': function() {
        return this.addGroup();
      },
      'change .group-players-input': function(ev) {
        var ct;
        ct = $(ev.currentTarget);
        this.changeTeams(ct.parents('li').data('group'), parseInt(ct.val()));
        return false;
      },
      'change .group-matches-input': function(ev) {
        var ct;
        ct = $(ev.currentTarget);
        this.changeMatches(ct.parents('li').data('group'), parseInt(ct.val()));
        return false;
      }
    };

    GroupMenuView.prototype.initialize = function(options) {
      GroupMenuView.__super__.initialize.apply(this, arguments);
      this.bracket = options.bracket;
      return this.collection = this.bracket.get('groups');
    };

    GroupMenuView.prototype.addGroup = function() {
      var group;
      group = this.model.newGroup({
        title: "Group " + (this.collection.length + 1),
        numTeams: 4,
        numMatches: 5
      });
      this.collection.add(group);
      if (this.collection.length === 1) {
        Padding.moveMatches(200, 0);
      }
      this.render();
      return false;
    };

    GroupMenuView.prototype.changeTeams = function(group, targetNum) {
      var diff, i, teamLength, teams, _i, _results;
      teams = group.get('teams');
      teamLength = teams.length;
      diff = Math.abs(targetNum - teamLength);
      _results = [];
      for (i = _i = 0; 0 <= diff ? _i < diff : _i > diff; i = 0 <= diff ? ++_i : --_i) {
        if (targetNum > teamLength) {
          _results.push(teams.add({
            name: "TEAM X"
          }));
        } else {
          _results.push(teams.pop());
        }
      }
      return _results;
    };

    GroupMenuView.prototype.changeMatches = function(group, targetNum) {
      var diff, i, matchLength, matches, _i, _results;
      matches = group.get('matches');
      matchLength = matches.length;
      diff = Math.abs(targetNum - matchLength);
      _results = [];
      for (i = _i = 0; 0 <= diff ? _i < diff : _i > diff; i = 0 <= diff ? ++_i : --_i) {
        if (targetNum > matchLength) {
          _results.push(matches.add({
            bestOf: 1
          }));
        } else {
          _results.push(matches.pop());
        }
      }
      return _results;
    };

    GroupMenuView.prototype.render = function() {
      var a, args, col;
      GroupMenuView.__super__.render.apply(this, arguments);
      args = {};
      args.groups = (function() {
        var _i, _len, _ref, _results;
        _ref = this.collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          _results.push({
            title: a.get('title'),
            players: a.get('teams').length,
            matches: a.get('matches').length
          });
        }
        return _results;
      }).call(this);
      this.$el.html(this.template(args));
      col = this.collection;
      this.$('li').each(function(index) {
        return $(this).data('group', col.at($(this).index()));
      });
      return this;
    };

    return GroupMenuView;

  })(View);
  
});
window.require.register("views/tool-menus/match-menu-view", function(exports, require, module) {
  var GameSubView, MatchMenuView, Matches, Streams, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/match-menu');

  Matches = require('collections/brackets/matches');

  mediator = require('mediator');

  Streams = require('collections/brackets/streams');

  GameSubView = require('views/game-sub-view');

  module.exports = MatchMenuView = (function(_super) {

    __extends(MatchMenuView, _super);

    function MatchMenuView() {
      this.saveTime = __bind(this.saveTime, this);

      this.saveStream = __bind(this.saveStream, this);

      this.fillSelect = __bind(this.fillSelect, this);

      this.endGame = __bind(this.endGame, this);

      this.startGame = __bind(this.startGame, this);

      this.renderGames = __bind(this.renderGames, this);
      return MatchMenuView.__super__.constructor.apply(this, arguments);
    }

    MatchMenuView.prototype.autoRender = true;

    MatchMenuView.prototype.template = template;

    MatchMenuView.prototype.container = '#menu-container';

    MatchMenuView.prototype.id = "match-menu";

    MatchMenuView.prototype.className = "admin-menu";

    MatchMenuView.prototype.events = {
      'click #start-game-btn': function() {
        return this.startGame();
      },
      'change .team-list': function(ev) {
        return this.saveTeam(ev);
      },
      'change .best-of-input': function(ev) {
        return this.saveBestOf(ev);
      },
      'change .stream-list': function(ev) {
        return this.saveStream(ev);
      },
      'change #match-title': function(ev) {
        return this.saveTitle(ev);
      },
      'change #start-time': function(ev) {
        return this.saveTime(ev);
      },
      'click .team-btn': function(ev) {
        return this.endGame(ev);
      }
    };

    MatchMenuView.prototype.initialize = function(options) {
      var _this = this;
      MatchMenuView.__super__.initialize.apply(this, arguments);
      mediator.subscribe('change:selected', function(sel) {
        return _this.selectionChanged(sel);
      });
      this.streams = new Streams();
      this.streams.fetch({
        url: "http://esports.ign.com/content/v2/streams.json?callback=?",
        cached: true
      });
      this.groups = [];
      return this.bracket = options.bracket;
    };

    MatchMenuView.prototype.render = function() {
      var i, options, team, teamList, teamName, teams, _i, _len, _ref, _ref1, _ref2;
      MatchMenuView.__super__.render.apply(this, arguments);
      if (this.model == null) {
        return this;
      }
      options = {};
      options.title = this.model.event().get('title');
      options.bestOf = this.model.matchup().get('best_of');
      options.startsAt = this.model.event().get('starts_at');
      this.$el.html(this.template(options));
      teamList = (function() {
        var _i, _len, _ref, _results;
        _ref = this.bracket.get('teams').models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          team = _ref[_i];
          if (team != null) {
            _results.push(team.get('name'));
          }
        }
        return _results;
      }).call(this);
      teamList.unshift('');
      for (_i = 0, _len = teamList.length; _i < _len; _i++) {
        teamName = teamList[_i];
        $('<option></option>').appendTo(this.$('.team-list')).text(teamName);
      }
      teams = (_ref = this.model) != null ? _ref.teams() : void 0;
      if (teams != null) {
        for (i in teams) {
          team = teams[i];
          this.$("#team" + (parseInt(i) + 1) + " option").each(function(ind) {
            if ($(this).text() === team.get('name')) {
              return $(this).prop("selected", "selected");
            }
          });
        }
      }
      this.fillSelect(this.streams.models, '.stream-list', (_ref1 = this.model) != null ? (_ref2 = _ref1.get('event').get('stream')) != null ? _ref2.name : void 0 : void 0);
      this.$('#start-time').datetimepicker({
        timeFormat: "hh:mm ttz",
        showTimezone: false,
        timezone: "-0800",
        hourGrid: 4,
        minuteGrid: 10
      });
      if (this.model.games().first().get('status') !== 'ready') {
        this.renderGames();
        this.$('#start-game-btn').hide();
      }
      return this;
    };

    MatchMenuView.prototype.renderGames = function() {
      var _this = this;
      this.gameViews = this.model.games().map(function(game) {
        return new GameSubView({
          model: game
        }).setMatchup(_this.model.matchup()).render();
      });
      return false;
    };

    MatchMenuView.prototype.startGame = function() {
      this.model.games().first().set('status', 'in progress');
      this.render();
      return false;
    };

    MatchMenuView.prototype.endGame = function(ev) {
      var result,
        _this = this;
      result = this.model.matchup().pointFor(this.$(ev.currentTarget).text());
      this.model.games().next(result.winner);
      if (result.matchDecided) {
        this.model.games().each(function(game) {
          return game.set('status', 'finished');
        });
        this.model.advance(result.winner);
      }
      this.render();
      return false;
    };

    MatchMenuView.prototype.fillSelect = function(list, elName, defaultVal) {
      var element, op, _i, _len, _results;
      if (defaultVal == null) {
        defaultVal = null;
      }
      $('<option></option>').appendTo(this.$(elName));
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        element = list[_i];
        op = $('<option></option>').appendTo(this.$(elName)).text(element.get('name'));
        if (op.text() === defaultVal) {
          _results.push(op.prop("selected", "selected"));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    MatchMenuView.prototype.saveTeam = function(ev) {
      var teamNames, teams,
        _this = this;
      teams = _.clone(this.model.teams());
      teams[parseInt($(ev.currentTarget).attr('slot'))] = this.bracket.get('teams').where({
        name: $(ev.currentTarget).val()
      })[0];
      this.model.teams(teams);
      teamNames = _.map(teams, function(team) {
        return team.get('name');
      });
      this.model.event().set('title', teamNames.join(" vs. "));
      return this.render();
    };

    MatchMenuView.prototype.saveTitle = function(ev) {
      return this.model.get('event').set('title', $(ev.currentTarget).val());
    };

    MatchMenuView.prototype.saveBestOf = function(ev) {
      return this.model.matchup().set('best_of', parseInt(this.$(ev.currentTarget).val()));
    };

    MatchMenuView.prototype.selectionChanged = function(selected) {
      this.toolbar.openMenu('match-menu');
      this.model.selected = selected;
      this.model.set(_.clone(selected[0].attributes), {
        silent: true
      });
      this.model.newAttrs();
      return this.render();
    };

    MatchMenuView.prototype.saveStream = function(ev) {
      var sId, sName;
      sName = $(ev.currentTarget).val();
      sId = this.streams.find(function(el) {
        return el.get('name') === sName;
      });
      return this.model.get('event').set('stream', {
        id: sId.id,
        name: sName
      });
    };

    MatchMenuView.prototype.saveTime = function(ev) {
      this.model.event().set('starts_at', $(ev.currentTarget).val());
      return this.model.event().set('ends_at', moment($(ev.currentTarget).val(), "MM/DD/YYYY hh:mm a").add('hours', 1).format("MM-DD-YYYYTHHss:mmZ"));
    };

    return MatchMenuView;

  })(View);
  
});
window.require.register("views/tool-menus/team-menu-view", function(exports, require, module) {
  var Collection, TeamMenuView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Collection = require('models/base/collection');

  template = require('views/templates/team-menu');

  module.exports = TeamMenuView = (function(_super) {

    __extends(TeamMenuView, _super);

    function TeamMenuView() {
      this.editTeam = __bind(this.editTeam, this);

      this.sortUpdate = __bind(this.sortUpdate, this);
      return TeamMenuView.__super__.constructor.apply(this, arguments);
    }

    TeamMenuView.prototype.template = template;

    TeamMenuView.prototype.container = '#menu-container';

    TeamMenuView.prototype.id = 'team-menu';

    TeamMenuView.prototype.className = 'admin-menu clearfix';

    TeamMenuView.prototype.autoRender = true;

    TeamMenuView.prototype.events = {
      'click .edit-team': function(ev) {
        return this.editTeam(ev);
      },
      'dblclick .team-label': function(ev) {
        return this.editTeam(ev);
      },
      'blur .team-edit-label input': function(ev) {
        return this.saveTeamName(ev);
      },
      'change #enable-seeding': function(ev) {
        return this.model.set('enabled', $(ev.currentTarget).prop('checked'));
      }
    };

    TeamMenuView.prototype.initialize = function(options) {
      var _this = this;
      TeamMenuView.__super__.initialize.apply(this, arguments);
      this.bracket = options.bracket;
      this.teams = this.bracket.get('teams');
      this.listenTo(this.teams, 'reset', this.render);
      this.listenTo(this.teams, 'change:name', this.render);
      this.idLookup = {};
      return $.ajax({
        url: "http://esports.ign.com/content/v2/teams.json?per_page=1000",
        jsonpCallback: "jsonp",
        dataType: "jsonp",
        success: function(data) {
          var a;
          return _this.teamlist = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              a = data[_i];
              this.idLookup[a.name] = a.id;
              _results.push(a.name);
            }
            return _results;
          }).call(_this);
        }
      });
    };

    TeamMenuView.prototype.render = function() {
      var a, teamObs,
        _this = this;
      TeamMenuView.__super__.render.apply(this, arguments);
      teamObs = (function() {
        var _i, _len, _ref, _results;
        _ref = this.teams.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          _results.push({
            name: a.get('name')
          });
        }
        return _results;
      }).call(this);
      this.$el.html(this.template({
        teams: teamObs
      }));
      this.teams.each(function(team) {
        return _this.$('li').eq(team.get('seed') - 1).data('team', team);
      });
      this.$('#team-sort-list').sortable({
        update: this.sortUpdate
      });
      this.$('input.team-input').typeahead({
        source: this.teamlist
      });
      return this;
    };

    TeamMenuView.prototype.sortUpdate = function(e, ui) {
      this.$('li').each(function() {
        return $(this).data('team').set('seed', $(this).index() + 1);
      });
      return this.teams.sort();
    };

    TeamMenuView.prototype.editTeam = function(ev) {
      var parent;
      parent = $(ev.currentTarget).parents('li');
      parent.addClass('edit').find('input').focus();
      return false;
    };

    TeamMenuView.prototype.saveTeamName = function(ev) {
      var team;
      team = $(ev.currentTarget).parents('li').data('team');
      team.set('name', $(ev.currentTarget).val());
      team.set('id', this.idLookup[$(ev.currentTarget).val()]);
      this.$('li').removeClass('edit');
      return false;
    };

    return TeamMenuView;

  })(View);
  
});
window.require.register("views/tool-menus/wizard-menu-view", function(exports, require, module) {
  var DoubleElim, FlattenTree, Fuser, MatchPruner, Matches, RootFinder, Teams, View, WizardMenuView, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/wizard-menu');

  Matches = require('collections/brackets/matches');

  Teams = require('collections/brackets/teams');

  MatchPruner = require('utility/brackets/match-pruner');

  DoubleElim = require('models/double-elim-generator');

  Fuser = require('utility/fuse-trees');

  FlattenTree = require('utility/brackets/flatten-tree');

  RootFinder = require('utility/brackets/root-finder');

  module.exports = WizardMenuView = (function(_super) {

    __extends(WizardMenuView, _super);

    function WizardMenuView() {
      this.clickWizard = __bind(this.clickWizard, this);

      this.changePlayers = __bind(this.changePlayers, this);
      return WizardMenuView.__super__.constructor.apply(this, arguments);
    }

    WizardMenuView.prototype.template = template;

    WizardMenuView.prototype.container = '#menu-container';

    WizardMenuView.prototype.id = 'wizard-menu';

    WizardMenuView.prototype.className = 'admin-menu clearfix';

    WizardMenuView.prototype.autoRender = true;

    WizardMenuView.prototype.events = {
      'change #num-players': function() {
        return this.changePlayers();
      },
      'click .btn-primary': function() {
        return this.clickWizard();
      },
      'submit': function() {
        return false;
      }
    };

    WizardMenuView.prototype.initialize = function(options) {
      this.bracket = options.bracket;
      this.doubleElimGen = new DoubleElim();
      return WizardMenuView.__super__.initialize.apply(this, arguments);
    };

    WizardMenuView.prototype.changePlayers = function() {
      return this.model.set('numPlayers', parseInt(this.$('#num-players').val()));
    };

    WizardMenuView.prototype.clickWizard = function() {
      var fullTree, loserTree, matches, wlb;
      fullTree = this.model.generate();
      wlb = fullTree;
      if (this.$('input:radio[name ="optionsRadios"]:checked').val() === "double") {
        loserTree = this.doubleElimGen.generate(this.model.get('numPlayers'), fullTree);
        wlb = FlattenTree.flatten(Fuser.fuse(RootFinder.find(fullTree), RootFinder.find(loserTree)));
      }
      matches = MatchPruner.prune(wlb, parseInt(this.$('#num-players').val()));
      this.bracket.get('matches').reset(matches);
      return this.bracket.get('teams').reset(this.model.makeTeams());
    };

    return WizardMenuView;

  })(View);
  
});
