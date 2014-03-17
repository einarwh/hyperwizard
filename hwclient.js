var request = require('request');
var http = require('http');
var prettyjson = require('prettyjson');

var mem = {};

var visit = function(self, url) {
  var opt = null;
  if (typeof url === 'string') {
    opt = { uri: url };
  }
  else {
    opt = url;
  }

  var reqInfo = {};
  var resInfo = {};

  var requestMethod = opt.method || "GET";
  reqInfo.url = opt.uri;
  reqInfo.method = requestMethod;
  opt.headers = {
    "Accept": "application/vnd.siren+json"
  };
  reqInfo.accept = opt.headers.accept;

  if (mem[opt.uri] && requestMethod === 'GET') {
    opt.headers["If-None-Match"] = mem[opt.uri].etag;
    reqInfo["if-none-match"] = mem[opt.uri].etag;
  }

  if (opt.form) {
    reqInfo.form = opt.form;
  }

  neat({ request: reqInfo});

  request(opt, function(error, response, body) {
    if (error) {
      resInfo.error = error;
      neat({ response: resInfo});
      return;
    }

    if (typeof opt === 'string') {
      self.request = { uri: opt };
      self.at = opt;
    }
    else {
      self.request = opt;
      self.at = opt.uri;
    }
    self.where = self.at;
    self.statusCode = response.statusCode;

    console.log(response.headers["content-type"]);

    // TODO: obviously must also be GET request.
    if (response.headers.etag && requestMethod === 'GET' && self.statusCode >= 200 && self.statusCode < 300) {
      mem[self.at] = { 
        etag: response.headers.etag,
        headers: response.headers,
        body: body
      };
    }

    self.statusName = http.STATUS_CODES[response.statusCode];
    self.status = self.statusCode + " " + self.statusName;
    resInfo.status = self.status;

    var recall;
    
    if (self.statusCode === 304 && mem[self.at]) {
      // Restore state from mem.
      recall = mem[self.at];
      self.headers = recall.headers;
      self.location = recall.location;
      self.body = recall.body;

    }
    else {
      self.headers = response.headers;
      self.location = response.headers.location; 
      self.body = body;
    }

    if (self.location) {
      resInfo.location = self.location;
    }

    if (self.headers["content-type"]) {
      resInfo["content-type"] = self.headers["content-type"];
    }

    if (self.body.length > 0 && "application/vnd.siren+json" === self.headers["content-type"]) {
      self.siren = JSON.parse(self.body);
    }
    else {
      self.siren = "";
    }

    self.json = self.siren;

    neat({ response: resInfo });
  });
};

var findAction = function(self, actionName) {
  var acts = self.siren.actions;
  if (acts) {
    for (var i = 0, len = acts.length; i < len; i++) {
      var a = acts[i];
      if (a.name === actionName) {
        return a;
      }
    }
  }
  return undefined;
};

var lookupAction = function(self, actionId) {
  if (typeof actionId === 'number') {
    return self.siren.actions[actionId];
  }
  return findAction(self, actionId);
};

var neat = function(json) {
  console.log(prettyjson.render(json));
};

exports.to = function(url) {
    visit(this, url);
};

exports.help = function(url) {
  var hlp = {
    "game.help()": "Prints this help.",
    "game.at()": "Where you are.",
    "game.all()": "What it looks like.",
    "game.actions()": "Things to do.",
    "game.do(action, json)": "To do things.",
    "game.links()": "Where to go.",
    "game.go(link-no)": "To go somewhere.",
    "game.follow()": "To follow a link header"
  };
  neat(hlp);
};

exports.action = function(actionName) {
    var a = lookupAction(this, actionName);
    if (a) {
      neat(a);
    }
};

exports.do = function(actionName, formData) {
    var self = this;

    // get url from action-name.
    var a = lookupAction(self, actionName);

    if (a) {
      var requestData = {
        uri: a.href,
        method: a.method || "GET"
      };

      if (formData) {
        requestData.form = formData;
      }
      
      // also: whatever else necessary to make proper request.
      // includes: http method, request parameters.
      visit(self, requestData);
    } else {
      console.log('No such action: ' + actionName);
      console.log('Available actions:');
      for (var i = 0, len = self.actions.length; i < len; i++) {
        console.log(prettyjson.render(self.actions[i]));
      }
    }
};

exports.void = function() {
    visit(this, 'http://localhost:3000/hywit/void');
};

exports.study = function() {
    visit(this, 'http://localhost:3000/hywit/1337/study');
};

exports.go = function(linkIndex) {
    // get url from linkIndex;
    var self = this;
    var link = self.siren.links[linkIndex];
    var url = link.href;
    visit(this, url);
};

exports.follow = function() {
    var self = this;
    if (self.location) {
      visit(self, self.location);
    }
    else {
      console.log('No location header set.');
    }
};

exports.all = function () {
  neat(this.siren);
};

exports.what = function () {
  neat(this.siren);
};

exports.actions = function () {
  neat(this.siren.actions);
};

exports.links = function () {
  neat(this.siren.links);
};

exports.properties = function() {
  neat(this.siren.properties);
};
