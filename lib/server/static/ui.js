var currentClass = 'current-line';

function highlightHash() {
    $('tr').removeClass(currentClass);
    $(window.location.hash).parents('tr').addClass(currentClass);
}

function createInputs() {
}

$(function() {
    var $logs = $('.logs .table'),
        firstLogReceived = true,
        socket = io.connect('http://localhost');

    socket.on('newLogs', function (html) {
        $logs.append(html);

        if (firstLogReceived) {
            firstLogReceived = false;
            highlightHash();
            createInputs();
        }
    });

    $('.table').on('click', '.hash', function() {
        setTimeout(function() {
            highlightHash();
        }, 0);
    });
});
