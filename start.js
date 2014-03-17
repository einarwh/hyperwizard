var repl = require('repl').start({});

repl.context.server = require('./hwserver.js');
repl.context.game = require('./hwclient.js');

