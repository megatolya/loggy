'use strict';

angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope,socket) {
        socket.on('send:i18n', function (i18n) {
            $scope.i18n = i18n;
        });
    }).
    controller('indexCtrl', function ($scope, socket) {
        $scope.grep = {};

        socket.on('send:path', function (data) {
            $scope.path = data.path;
        });
        socket.on('send:logs', function (data) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setTimeout(function() {
                    window.scrollTo(window.scrollY, document.body.scrollHeight)
                }, 1);
            }
            $scope.logs = data.logs;
        }, 1);
    });
