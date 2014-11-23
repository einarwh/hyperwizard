var express = require('express');
var app = express();
var fs = require('fs');

app.use('/fudd', express.static(__dirname + '/fudd'));
app.use('/images', express.static(__dirname + '/images'));

app.use(express.urlencoded());
app.use(express.json());

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var adventures = {};
var masterWizardName = "Edsger";

function book_name(index) {
  if (index === 1) {
    return "Plain JSON REST APIs for fun and profit";
  }
  if (index === 2) {
    return "Level 2 REST FTW";
  }
  if (index === 3) {
    return "No REST till Hypermedia!";
  }
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function get_reps() {
  var files = fs.readdirSync("reps");
  var reps = [];
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var suffixIndex = f.indexOf(".json");
    if (f.endsWith(".json")) {
      var resource = f.substring(0, f.length - ".json".length);
      reps.push(resource);
    }
  }
  return reps;
}

function has_rep(rep) {
  var reps = get_reps();
  for (var i = 0; i < reps.length; i++) {
    if (reps[i] === rep) {
      return true;
    }  
  }
  return false;
}

function init_state(adv_id) {
  var mirrors = [1, 2, 3, 4, 5, 6, 7];
  var unbreakable = Math.floor((Math.random()*mirrors.length)+1); 
  var state = {
    "id": adv_id,
    "timestamp": new Date().getTime(),
    "mirrors": mirrors,
    "broken_mirrors": [],
    "unbreakable": unbreakable,
    "room": false,
    "closed": true
  };

  return state;
}

var permanent_aid = 1337;

adventures[permanent_aid] = init_state(permanent_aid);

var local_port = 1337;

var base_url = 'http://localhost:' + local_port;

var port = process.env.PORT || local_port;

if (process.env.PORT) {
  base_url = 'http://hyperwizard.azurewebsites.net';
}

var game_url = base_url + '/hywit/';

function hylink(relative) {
  return game_url + relative;
}

function advlink(adv_id, relative) {
  return hylink(adv_id + '/' + relative);
}

