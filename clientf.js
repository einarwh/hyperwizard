var request = require('request');
var http = require('http');
var prettyjson = require('prettyjson');
var fs = require('fs');

var mem = { history: [] };

if (typeof String.prototype.startsWith !== 'function') {
  String.prototype.startsWith = function (str) {
    return this.lastIndexOf(str, 0) === 0
  };
}

async function handleClientError(self, response) {
  const text = await response.text();
  var info = {
    status: self.status,
    error: text
  };
  neat({ response: info});
}

function handlePlace(self, url, text, contentType) {
  self.at = url;
  self.where = url;
  self.body = text;
  if (contentType.startsWith('application/vnd.siren+json')) {
    const json = JSON.parse(text);
    self.json = json;
    self.siren = json;
  }
  else if (contentType.startsWith('application/json')) {
    self.json = JSON.parse(text);
  }
}

async function handle200OK(self, url, requestOptions, response) {
  const entry = { url: url, requestOptions: requestOptions };
  mem.history.push(entry);
  const text = await response.text();
  const contentType = response.headers.get('content-type');
  handlePlace(self, url, text, contentType);
  var info = {
    status: self.status,
    etag: response.headers.get('etag'),
    'content-type': contentType
  };

  neat({ response: info });
}

function handle201Created(self, response) {
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination
  };
  neat({ response: info });
}

function handle202Accepted(self, response) {
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination
  };
  neat({ response: info });
}

async function handle204NoContent(self, response) {
  const text = await response.text();
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination,
  };
  if (text) {
    info.message = text;
  }

  neat({ response: info });
}

async function handle302Found(self, response) {
  const text = await response.text();
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination,
    message: text
  };
  neat({ response: info });
}

function handle303SeeOther(self, response) {
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination
  };
  neat({ response: info });
}

async function handle401Unauthorized(self, url, response) {
  mem.challenged = true;
  const text = await response.text();
  const contentType = response.headers.get('content-type');
  handlePlace(self, url, text, contentType);
  var info = {
    status: self.status,
    etag: response.headers.get('etag'),
    'content-type': contentType
  };

  const authenticate = response.headers.get("www-authenticate");
  if (authenticate) {
    info["www-authenticate"] = authenticate;
  }

  neat({ response: info });
}

async function handle403Forbidden(self, url, response) {
  mem.auth = undefined;
  const text = await response.text();
  const contentType = response.headers.get('content-type');
  handlePlace(self, url, text, contentType);
  var info = {
    status: self.status,
    etag: response.headers.get('etag'),
    'content-type': contentType
  };
  neat({ response: info });
}

async function handle418ImATeapot(self, response) {
  const text = await response.text();
  self.destination = response.headers.get('location');
  var info = {
    status: self.status,
    location: self.destination,
    message: text
  };
  neat({ response: info });
}

async function sendRequest(self, url, requestOptions) {

  try {
    const response = await fetch(url, requestOptions);

    self.statusCode = response.status;
    self.statusName = http.STATUS_CODES[response.status];
    self.status = self.statusCode + " " + self.statusName;
    self.json = null;
    self.siren = null;

    mem.challenged = false;

    switch (response.status) {
      case 200: 
        await handle200OK(self, url, requestOptions, response);
        break;
      case 201: 
        handle201Created(self, response);
        break;
      case 202: 
        handle202Accepted(self, response);
        break;
      case 204: 
        await handle204NoContent(self, response);
        break;
      case 302: 
        await handle302Found(self, response);
        break;
      case 303: 
        handle303SeeOther(self, response);
        break;
      case 400: 
        await handleClientError(self, response);
        break;
      case 401: 
        await handle401Unauthorized(self, url, response);
        break;
      case 403: 
        await handle403Forbidden(self, url, response);
        break;
      case 404: 
        await handleClientError(self, response);
        break;
      case 410: 
        await handleClientError(self, response);
        break;
      case 418: 
        await handle418ImATeapot(self, response);
        break;
      default: 
        console.log("NO HANDLER FOR " + response.status);
        console.log("???????????????");
        console.log(response);
        break;
    }
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }

}

var visit = function(self, url, requestOptions = { method: 'GET', headers: {}, redirect: 'manual'}) {
  console.log(`visit ${url}`);
  console.log(requestOptions);
  
  if (self.at) {
    requestOptions.headers['referer'] = self.at;
    requestOptions.headers['x-alt-referer'] = self.at;
  }

  var info = {
    url: url,
    method: requestOptions.method,
    accept: requestOptions.headers['accept'] || 'application/vnd.siren+json',
  }

  // Cumbersome recreation of original body from URLSearchParams.
  if (requestOptions.body) {
    var body = {}
    for (const [key, value] of requestOptions.body) {
      body[key] = value;
    }
    info.body = body;
  }

  // Add auth if provided.
 if (mem.auth !== undefined) {
    var authUser = mem.auth.username;
    var authPass = mem.auth.password;
    var authString = authUser + ":" + authPass;
    var encodedAuthString = Buffer.from(authString).toString('base64');
    var authHeaderValue = "Basic " + encodedAuthString;
    requestOptions.headers['authorization'] = authHeaderValue;
    info.authorization = authHeaderValue;
  }

  neat({ request: info });

  sendRequest(self, url, requestOptions);
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
    if (self.siren.actions === undefined) {
      return undefined;
    }

    return self.siren.actions[actionId];
  }

  return findAction(self, actionId);
};

