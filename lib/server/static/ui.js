var currentClass = 'current-line';

function highlightHash() {
    $('tr').removeClass(currentClass);
    $(window.location.hash).parents('tr').addClass(currentClass);

    var hash = window.location.hash;
    window.location.hash = '';
    window.location.hash = hash;
}

function find(text) {
    $('tr').show();
    $('td').each(function(i, elem) {
        var $elem = $(elem),
            val = $elem.text();

        if (new RegExp(text, 'g').test(val)) {
            $elem.parents('tr').show();
        } else {
            $elem.parents('tr').hide();
        }
    });
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
        }
    });

    $('.table').on('click', '.hash', function() {
        setTimeout(function() {
            highlightHash();
        }, 0);
    });

    //$('.logs').on('change', 'input', function() {
    setInterval(function() {
        find($('input').val());
    }, 200);
    //});
});