function imglink(imgfile) {
  return base_url + '/images/' + imgfile;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function acceptsHtml(req) {
  return req.headers.accept.indexOf("text/html") >= 0;
}

function toActionForm(act) {
  var s = "";
  var field;
  var httpMethod = "POST";
  if (act.method === "GET") {
    httpMethod = "GET";
  }
  
  s += "<p>" + act.title + '</p>';
  s += '<form action="' + act.href + '" method="' + httpMethod + '">';
  
  if ('undefined' === typeof act.method) {
    s += '<select name="httpmethod">';
    s += '<option value="GET">GET</option>';
    s += '<option value="POST">POST</option>';
    s += '<option value="PUT">PUT</option>';
    s += '<option value="DELETE">DELETE</option>';
    s += '<option value="PATCH">PATCH</option>';
    s += '</select>';
  }

  if ('undefined' !== typeof act.fields) {
    for (var i = 0, len = act.fields.length; i < len; i++) {
      field = act.fields[i]; 
      s += field.name + '<br />';
      s += '<input type="' + field.type + '" name="' + field.name + '" />';
      s += '<br />';
    }
  }

  s += '<br />';
  s += '<input type="submit" value="Submit" />';

  s += '</form>';
  return s;
}

function toHtml(srn) {
  var s = "";
  var props = srn.properties;
  var links = srn.links;
  var alink;
  var actions = srn.actions;
  var act;
  var title = "Hypermedia in the Wizard's Tower";
  if ('undefined' !== typeof srn.title) {
    title += ": " + srn.title;
  }

  s += "<!DOCTYPE html>";
  s += "<html>";
  s += "<head>";
  s += "<title>" + title + "</title>";
  s += '<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">';
  s += "</head>";

  s += "<body>";

  var imageLinks = [];
  if ('undefined' !== typeof links) {
    for (var i = 0, len = links.length; i < len; i++) {
      alink = links[i]; 
      if ('undefined' !== typeof alink.type) {
        if (alink.rel.indexOf("view") >= 0) {
          imageLinks.push(alink);
        }
      }
    }
  }

  var imgCount = imageLinks.length;
  if (imgCount > 0) {
    s += '<div class="images">';
    for (var imgIndex = 0; imgIndex < imgCount; imgIndex++) {
      var animage = imageLinks[imgIndex];
      s += '<img src="' + animage.href + '" />';
    }
    s += '</div>'; 
  }

  s += "<div>";
  
  s += '<p class="name">' + props.name + '</p>';
  s += '<p class="description">' + props.description + '</p>';
  var keys = Object.keys(props);
  for (var k = 0; k < keys.length; k++) {
    var propname = keys[k];
    if (propname !== 'name' && propname !== 'description') {
      s += '<p class="' + propname + '">' + propname + ": " + props[propname] + '</p>';
    }
  }

  s += "</div>";

  if ('undefined' !== typeof links) {
    s += '<div class="links">';
    s += '<p>Places to go:</p>'
    s += '<ul>';

    for (var i = 0, len = links.length; i < len; i++) {
      alink = links[i]; 
      var linkText = alink.title || alink.rel;
      s += '<li>' + '<a href="' + alink.href + '">' + linkText + '</a>' + '</li>';
    }

    s += '</ul>';
    s += '</div>';
  }

  if ('undefined' !== typeof actions) {
    s += '<div class="actions">';
    s += '<p>Things to do:</p>'
    s += '<ul>';

    for (var i = 0, len = actions.length; i < len; i++) {
      act = actions[i]; 
      s += '<li>' + toActionForm(act) + '</li>';
    }

    s += '</ul>';
    s += '</div>';
  }

  s += "</body>";
  s += "</html>";

  return s;
}

function toResponse(req, res, siren, statusCode) {
  var sc = statusCode || 200;
  var ct = "application/vnd.siren+json";
  var transform = JSON.stringify;

  if (acceptsHtml(req)) {
    ct = "text/html";
    transform = toHtml;
  }

  res.contentType(ct);
  res.status(sc).send(transform(siren));
}

function toJsonResponse(req, res, siren, statusCode) {
  var sc = statusCode || 200;
  var ct = "application/json";
  var transform = JSON.stringify;

  if (acceptsHtml(req)) {
    ct = "text/html";
    transform = toHtml;
  }

  res.contentType(ct);
  res.status(sc).send(transform(siren));
}

app.get('/', function(req, res) {
  res.contentType("text/plain");
  res.send("Visit http://github.com/einarwh/hyperwizard");
});

app.get('/hywit/void', function(req, res) {
  var voidUrl = hylink('void');
  if (req.headers.accept === "text/plain") {
    var text = "The Magical Void\n\nYou're in The Magical Void, a place beyond space and time. This is where adventures begin.\n\nTo start a new adventure, post name, class and race to " + voidUrl;
    res.contentType(req.headers.accept);
    res.send(text);
    return;
  }
  else if (req.headers.accept === "application/json") {
    var plainJson = {
      "title": "The Magical Void",
      "description": "You're in The Magical Void, a place beyond space and time. This is where adventures begin.",
      "link": 
      {
        "title": "Start a new adventure",
        "url": voidUrl
      }
    };
    res.contentType(req.headers.accept);
    res.send(JSON.stringify(plainJson));
    return;
  }
	var siren = { 
  "title": "The Magical Void",
  "class": [ "location" ],
  "properties": { 
      "name": "The Magical Void", 
      "description": "You\'re in The Magical Void, a place beyond space and time. This is where adventures begin.",
  },
  "actions": [
    { "name": "start-adventure", 
      "method": "POST",
      "title": "Start adventure",
      "href": hylink('void'),
      "fields": [
        { "name": "name", "type": "text" },
        { "name": "class", "type": "text" },
        { "name": "race", "type": "text" }
      ] }
  ],
  "links": [
    { "rel": [ "self" ], "href": hylink('void') }
  ]
  };

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/hall/teapot', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  res.status(418).location(alink('hall')).send();
});

app.get('/hywit/:adv_id/lake', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  var self_link = alink('lake');
  var siren = {
    "title": "The Lake",
    "class": [ "location" ],
    "properties": { 
      "name": "The Lake", 
      "description": ""
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "north" ], "title": "Follow the brook north.", "href": alink("brook") }  
    ]
  };

  if (undefined === adv_state.boat) {
    siren.properties.description = "You're standing on the shore of a lake. There's small island in the middle, where you can see a rowing boat tied to a pole. Unfortunately, the current is too strong for you to venture swimming over. Every now and then, the head of an otter emerges from the water.";

    if (undefined === adv_state.otter) {
      var otter = { 
        name: "send-otter", 
        title: "Send the otter to fetch the boat.", 
        method: "POST",
        href: self_link
      }

      siren.actions = [ otter ];
    }
    else {
      siren.links.push({
        "rel": [ "look" ], 
        "title": "Look at the otter.", 
        "href": alink('otter')
      });
    }
  }
  else {
    siren.properties.description = "You're standing on the shore of a lake. There's small island in the middle. There is a boat here. Every now and then, the head of an otter emerges from the water.";

    var row = { 
      "rel": [ "move" ], 
      "title": "Row to the island.", 
      "href": alink('island') 
    };

    siren.links.push(row);
  }

  toResponse(req, res, siren);
});

