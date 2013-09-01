module.exports = function(sockets, logPath) {
    var watcher = require('../../watcher')(logPath);

    return function (socket) {
        sockets.push(socket);
        socket.emit('send:path', {
            path: logPath
        });
        socket.emit('send:i18n', {
            time: 'Время',
            module: 'Модуль',
            level: 'Уровень',
            message: 'Сообщение'
        });
        watcher.invoke();
    };
};
