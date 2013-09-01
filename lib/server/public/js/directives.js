'use strict';

/* Directives */

angular.module('myApp.directives', []).
    directive('inspector', function(version) {
        function inspect(oObj, key, level) {
            function type(obj) {
                if (obj === null)
                    return 'null';
                else if (obj instanceof Array)
                    return 'array';
                else
                    return typeof obj;
            }
            level = level || 0;
            var html = '<div class="inspector">';
            key = key || '';



            if (key)
                html += '<div class="key">' + key + ' <span class="key-type">' + type(oObj) + '</span></div>';
            if (oObj instanceof Array) {
                 oObj.forEach(function(elem) {
                    html += inspect(elem, null, level++);
                });
            } else if (typeof oObj === 'object' && oObj !== null) {
                for (var key in oObj) {
                    if (oObj.hasOwnProperty(key)) {
                        html += inspect(oObj[key], key, level++);
                    }
                }
            } else {
                html += '<div class="inspector value">' + oObj + '<span class="value-type">' + typeof(oObj) + '</span></div>';
            }
            html += '</div>';
            return html;
        }

        return function ($scope, elem, attrs, $sanitize) {
            attrs.$observe('data', function(value) {
                try {
                    var obj = JSON.parse(value);

                    elem.html(inspect(obj));
                } catch (err) {
                    elem.html(inspect(value));
                }
            });
        }
    });