app.post('/hywit/:adv_id/lake', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  adv_state.otter = Date.now() / 1000;

  res.status(202).location(alink('otter')).send();
});

app.get('/hywit/:adv_id/otter', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  var current = Date.now() / 1000;
  var elapsed = current - adv_state.otter;
  var totalTime = 60;
  var halfTime = 30;
  var otterReturned = elapsed > 60;
  if (otterReturned) {
    adv_state.boat = current;
    res.status(303).location(alink('lake')).send();
    return;
  }

  var self_link = alink('otter');
  var siren = {
    "title": "The Swimming Otter",
    "class": [ "entity" ],
    "properties": { 
      "name": "The Swimming Otter", 
      "description": "The otter is on its way to fetch the rowing boat. It has spent " + Math.floor(elapsed) + " seconds so far."
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "previous" ], "href": alink('lake') },
      { "rel": [ "view" ], "href": imglink("otter.png"), type: "image/png" }
    ]
  };

  if (elapsed > halfTime) {
    siren.properties.description += " Currently, it is on the way back, towing the boat.";
  }
  else {
    siren.properties.description += " Currently, it is swimming towards the island.";
  }

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/hall', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }
  
  var self_link = alink('hall');
  var siren = {
    "title": "The Great Hall",
    "class": [ "location" ],
    "properties": { 
      "name": "The Great Hall", 
      "description": "You find yourself in a great hall. There's a table here. You see some cutlery of no interest to you, as well as a beautiful silver tea pot. Could it be magical? A door leads to the east from here."
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "east" ], "href": alink("mirrors"), "title": "Go through the door to the east." },
      { "rel": [ "move", "exit" ], "href": alink("entrance"), "title": "Exit the tower." },
      { "rel": [ "take" ], "href": alink("hall/teapot"), "title": "Take the teapot." }
    ]
  };

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/grue', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  if (undefined === adv_state.grue) {
    var act = {
      "name": "kill-grue",
      "title": "Light a handy torch lying nearby.",
      "href": alink('gruesome')
    }
    var siren = {
      "title": "A terrifying grue.",
      "class": [ "location" ],
      "properties": {
        "name": "A terrifying grue.",
        "description": "Uh-oh. A terrifying grue has appeared in front of you. This could be fatal, unless you know your HTTP methods."
      },
      "actions": [ act ],
      "links": [       
        { "rel": [ "view" ], "href": imglink("grue.png"), type: "image/png" }
      ]
    };
    toResponse(req, res, siren);
  } else {
    res.status(410).send("The grue has vanished permanently.");
  }
});

function killGrue(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  adv_state.grue = "dead";
  res.status(204).location(alink('brook')).send();
}

function eatenByGrue(res) {
  res.status(405).send("You've been eaten by a grue.");  
}

app.post('/hywit/:adv_id/gruesome', function(req, res) {
  var verb = req.body.httpmethod;
  if (verb === 'DELETE') {
    killGrue(req, res);
    return;
  }
 
  eatenByGrue(res);
});

app.get('/hywit/:adv_id/gruesome', function(req, res) { 
  eatenByGrue(res);
});

app.patch('/hywit/:adv_id/gruesome', function(req, res) { 
  eatenByGrue(res);
});

app.delete('/hywit/:adv_id/gruesome', function(req, res) {
  killGrue(req, res);
});

