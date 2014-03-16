var request = require('request');
var http = require('http');
var prettyjson = require('prettyjson');

var visit = function(self, url) {
  console.log(url);
  request(url, function(error, response, body) {
    if (error) {
      console.log(error);
      return;
    }

    if (typeof url === 'string') {
      self.request = { uri: url };
      self.at = url;
    }
    else {
      self.request = url;
      self.at = url.uri;
    }
    self.where = self.at;
    self.statusCode = response.statusCode;
    self.statusName = http.STATUS_CODES[response.statusCode];
    self.status = self.statusCode + " " + self.statusName;
    console.log(self.status);

    self.headers = response.headers;
    self.location = response.headers.location; 
    if (self.location) {
      console.log("Location: " + self.location);
    }

    self.body = body;
    if (body.length > 0 && "application/vnd.siren+json" === response.headers["content-type"]) {
      self.siren = JSON.parse(body);
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
