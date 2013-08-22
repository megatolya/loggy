var server = require('./server'),
    prompt = require('prompt'),
    fs = require('fs'),
    path = require('path');

/*
 * @todo make it flexible
 * @const
 * @type number
 */
var port = 8000;

var cacheFile = path.join(process.env.HOME, '.loggy');

// TODO make utils
function readFile(file) {
    return fs.readFileSync(path.resolve(file), 'utf8');
}

function start(cache) {
    server.start(path.resolve(cache.logpath), port);
    console.log('point your browser at http://localhost:' + port);
}

try {
    var cache = readFile(cacheFile);

    cache = JSON.parse(cache);
    start(cache);
} catch (err) {
    console.log(err);
    prompt.start();
    prompt.get(['path'], function (err, result) {
        if (err)
            process.exit(0);

        if (!result.path) {
            console.log('no path provided');
            process.exit(1);
        } else {
            cache = {logpath: result.path};
            fs.writeFileSync(cacheFile, JSON.stringify(cache), 'utf8');
            start(cache);
        }
    });
}

