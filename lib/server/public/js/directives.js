'use strict';

/* Directives */

angular.module('myApp.directives', []).
    directive('inspector', function(version) {
        return function ($scope, elem, attrs, $sanitize) {
            attrs.$observe('data', function(value) {
                var strs = JSON.parse(value);

                var html = strs.map(function(str) {
                    try {
                        return '<button class="btn btn-mini" onclick="' + 
                            'angular.element(this).next().css(\'display\',\'none\').next().css(\'display\',\'block\');angular.element(this).css(\'display\', \'none\');">' +
                            'развернуть json</button><pre><code>' + hljs.highlight('javascript', str).value + 
                            '</code></pre><pre style="display:none;"><code>' +
                            hljs.highlight('javascript', JSON.stringify(JSON.parse(str), null, '    ')).value +
                            '</code></pre>';
                    } catch (err) {
                        return str
                    }
                }).join('<br>');
                elem.html(html);
            });
        }
    });
