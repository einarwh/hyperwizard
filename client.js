var request = require('request');
var http = require('http');
var prettyjson = require('prettyjson');
var fs = require('fs');

var mem = { history: [] };

var sendRequest = function(self, opt, requestMethod) {

  request(opt, function(error, response, body) {
    var resInfo = {};

    if (error) {
      resInfo.error = error;
      neat({ response: resInfo});
      return;
    }

    if (response.statusCode === 400 || response.statusCode === 404 || response.statusCode === 410) {
      var statusName = http.STATUS_CODES[response.statusCode];
      var statusSummary = response.statusCode + " " + statusName;
      resInfo.status = statusSummary;
      // resInfo.etag = response.headers.etag;
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

    if (self.statusCode >= 200 && self.statusCode < 300) {
      var remember = { method: requestMethod, options: opt };
      mem.history.push(remember);
    }

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
    self.etag = response.headers.etag;
    resInfo.status = self.status;
    resInfo.etag = self.etag;

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

    if (self.body.length > 0 && "application/json" === self.headers["content-type"]) {
      self.json = JSON.parse(self.body);
      self.siren = "";
    }

    neat({ response: resInfo });
  });

}

var visit = function(self, url, accepts) {
  var acceptsHeader = accepts || "application/vnd.siren+json";
  
  var opt = null;
  if (typeof url === 'string') {
    opt = { uri: url };
  }
  else {
    opt = url;
  }
  opt.followRedirect = false;

  var reqInfo = {};

  var requestMethod = opt.method || "GET";
  reqInfo.url = opt.uri;
  reqInfo.method = requestMethod;
  opt.headers = {
    "Accept": acceptsHeader,
    "Referer": self.at,
    "X-Alt-Referer": self.at
  };

  reqInfo.accept = opt.headers.Accept;

  if (mem[opt.uri] && requestMethod === 'GET') {
    opt.headers["If-None-Match"] = mem[opt.uri].etag;
    reqInfo["if-none-match"] = mem[opt.uri].etag;
  }

  if (opt.form) {
    reqInfo.form = opt.form;
  }

  neat({ request: reqInfo });

  sendRequest(self, opt, requestMethod);
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

var down = function(uri, filename) {
  request.head(uri, function(err, res, body) {

    if (err) {
      neat( { error: err } );
      return;
    }

    var r = request(uri);
    r.on('response', function (resp) {
      if (resp.statusCode === 200) {
        r.pipe(fs.createWriteStream("downloads/" + filename));
        var resInfo = {
          "content-type": res.headers['content-type'],
          downloaded: filename, 
          bytes: res.headers['content-length']
        };
        neat(resInfo);
      }
      else {
        var statusName = http.STATUS_CODES[resp.statusCode];
        var statusText = resp.statusCode + " " + statusName;
        neat( { error: statusText } );
      }
    }); 
  });   
};

exports.download = function(uri, filename) {
  filename = filename || uri.substring(uri.lastIndexOf('/') + 1)
  down(uri, filename, function() { console.log("done..."); } );
};

exports.to = function(url, accepts) {
    visit(this, url, accepts);
};

exports.help = function(url) {
  var hlp = {
    "game.help()": "Prints this help.",
    "game.at": "Where you are.",
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

      var defaultMethod = "GET";

      var requestData = {
        uri: a.href,
      };

      if ('undefined' !== typeof formData) {
        if (typeof formData === 'string') {
          defaultMethod = formData;
        }
        else {
          requestData.form = formData;
        }
      }

      requestData.method = a.method || defaultMethod;
      
      // also: whatever else necessary to make proper request.
      // includes: http method, request parameters.
      visit(self, requestData);
    } else {
      var acts = self.siren.actions;
      console.log('No such action: ' + actionName);
      console.log('Available actions [' + acts.length + ']:');
      for (var i = 0, len = acts.length; i < len; i++) {
        console.log(" - " + prettyjson.render(acts[i].name));
      }
    }
};

exports.azure = function() {
    visit(this, 'http://hyperwizard.azurewebsites.net/hywit/void');
};

exports.void = function(accepts) {
    visit(this, 'http://localhost:1337/hywit/void', accepts);
};

exports.study = function() {
    visit(this, 'http://localhost:1337/hywit/1337/study');
};

function outOfBounds(links, linkIndex) {
  var endIndex = links.length - 1;
  var s = "Illegal link index " + linkIndex + " - must be between bounds [0, " + endIndex + "]";
  console.log(s);
}

exports.go = function(linkIndex) {
    // get url from linkIndex;
    var self = this;
    var link = self.siren.links[linkIndex];
    if (link === undefined) {
      outOfBounds(self.siren.links, linkIndex);
      return;
    }
    var url = link.href;
    visit(this, url);
};

exports.back = function() {
  if (mem.history.length > 0) {
    mem.history.pop();
    if (mem.history.length > 0) {
      var info = mem.history[mem.history.length - 1];
      var opt = info.options;
      var requestMethod = info.method;
      if (mem[opt.uri] && requestMethod === 'GET') {
        opt.headers["If-None-Match"] = mem[opt.uri].etag;
      }

      var reqInfo = {
        url: opt.uri,
        method: requestMethod,
        accept: opt.headers.Accept
      };

      neat({ request: reqInfo });

      sendRequest(this, opt, requestMethod);
    }
  }
}

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
  neat(this.json);
};

exports.what = function () {
  neat(this.json);
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

exports.look = function() {
  neat(this.siren.properties);
};

exports.text = function() {
  neat(this.body);
}