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
      self.properties = self.siren.properties;
      self.actions = self.siren.actions;
      self.links = self.siren.links;
    }
    else {
      self.siren = "";
      self.properties = undefined;
      self.actions = undefined;
      self.links = undefined;
    }
    self.all = self.siren;
    self.what = self.siren;
  });
};

var findAction = function(self, actionName) {
  if (self.actions) {
    for (var i = 0, len = self.actions.length; i < len; i++) {
      var a = self.actions[i];
      if (a.name === actionName) {
        return a;
      }
    }
  }
  return undefined;
};

var lookupAction = function(self, actionId) {
  if (typeof actionId === 'number') {
    return self.actions[actionId];
  }
  return findAction(self, actionId);
};


exports.to = function(url) {
    visit(this, url);
};

exports.action = function(actionName) {
    return lookupAction(this, actionName);
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