var neat = function(json) {
  if (json !== undefined) {
    console.log(prettyjson.render(json));
  }
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
    "game.all()": "What you have to work with.",
    "game.actions()": "Things to do.",
    "game.body": "Response body.",
    "game.do(name[, json])": "To do things.",
    "game.do(number[, json])": "To do things.",
    "game.json": "Response body as JSON if applicable.",
    "game.links()": "Where to go.",
    "game.look()": "Alias for game.properties().",
    "game.go(link-number)": "To go somewhere.",
    "game.follow()": "To follow a link header.",
    "game.properties()": "What it looks like around you.",
    "game.siren": "Response body as Siren if applicable.",
    "game.text()": "Response body as text.",
    "game.to(url[, mimetype])": "Go to URL"
  };
  neat(hlp);
};

exports.action = function(actionName) {
    var a = lookupAction(this, actionName);
    if (a) {
      neat(a);
    }
};

function fieldHasDefaultValue(field) {
  var result = 'undefined' !== typeof field.value;
  return result;
}

exports.do = function(actionName, payload) {
    var self = this;

    // get url from action-name.
    var a = lookupAction(self, actionName);


    if (a) {

      var defaultMethod = "GET";

      var requestData = {
        uri: a.href,
      };

      if ('undefined' !== typeof payload) {
        if (typeof payload === 'string') {
          defaultMethod = payload;
        }
        else {
          if (mem.challenged === true) {
            var formDataKeys = Object.keys(payload);
            if (formDataKeys.length > 0) {
              var authDataKey = formDataKeys[0];
              var authDataVal = formData[authDataKey];
              var authString = authDataKey + ":" + authDataVal;
              var encodedAuthString = Buffer.from(authString).toString('base64')
              requestData.auth = encodedAuthString;
            }
          }
          requestData.body = new URLSearchParams(payload);
        }
      }
      else {
        if (a.fields !== undefined) {
          var withDefaultValue = a.fields.filter(fieldHasDefaultValue)
          var defaultFormData = {}
          for (var fIndex = 0, len = withDefaultValue.length; fIndex < len; fIndex++) {
            var fld = withDefaultValue[fIndex]
            defaultFormData[fld.name] = fld.value
          }
          requestData.form = defaultFormData          
        }
      }

      requestData.method = a.method || defaultMethod;
      requestData.headers = {};

      // also: whatever else necessary to make proper request.
      // includes: http method, request parameters.
      visit(self, a.href, requestData);
    } else {
      var acts = self.siren.actions;
      if (acts === undefined || acts.length === 0) {
        console.log('No actions available.');
      }
      else {
        console.log('No such action: ' + actionName);
        console.log('Available actions [' + acts.length + ']:');
        for (var i = 0, len = acts.length; i < len; i++) {
          console.log(" " + i + " : " + prettyjson.render(acts[i].name));
        }
      }
    }
};

exports.azure = function() {
    visit(this, 'http://hyperwizard.azurewebsites.net/hywit/void');
};

exports.void = function(acceptsFormat) {
  var acceptsHeader = acceptsFormat || "application/vnd.siren+json";
  var reqOptions = {
    headers: {
      'accept': acceptsHeader
    }
  };
  visit(this, 'http://localhost:1337/hywit/void', reqOptions);
};

exports.study = function() {
    visit(this, 'http://localhost:1337/hywit/1337/study');
};

exports.digit = function(symbol) {
  var requestData = {
    uri: 'http://localhost:1337/number',
    method: "POST",
    form: { "symbol": symbol }
  };

  visit(this, requestData, 'text/plain');
};

exports.number = function(symbol) {
  visit(this, 'http://localhost:1337/number', 'text/plain');
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

exports.auth = function(rlm, user, pass) {
  mem.auth = { realm: rlm, username: user, password: pass };
}

exports.back = function() {
  if (mem.history.length > 0) {
    mem.history.pop();
    if (mem.history.length > 0) {
      const entry = mem.history[mem.history.length - 1];
      const url = entry.url;
      const requestOptions = entry.requestOptions;
      if (mem[url] && requestOptions.method === 'GET') {
        requestOptions.headers["If-None-Match"] = mem[url].etag;
      }
      visit(this, url, requestOptions);
    }
  }
}

exports.follow = function() {
    var self = this;
    if (self.destination) {
      console.log("Following location header to destination " + self.destination);
      visit(self, self.destination);
    }
    else {
      console.log('No destination set through location header.');
    }
};

exports.all = function () {
  neat(this.json);
};

exports.what = function () {
  neat(this.json);
};

exports.actions = function () {
  neat(this.siren?.actions);
};

exports.links = function () {
  neat(this.siren?.links);
};

exports.properties = function() {
  neat(this.siren?.properties);
};

exports.look = function() {
  neat(this.siren?.properties);
};

exports.text = function() {
  neat(this.body);
}
