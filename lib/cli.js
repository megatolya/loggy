var program = require('commander'),
    server = require('./server');

/*
 * @todo make it flexible
 * @const
 * @type number
 */
port = 8000;

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-c, --config [path]', 'configuration file path')
    .parse(process.argv);

//if (program.args.length > 0) {
    //program.help();

server.start(require('path').resolve('./test/src/fake.log'), port);
require('child_process').exec('open http://localhost:' + port);

