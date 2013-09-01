// TODO перенести  этот файл в папку server
//
var started = false;

module.exports.start = function(logPath, port) {
    if (started)
        return;

    started = true;

    var express = require('express'),
        path = require('path'),
        fs = require('fs'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server),
        routes = require('./server/routes/'),
        sockets = [];


    function emit(event, data) {
        sockets.forEach(function(socket, i) {
            socket && socket.emit && socket.emit(event, data);
        });
    }

    require('./watcher')(logPath).change(function(err, logs) {
        if (err) throw err;
        emit('send:logs', {logs: logs});
    });

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static('./lib/server/public'))
    app.use(app.router);
    app.set('views', './lib/server/views');
    app.set('view engine', 'jade');
    app.use(express.errorHandler());

    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);
    app.get('*', routes.index);

    io.set('log level', 0);
    // TODO поправить
    io.sockets.on('connection', require('./server/routes/socket')(sockets, logPath));

    server.listen(port);
};
