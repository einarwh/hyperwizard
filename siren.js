var request = require('request');

var visit = function(self, url) {
  console.log(url);
  request(url, function(error, response, body) {
    if (error) {
      console.log(error);
      return;
    }

    self.where = url;
    self.at = url;
    self.statusCode = response.statusCode;
    self.headers = response.headers;
    self.location = response.headers.location;
    self.body = JSON.parse(body);
    self.properties = self.body.properties;
    self.actions = self.body.actions;
    self.links = self.body.links;
    console.log(".");
  });
};

var findAction = function(self, actionName) {
  console.log('find action ' + actionName);
  for (var i=0, len = self.actions.length; i < len; i++) {
    var a = self.actions[i];
    if (a.name === actionName) {
      return a;
    }
  }
  return undefined;
};

var siren = {

  "to" : function(url) {
    visit(this, url);
  },

  "action": function(actionName) {
    return findAction(this, actionName);
  },

  "do" : function(actionName, formData) {
    var self = this;
    // get url from action-name.
    var a = findAction(this, actionName);

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
      return visit(self, requestData);
    } else {
      console.log('No such action: ' + actionName);
      console.log('Available actions:');
      for (var i = 0, len = self.actions.length; i < len; i++) {
        console.log(self.actions[i]);
      }
    }
  },

  "go" : function(linkIndex) {
    // get url from linkIndex;
    var self = this;
    var link = self.body.links[linkIndex];
    var url = link.href;
    return visit(this, url);
  },

  "follow" : function() {
    var self = this;
    if (self.statusCode >= 300 && self.statusCode < 400) {
      if (self.location) {
        return visit(self, self.location);
      }
      console.log('No location header set.');
    }
    else {
      console.log("Not a redirect.");
    }
  }
};

//siren.to('http://localhost:3000/hywit/1337/sign');
