var repl = require('repl').start({});

repl.context['server'] = require('./hzserver.js');
repl.context['siren']= require('./siren.js');

