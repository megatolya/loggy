$(function() {
    var $logs = $('.logs .table');

    // FIXME change on emit
    $.get('/logs', function(response) {
        $logs.html(response);
    });

    var socket = io.connect('http://localhost');

    socket.on('newLog', function (html) {
        console.log(html);
        $logs.append(html);
    });
});
