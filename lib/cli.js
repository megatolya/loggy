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

var isUrl = global.isUrl = /(http|ftp|https):\/\/[\w\-_]+([\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

var cacheFile = path.join(process.env.HOME, '.loggy');

function start(cache) {
    if (!isUrl.test(cache.logPath))
        cache.logPath = path.resolve(cache.logPath);
    server.start(cache.logPath, port);
    console.log('point your browser at http://localhost:' + port);
}

if (process.argv[2] === 'new') {
    try {
        fs.unlinkSync(cacheFile);
    } catch(err) {}
} else if (process.argv[2] === 'clear') {
    try {
        return fs.unlinkSync(cacheFile);
    } catch(err) {} finally {
        return;
    }
}

try {
    var cache = fs.readFileSync(path.resolve(cacheFile), 'utf8');;

    cache = JSON.parse(cache);
    start(cache);
} catch (err) {
    console.log(err.message);
    prompt.start();
    prompt.get(['path'], function (err, result) {
        if (err)
            process.exit(0);

        if (!result.path) {
            console.log('no path provided');
            process.exit(1);
        } else {
            cache = {logPath: result.path};
            fs.writeFileSync(cacheFile, JSON.stringify(cache), 'utf8');
            start(cache);
        }
    });
}
