var repl = require('repl').start({});

repl.context.server = require('./server.js');
repl.context.game = require('./client.js');
