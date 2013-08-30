var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    chokidar = require('chokidar'),
    parser = require('./parser'),
    oldLogs = [],
    sockets = [];

// @todo use this
// require('./parser').processFile(filePath, function (data) {
//     
// });

function emit(event, data) {
    sockets.forEach(function(socket) {
        socket.emit(event, data);
    });
}

function getLogs(logpath, saveOldLogs) {
    var raw = readFile(logpath),
        lines = raw.split('\n'),
        logs = [];

    lines.forEach(function(line, i) {
        if (!line.trim())
            return;

        logs.push({
            id: i,
            line: line.split('\t')
        });
    });

    if (!saveOldLogs)
        oldLogs = logs.slice(0);

    return logs;
}

function readFile(file) {
    return fs.readFileSync(path.resolve(file), 'utf8');
}

var id = (function() {
    var id = 1;
    return function() {
        return ++id;
    }
})();

function renderLogs(logs, callback) {
    var logsView = './lib/server/views/logs.jade';

    require('jade').render(readFile(logsView), {
        logs: logs,
        filename: logsView
    }, function(err, html) {
        if (err)
            return callback(err);

        callback(null, html);
    });
}

module.exports.start = function(logpath, port) {
    // FIXME вынести отдельно
    var watcher = chokidar.watch(logpath);

    watcher.on('change', function() {
        var logs = getLogs(logpath, true);
        logs.splice(0, oldLogs.length);

        // FIXME убрать, когда будет jade на клиенте

        renderLogs(logs, function(err, html) {
            if (err)
                throw err;

            emit('newLogs', html);
        });
        getLogs(logpath);
    });

    io.set('log level', 0);
    io.sockets.on('connection', function (socket) {
        sockets.push(socket);
        renderLogs(getLogs(logpath), function(err, html) {
            if (err)
                throw err;

            emit('newLogs', html);
        });
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

    server.listen(port);
};

module.exports.getLogs = getLogs;

