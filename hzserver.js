var express = require('express');
var app = express();

//app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

var adventures = {};

function init_state(adv_id) {
  var mirrors = [1, 2, 3, 4, 5, 6, 7];
  var unbreakable = Math.floor((Math.random()*mirrors.length)+1); 
  var state = {
    "id": adv_id,
    "mirrors": mirrors,
    "broken_mirrors": [],
    "unbreakable": unbreakable,
    "room": false
  };

  return state;
}

adventures[1337] = init_state(1337);

function hylink(relative) {
  return 'http://localhost:3000/hywit/' + relative;
}

function advlink(adv_id, relative) {
  return hylink(adv_id + '/' + relative);
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

app.get('/odysseus', function(req, res) {
  console.log(__dirname);
  res.sendfile(__dirname + '/odysseus.html');
});

app.post('/odysseus', function(req, res) {
  var entrypoint = req.body.entrypoint;
  console.log("Entrypoint: " + entrypoint);
  //res.send("Hello: " + entrypoint);
  console.log(__dirname);
  res.sendfile(__dirname + '/placeholder.html');
});

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

  console.log(adventures[adv_id]);
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

app.get('/hywit/:adv_id/hall', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }
  
  console.log(adventures[adv_id]);
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('hill');
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
  
  console.log(adventures[adv_id]);
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('study');
  var siren = { "class": [ "location" ],
    "properties": { 
      "name": "The Wizard’s Study", 
      "description": "You have entered the Wizard’s Study. Luckily, the Wizard is not in, or he would surely have deleted you. This means that you have conquered the Wizard’s Tower. Congratulations! You may pick a prize, by choosing a book from the Wizard’s shelf. Choose wisely."
    },
    "actions": [ 
      { "name": "take-first-book", 
        "title": "Take 'Plain JSON REST APIs’", "method": "POST",
        "href": alink("study/books/1") },
      { "name": "take-second-book", 
        "title": "Take 'Level 2 REST from outer space'", "method": "POST",
        "href": alink("study/books/2") },
      { "name": "take-third-book", 
        "title": "Take 'No REST till Hypermedia!'", "method": "POST",
        "href": alink("study/books/3") }
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

  var book_id = parseInt(req.params.book_id, 10);
  var siren;
  if (book_id === 3) {
    console.log("All is well.");
    siren = { "class": [ "location" ],
      "properties": { 
        "name": "No REST till Hypermedia!", 
        "description": "That's right. You may return to The Magical Void with your prize."
      },
      "links": [
        { "rel": [ "return" ], "href": hylink('void') } 
      ]
    };
    res.status(200).send(JSON.stringify(siren));
  }
  else if (book_id === 1 || book_id === 2) {
    siren = { "class": [ "location" ],
      "properties": { 
        "name": "Bad ending!", 
        "description": "Well, that's unfortunate. You see, without hyperlinks, you're just stuck here forever."
      }
    };
    res.status(200).send(JSON.stringify(siren));
  }
  else {
    console.log("Unacceptable book id " + book_id);
    res.status(400).send();
  }
});

app.get('/hywit/:adv_id/mirrors', function(req, res){
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
    return;
  }
  
  console.log(adventures[adv_id]);
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var self_link = alink('hill');
  
  var smash_mirror = function (mirr) {
    return { 
      "name": "smash-mirror",
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

  var smash_actions = [];
  var links = [];

  for (var i=0, len=adv_state.mirrors.length; i<len; i++)
  {
    var mrr = adv_state.mirrors[i];
    if (mrr === adv_state.unbreakable) {
      console.log("Cannot break " + mrr);
    }
    else {
      smash_actions.push(smash_mirror(mrr));
    }
    links.push(look_mirror(mrr));
  }

  links.unshift(
    { "rel": [ "self" ], "href": self_link },
    { "rel": [ "move", "north" ], "href": alink("room") },
    { "rel": [ "move", "west" ], "href": alink("hall") });

  var siren = { "class": [ "location" ],
    "properties": { 
      "name": "The Mirror Room", 
      "description": "You’re in a room of mirrors. You see infinite variations of yourself disappearing into the nowhere. Somewhere in the distance you even see your own image upsides-down. It is rather confusing. There’s a door to the north and to the west."
    },
    "actions": smash_actions,
    "links": links
  };

  res.contentType("application/vnd.siren+json");
  res.send(JSON.stringify(siren));
});

app.post('/hywit/:adv_id/mirrors/:mirror', function(req, res) {
  console.log("enter mirror?");
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  console.log(adv_state);

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

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
  console.log("delete?");
  var adv_id = req.params.adv_id;
  var adv_state = adventures[adv_id];
  var mirror = parseInt(req.params.mirror, 10);

  if ('undefined' === typeof adv_state) {
    res.status(404).send();
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

  console.log("deleted " + mirror);
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };

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

  console.log(adv_state);

  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
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
  var alink = function (relative) {
    return advlink(adv_id, relative);
  };
  var master = req.body.master;
  var self_link = alink('tower');

  if ("Edsger" === master) {
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
        { "rel": [ "previous" ], "href": self_link }
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
  console.log(orientation);

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
  console.log('hello');
  var adv_id = s4();
  adventures[adv_id] = init_state(adv_id);
  var url = hylink(adv_id + '/hill');
  res.status(201).location(url).send();
});

app.listen(3000);