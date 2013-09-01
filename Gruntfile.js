module.exports = function(grunt) {

    var pathToFiles = './lib/server/public/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    pathToFiles + 'bower_components/angular/angular.js',
                    pathToFiles + 'bower_components/angular-socket-io/socket.js',
                    'lib/server/public/js/app.js',
                    'lib/server/public/js/services.js',
                    'lib/server/public/js/controllers.js',
                    'lib/server/public/js/filters.js',
                    'lib/server/public/js/directives.js'
                ],
                dest: 'lib/server/public/js/loggy.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("dd.mm.yyyy") %> */\n',
                mangle: false
            },
            dist: {
                files: {
                    'lib/server/public/js/loggy.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        watch: {
            files: ['<%= concat.dist.src %>'],
            tasks: ['default']
        },
        clean: ['<%= concat.dist.dest %>', 'lib/server/public/js/loggy.min.js']
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