app.get('/hywit/:adv_id/study', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }
  
  var self_link = alink('study');

  var book_action = function(book_number) {
    return { 
      "name": "take-book-" + book_number, 
      "title": "Take '" + book_name(book_number) + "'", 
      "method": "POST",
      "href": alink("study/books/" + book_number) 
    };
  };

  var siren = { "class": [ "location" ],
    "title": "The Wizard's Study",
    "properties": { 
      "name": "The Wizard's Study", 
      "description": "You have entered the Wizard's Study. Luckily, the Wizard is not in, or he would surely have deleted you. This means that you have conquered the Wizard's Tower. Congratulations! You may pick a prize, by choosing a book from the Wizard's shelf. Choose wisely."
    },
    "actions": [ 
      book_action(1),
      book_action(2),
      book_action(3)
    ],
    "links": [
      { "rel": [ "self" ], "href": self_link } 
    ]
  };

  toResponse(req, res, siren);
});

app.post('/hywit/:adv_id/study/books/:book_id', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  var book_id = parseInt(req.params.book_id, 10);
  var siren;
  if (book_id === 3) {
    siren = { 
      "class": [ "location" ],
      "title": book_name(book_id),
      "properties": { 
        "name": book_name(book_id), 
        "description": "Well done. You may return to The Magical Void with your prize."
      },
      "links": [
        { "rel": [ "return" ], "href": hylink('void'), "title": "Return to the void." } 
      ]
    };

    toResponse(req, res, siren);
  }
  else if (book_id === 1 || book_id === 2) {
    var plainJson = { 
      "book": book_name(book_id), 
      "text": "Well, that's unfortunate. You see, without hyperlinks, you're just stuck here forever."
    };

    toJsonResponse(req, res, plainJson);
  }
  else {
    res.status(400).send();
    return;
  }
});

app.get('/hywit/:adv_id/mirrors/:mirror', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  var mirror = parseInt(req.params.mirror, 10);

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  } 

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  if (adv_state.mirrors.indexOf(mirror) < 0) {
    if (adv_state.broken_mirrors.indexOf(mirror) < 0) {
      res.status(404).send();
    }
    else {
      res.status(410).send();
    }
    return;
  } 

  var desc = "You see a reflection of yourself.";

  if (mirror === adv_state.unbreakable) {
    desc = "You see a reflection of yourself, upside-down.";
  }

  var self_link = alink('mirrors/' + mirror);

  var siren = { "class": [ "location" ],
    "title": "Mirror #" + mirror,
    "properties": { 
      "name": "Mirror #" + mirror, 
      "description": desc
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "previous" ], "href": alink('mirrors') } 
    ]
  };

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/mirrors', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }
  
  var self_link = alink('mirrors');
  
  var smash_mirror = function (mirr) {
    return { 
      "name": "smash-mirror-" + mirr,
      "title": "Smash the mirror!",
      "method": "DELETE",
      "href": alink("mirrors/" + mirr) 
    };
  };

  var look_mirror = function (mirr) {
    return { 
      "rel": [ "look" ],
      "title": "Look into the mirror.",
      "href": alink("mirrors/" + mirr) 
    };
  };

  var mirror_actions = [];
  var links = [];

  for (var i=0, len=adv_state.mirrors.length; i<len; i++)
  {
    var mrr = adv_state.mirrors[i];
    if (mrr !== adv_state.unbreakable) {
      mirror_actions.push(smash_mirror(mrr));
    }
    links.push(look_mirror(mrr));
  }

  var desc = "You're in a room of mirrors. You see infinite variations of yourself disappearing into nowhere. Somewhere in the distance you even see your own image upside-down. It is rather confusing. There are doors to the north and to the west.";
  if (mirror_actions.length === 0) {
    desc = "You're in a room with a single mirror. There are doors to the north and to the west.";
    var enter_action = { 
      "name": "enter-mirror-" + adv_state.unbreakable,
      "title": "Enter the mirror!",
      "method": "POST",
      "href": alink("mirrors/" + adv_state.unbreakable) 
    };
    mirror_actions.push(enter_action);
  } 

  links.unshift(
    { "rel": [ "self" ], "href": self_link },
    { "rel": [ "move", "north" ], "title": "Go north.", "href": alink("room") },
    { "rel": [ "move", "west" ], "title": "Go east.", "href": alink("hall") });

  var siren = { "class": [ "location" ],
    "title": "The Mirror Room",
    "properties": { 
      "name": "The Mirror Room", 
      "description": desc
    },
    "actions": mirror_actions,
    "links": links
  };

  toResponse(req, res, siren);
});

app.post('/hywit/:adv_id/mirrors/:mirror', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  var mirror = parseInt(req.params.mirror, 10);

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  if (mirror !== adv_state.unbreakable) {
    if (adv_state.mirrors.length > 1) {
      breakMirror(req, res);
      return;
    }
    res.status(405).send();
    return;
  }

  adv_state.room = !adv_state.room;

  res.status(302).location(alink('mirrors')).send();
});


