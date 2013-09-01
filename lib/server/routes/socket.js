module.exports = function(sockets, logPath) {
    var watcher = require('../../watcher')(logPath);

    return function (socket) {
        sockets.push(socket);
        socket.emit('send:path', {
            path: logPath
        });
        watcher.invoke();
    };
};
