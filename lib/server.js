var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    chokidar = require('chokidar'),
    oldLogs = [],
    sockets = [];

/*
 * @todo make it flexible
 * @const
 * @type regex
 */
var LOGS_REGEX = /^\s*([0-9]{2}:[0-9]{2})\s+(\w*)\s+(\w+)\s+(\w+)$/;

function emit(event, data) {
    sockets.forEach(function(socket) {
        socket.emit(event, data);
    });
}

function getLogs(logpath, saveOldLogs) {
    var raw = fs.readFileSync(logpath, 'utf8'),
        lines = raw.split('\n'),
        logs = [];

    lines.forEach(function(line) {
        if (!line.trim())
            return;

        var match = LOGS_REGEX.exec(line);

        match.length && match.shift();
        delete match.index;
        delete match.input;

        logs.push(match);
    });

    if (!saveOldLogs)
        oldLogs = logs.slice(0);

    return logs;
}

module.exports.start = function(logpath, port) {
    // FIXME вынести отдельно
    var watcher = chokidar.watch(logpath);

    watcher.on('change', function() {
        var logs = getLogs(logpath, true);
        logs.splice(0, oldLogs.length);

        // FIXME убрать, когда будет jade на клиенте
        var html = require('jade').render(fs.readFileSync('./lib/server/views/logs.jade', 'utf8'), {
            logs: logs,
            filename: './lib/server/views/logs.jade'
        }, function(err, html) {
            if (err)
                return;

            emit('newLog', html);
        });
        getLogs(logpath);
    });

    io.sockets.on('connection', function (socket) {
        sockets.push(socket);
    });

    app.use(express.bodyParser());
    app.use('/static', express.static('./lib/server/static'))
    app.set('views', './lib/server/views');
    app.set('view engine', 'jade');
    app.get('/', function(req, res) {
        res.render('index', {
            header: path.resolve(logpath)
        });
    });
    app.get('/logs', function(req, res) {
        var logs = getLogs(logpath);
        res.render('logs', {
            logs: logs
        });
    });
    server.listen(port);
};

module.exports.getLogs = getLogs;

