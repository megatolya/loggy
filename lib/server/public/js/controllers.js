'use strict';

angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope,socket) {
    }).
    controller('indexCtrl', function ($scope, socket) {
        socket.on('send:path', function (data) {
            $scope.path = data.path;
        });
        socket.on('send:logs', function (data) {
            $scope.logs = data.logs;
        });
    });