function breakMirror(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  var mirror = parseInt(req.params.mirror, 10);

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  } 

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  if (adv_state.mirrors.indexOf(mirror) < 0) {
    if (adv_state.broken_mirrors.indexOf(mirror) < 0) {
      res.status(404).send();
    }
    else {
      res.status(410).send();
    }
    return;
  } 

  if (mirror === adv_state.unbreakable) {
    res.status(405).send();
    return;
  }

  adv_state.broken_mirrors.push(mirror);

  var index = adv_state.mirrors.indexOf(mirror);
  if (index > -1) {
    adv_state.mirrors.splice(index, 1);
  }

  res.status(204).location(alink('mirrors')).send();  
}

app.delete('/hywit/:adv_id/mirrors/:mirror', function(req, res) {
  breakMirror(req, res);
}); 

app.get('/hywit/:adv_id/room', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  if (adv_state.closed) {
    res.status(302).location(alink('hill')).send();
    return;
  }

  var self_link = alink('room');

  var siren = {
    "title": "The Unassuming Room",
    "class": [ "location" ],
    "properties": { 
      "name": "The Unassuming Room", 
      "description": "You're in a plain room. It's not particularly interesting, but the HTTP acolyte in you senses something eerie. There's a door to the south. You also notice that there is a square hole in the ceiling."
    },
    "links": [ 
      { "rel": [ "self" ], "href": self_link }, 
      { "rel": [ "move", "south" ], "href": alink('mirrors'), "title": "Go back to the room of mirrors." } 
    ]
  };

  if (adv_state.room) {
    siren.properties.description = "You're in a plain room. There's a door to the south. More interestingly, there is also a square hole in the floor.";
    siren.links.push({ "rel": [ "move", "down" ], "href": alink("study"), "title": "Enter the hole in the floor." });
  }

  toResponse(req, res, siren);
});

var ltrSignText = 'thetowerofthemightywizardedsgeristhatway';
var rtlSignText = ltrSignText.reverse();
var signText = rtlSignText;
var ltrOrientation = 'Left-to-right';
var rtlOrientation = 'Right-to-left';
var signOrientation = rtlOrientation;

app.get('/hywit/:adv_id/sign', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('sign');
  var signDesc = "The sign says '" + signText + "'.";
  var siren = {
    "title": "The Mysterious Sign",
    "class": [ "entity" ],
    "properties": { 
      "name": "The Mysterious Sign", 
      "description": signDesc,
      "orientation": signOrientation 
    },
    "actions": [ 
      { 
        "name": "turn-sign", 
        "title": "Reorient the sign.",
        "method": "PUT",
        "href": self_link,
        "fields": [
          { "name": "orientation", "type": "text" }
        ]
      }
    ],
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "previous"], "href": alink("island") }
    ]
  };

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/entrance', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('entrance');
  var siren = {
    "title": "The Tower Entrance",
    "class": [ "location" ],
    "properties": { 
      "name": "The Tower Entrance", 
      "description": "You're standing in front of the tower of the mighty wizard. There's a great oak door in front of you. The door has no door knob. A skull floats ominously in front of the door.",
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "south" ], "href": alink("hill"), "title": "Go south to the hill." },
      { "rel": [ "move", "enter" ], "href": alink("tower"), "title": "Enter the tower." } 
    ]
  };

  toResponse(req, res, siren);
});

app.get('/hywit/:adv_id/tower', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  var self_link = alink('tower');
  var siren = {
    "title": "The Guardian Skull",
    "class": [ "challenge" ],
    "properties": { 
      "name": "The Guardian Skull", 
      "description": "The eyes of the floating skull ignite and a voice booms 'Who is my master?', sending shivers down your spine.",
    },
    "actions": [ 
      {
        "name": "answer-skull",
        "title": "State the name of the skull's master.",
        "method": "POST",
        "href": self_link,
        "fields": [
          { "name": "master", "type": "text" }
        ]
      }
    ],
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "previous" ], "href": alink("entrance") },
      { "rel": [ "view" ], "href": imglink("skull.png"), type: "image/png" }
    ]
  };

  toResponse(req, res, siren, 401);
});

