var request = require('request');
var http = require('http');
var prettyjson = require('prettyjson');

var history = {};

var visit = function(self, url) {
  console.log(url);
  var opt = null;
  if (typeof url === 'string') {
    opt = { uri: url }
  }
  else {
    opt = url;
  }

  if (history[opt.uri]) {
    opt.headers = { 
      "If-None-Match": history[opt.uri].etag 
    };
  }

  request(opt, function(error, response, body) {
    if (error) {
      console.log(error);
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

    // TODO: obviously must also be GET request.
    if (response.headers.etag && self.statusCode >= 200 && self.statusCode < 300) {
      history[self.at] = { 
        etag: response.headers.etag,
        headers: response.headers,
        body: body
      };
    }

    self.statusName = http.STATUS_CODES[response.statusCode];
    self.status = self.statusCode + " " + self.statusName;
    console.log(self.status);

    var recall;
    
    if (self.statusCode === 304 && history[self.at]) {
      // Restore state from history.
      recall = history[self.at];
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
      console.log("Location: " + self.location);
    }

    if (self.body.length > 0 && "application/vnd.siren+json" === self.headers["content-type"]) {
      self.siren = JSON.parse(self.body);
    }
    else {
      self.siren = "";
    }

    self.json = self.siren;
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

var print = function(json) {
  console.log(prettyjson.render(json));
}

exports.to = function(url) {
    visit(this, url);
};

exports.action = function(actionName) {
    var a = lookupAction(this, actionName);
    if (a) {
      print(a);
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
  print(this.siren);
};

exports.what = function () {
  print(this.siren);
};

exports.actions = function () {
  print(this.siren.actions);
};

exports.links = function () {
  print(this.siren.links);
};

exports.properties = function() {
  print(this.siren.properties);
}
