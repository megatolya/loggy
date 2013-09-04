'use strict';

/* Directives */

angular.module('myApp.directives', []).
    directive('inspector', function(version) {
        return function ($scope, elem, attrs, $sanitize) {
            attrs.$observe('data', function(value) {
                var strs = JSON.parse(value);

                var html = strs.map(function(str) {
                    try {
                        return '<pre><code>' + hljs.highlight('javascript', JSON.stringify(JSON.parse(str), null, '    ')).value + '</code></pre>';
                    } catch (err) {
                        return str
                    }
                }).join('<br>');
                elem.html(html);
            });
        }
    });