app.post('/hywit/:adv_id/tower', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  
  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  
  var master = req.body.master;

  if (masterWizardName === master) {
    adv_state.closed = false;
    res.status(302).location(alink('hall')).send();
  }
  else {
    var siren = {
      "title": "The Guardian Skull",
      "class": [ "challenge" ],
      "properties": { 
        "name": "The Guardian Skull", 
        "description": "The skull shrieks 'Wrong answer', and the red glow in its eyes fades out. ",
      },
      "links": [
        { "rel": [ "previous" ], "href": alink('entrance') }
      ]
    };

    toResponse(req, res, siren, 403);
  }
});

function turnSign(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('sign');
  var orientation = req.body.orientation;

  if (orientation === rtlOrientation || orientation === ltrOrientation) {
    // Legal value at least!
    if (orientation === signOrientation) {
      console.log("No changes to be made.");
    }
    else {
      if (orientation === rtlOrientation) {
        signOrientation = rtlOrientation;
        signText = rtlSignText;
      }
      else {
        // This is the legible way.
        adv_state.wizardname = masterWizardName;
        signOrientation = ltrOrientation;
        signText = ltrSignText;
      } 
    }

    var signDesc = "The sign says '" + signText + "'.";
    var siren = {
      "title": "The Mysterious Sign",
      "class": [ "entity" ],
      "properties": { 
        "name": "The Mysterious Sign", 
        "description": signDesc,
        "orientation": signOrientation 
      },
      "actions": [ 
        { 
          "name": "turn-sign", 
          "title": "Reorient the sign.",
          "method": "PUT",
          "href": self_link,
          "fields": [
            { "name": "orientation", "type": "text" }
          ]
        }
      ],
      "links": [
        { "rel": [ "self" ], "href": self_link },
        { "rel": [ "previous"], "href": alink("island") }
      ]
    };

    toResponse(req, res, siren);
  }
  else {
    res.status(400).send("Illegal value for 'orientation'." + orientation);
  }    
}

app.put('/hywit/:adv_id/sign', function(req, res) {
  turnSign(req, res);
});

app.post('/hywit/:adv_id/sign', function(req, res) {
  turnSign(req, res);
});

app.post('/hywit/void', function(req, res) {
  var adv_id = s4();
  var ts = new Date().getTime();
  var one_hour_in_millis = 60*60*1000;
  var age_limit = 3 * one_hour_in_millis;
  var existing_states = 0;
  var max_existing_states = 20;

  for (var aid in adventures)
  {
    ++existing_states;
    var st = adventures[aid];
    var age = ts - st.timestamp;
    if (aid !== permanent_aid && age > age_limit) {
      adventures[aid] = undefined;
    }
  }

  if (existing_states >= max_existing_states) {
    res.status(503).send();
    return; 
  }

  adventures[adv_id] = init_state(adv_id);
  var url = hylink(adv_id + '/hill');
  res.status(201).location(url).send();
});

app.get('/hywit/:adv_id/:resource', function(req, res) {
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  var resource = req.params.resource;

  if (resource === 'brook') {

    var referer = req.headers['x-alt-referer'];
    if ('undefined' === typeof referer) {
      referer = req.headers.referer;
    } 

    if (referer !== undefined) {
      if (referer.endsWith('cave')) {
        if (undefined === adv_state.grue) {
          res.status(302).location(alink('grue')).send();
          return;
        }
      }
    } 
  }

  if (!has_rep(resource)) {
    res.status(404).send();
    return;
  }

  var self_link = alink(resource);

  fs.readFile("reps/" + resource + ".json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var siren = JSON.parse(data);

    if (siren.actions) {
      var numActions = siren.actions.length;
      for (var i = 0; i < numActions; i++) {
        var action = siren.actions[i];
        if (action.href === "self") {
          action.href = self_link;
        }
        else {
          action.href = alink(action.href);
        }
      }      
    }

    if (siren.links) {
      var numLinks = siren.links.length;
      for (var i = 0; i < numLinks; i++) {
        var hlink = siren.links[i];
        if (hlink.href === "self") {
          hlink.href = self_link;
        }
        else {
          hlink.href = alink(hlink.href);
        }
      }  
    }

    if (resource === 'hill') {
      if (adv_state.wizardname !== undefined) {
        console.log("replace!");
        siren.properties.description = siren.properties.description.replace("Unnamed Wizard", "Wizard " + masterWizardName);
      }
    }

    toResponse(req, res, siren);
  });
});

app.listen(port);
