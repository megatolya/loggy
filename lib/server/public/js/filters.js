'use strict';

angular.module('myApp.filters', []).
    filter('levelClass', function () {
        return function (text) {
            switch (text.toLowerCase()) {
                case 'trace':
                    return 'label-default'
                case 'debug':
                    return 'label-primary'
                case 'info':
                    return 'label-info'
                case 'warn':
                    return 'label-warning'
                case 'error':
                    return 'label-danger'
            }
            return 'label-default'
        }
    });
