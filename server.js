var express = require('express');
var app = express();

app.use(express.urlencoded());
app.use(express.json());

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

var adventures = {};

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

function init_state(adv_id) {
  var mirrors = [1, 2, 3, 4, 5, 6, 7];
  var unbreakable = Math.floor((Math.random()*mirrors.length)+1); 
  var state = {
    "id": adv_id,
    "mirrors": mirrors,
    "broken_mirrors": [],
    "unbreakable": unbreakable,
    "room": false,
    "closed": true
  };

  return state;
}

adventures[1337] = init_state(1337);

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

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

app.get('/hywit/void', function(req, res){
	var siren = { "class": [ "location" ],
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
        { "name": "race", "type": "text" },
        { "name": "gender", "type": "text" }
      ] }
  ],
  "links": [
    { "rel": [ "self" ], "href": hylink('void') }
  ]
};
  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
});

app.get('/hywit/:adv_id/hill', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

  var self_link = alink('hill');
  var siren = {
    "class": [ "location" ],
    "properties": { 
      "name": "The Green Hill", 
      "description": "You're on a grassy hill. Over yonder to the north, you see the outline of the Tower of the Mighty Unnamed Wizard. There's a faint clucking sound from a brook towards the east.",
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "east" ], "title": "Go east to the brook", "href": alink("brook") },
      { "rel": [ "move", "north" ], "title": "Go north to the entrance", "href": alink("entrance") }  
    ]
  };
  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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
    "class": [ "location" ],
    "properties": { 
      "name": "The Great Hall", 
      "description": "You find yourself in a great hall. There's a table here. You see some cutlery of no interest to you, as well as a beautiful silver tea pot. Could it be magical? A door leads to the east from here."
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "east" ], "href": alink("mirrors") },
      { "rel": [ "move", "exit" ], "href": alink("entrance") },
      { "rel": [ "take" ], "href": alink("hall/teapot") }
    ]
  };

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
});

app.get('/hywit/:adv_id/study', function(req, res){
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
    "properties": { 
      "name": "The Wizard’s Study", 
      "description": "You have entered the Wizard’s Study. Luckily, the Wizard is not in, or he would surely have deleted you. This means that you have conquered the Wizard’s Tower. Congratulations! You may pick a prize, by choosing a book from the Wizard’s shelf. Choose wisely."
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

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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
  console.log("Book: " + book_id);
  var siren;
  if (book_id === 3) {
    siren = { 
      "class": [ "location" ],
      "properties": { 
        "name": book_name(book_id), 
        "description": "Well done. You may return to The Magical Void with your prize."
      },
      "links": [
        { "rel": [ "return" ], "href": hylink('void') } 
      ]
    };
    res.contentType("application/vnd.siren+json");
    res.status(200).send(JSON.stringify(siren));
  }
  else if (book_id === 1 || book_id === 2) {
    siren = { "class": [ "location" ],
      "properties": { 
        "name": book_name(book_id), 
        "description": "Well, that's unfortunate. You see, without hyperlinks, you're just stuck here forever."
      }
    };
    res.contentType("application/vnd.siren+json");
    res.status(200).send(JSON.stringify(siren));
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
    "properties": { 
      "name": "Mirror #" + mirror, 
      "description": desc
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "previous" ], "href": alink('mirrors') } 
    ]
  };

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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

  var desc = "You’re in a room of mirrors. You see infinite variations of yourself disappearing into the nowhere. Somewhere in the distance you even see your own image upside-down. It is rather confusing. There’s a door to the north and to the west.";
  if (mirror_actions.length === 0) {
    desc = "You’re in a room with a single mirror. There’s a door to the north and to the west.";
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
    { "rel": [ "move", "north" ], "href": alink("room") },
    { "rel": [ "move", "west" ], "href": alink("hall") });

  var siren = { "class": [ "location" ],
    "properties": { 
      "name": "The Mirror Room", 
      "description": desc
    },
    "actions": mirror_actions,
    "links": links
  };

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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
    res.status(405).send();
    return;
  }

  adv_state.room = !adv_state.room;

  res.status(302).location(alink('mirrors')).send();
});


app.delete('/hywit/:adv_id/mirrors/:mirror', function(req, res) {
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
}); 

app.get('/hywit/:adv_id/brook', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('brook');
  var siren = {
    "class": [ "location" ],
    "properties": { 
      "name": "The Merry Clucking Brook", 
      "description": "You’re next to a lovely brook. There’s a sign here. You see a grassy hill to the west.",
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "west" ], "href": alink("hill") },
      { "rel": [ "look" ], "href": alink("sign") }
    ]
  };
  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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
    "class": [ "location" ],
    "properties": { 
      "name": "The Unassuming Room", 
      "description": "You're in a plain room. It's not particularly interesting, but the HTTP acolyte in you senses something eerie. There's a door to the south. You also notice that there is a square hole in the ceiling."
    },
    "links": [ 
      { "rel": [ "self" ], "href": self_link }, 
      { "rel": [ "move", "south" ], "href": alink('mirrors') } 
    ]
  };

  if (adv_state.room) {
    siren.properties.description = "You're in a plain room. There's a door to the south. More interestingly, there is also a square hole in the floor.";
    siren.links.push({ "rel": [ "move", "down" ], "href": alink("study") });
  }

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
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
    { "rel": [ "previous"], "href": alink("brook") }
  ]
};
  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
});

app.get('/hywit/:adv_id/entrance', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('entrance');
  var siren = {
    "class": [ "location" ],
    "properties": { 
      "name": "The Tower Entrance", 
      "description": "You're standing in front of the tower of the mighty wizard. There's a great oak door in front of you. The door has no door knob. A skull floats ominously in front of the door.",
    },
    "links": [
      { "rel": [ "self" ], "href": self_link },
      { "rel": [ "move", "enter" ], "href": alink("tower") } 
    ]
  };
  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
});

app.get('/hywit/:adv_id/tower', function(req, res){
  var adv_id = req.params.adv_id;
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('tower');
  var siren = {
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
    ]
  };
  res.contentType("application/vnd.siren+json");
  res.status(401).send(JSON.stringify(siren));
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

  if ("Edsger" === master) {
    adv_state.closed = false;
    res.status(302).location(alink('hall')).send();
  }
  else {
    var siren = {
      "class": [ "challenge" ],
      "properties": { 
        "name": "The Guardian Skull", 
        "description": "The skull shrieks 'Wrong answer', and the red glow in its eyes fades out. ",
      },
      "links": [
        { "rel": [ "previous" ], "href": alink('entrance') }
      ]
    };

    res.contentType("application/vnd.siren+json");
    res.status(403).send(JSON.stringify(siren));
  }
});

app.put('/hywit/:adv_id/sign', function(req, res) {
  var adv_id = req.params.adv_id;
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
        signOrientation = ltrOrientation;
        signText = ltrSignText;
      } 
    }

    var signDesc = "The sign says '" + signText + "'.";
    var siren = {
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
        { "rel": [ "previous"], "href": alink("brook") }
      ]
    };
    res.contentType("application/vnd.siren+json");
    res.send(JSON.stringify(siren));
  }
  else {
    res.status(400).send("Illegal value for 'orientation'." + orientation);
  }  
});

app.post('/hywit/void', function(req, res) {
  var adv_id = s4();
  adventures[adv_id] = init_state(adv_id);
  var url = hylink(adv_id + '/hill');
  res.status(201).location(url).send();
});

app.listen(port);