module.exports = function(grunt) {

    var pathToFiles = './lib/server/public/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: [
                    pathToFiles + 'bower_components/angular/angular.js',
                    pathToFiles + 'bower_components/angular-socket-io/socket.js',
                    pathToFiles + 'bower_components/highlightjs/highlight.pack.js',
                    'lib/server/public/js/app.js',
                    'lib/server/public/js/services.js',
                    'lib/server/public/js/controllers.js',
                    'lib/server/public/js/filters.js',
                    'lib/server/public/js/directives.js'
                ],
                dest: 'lib/server/public/dist/loggy.js'
            },
            css: {
                src: [
                    pathToFiles + 'bower_components/highlightjs/styles/github.css',
                    pathToFiles + 'bower_components/bootstrap/dist/css/bootstrap.css',
                    pathToFiles + 'css/app.css'
                ],
                dest: 'lib/server/public/dist/loggy.css'
            }
        },
        watch: {
            files: ['<%= concat.js.src %>', '<%= concat.css.src %>'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['concat']);
};
