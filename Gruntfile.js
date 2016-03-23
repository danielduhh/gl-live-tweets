module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            js: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    sourceMapName: 'public/dist/gl-live-tweets.min.map'
                },
                files: {
                    'public/dist/gl-live-tweets.min.js': [
                        'public/scripts/app.js',
                        'public/scripts/*.js',
                        '!public/scripts/Config-example.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false
            },
            css: {
                files: {
                    'public/dist/gl-live-tweets.min.css': [
                        'public/styles/*.css'
                    ]
                }
            }
        },
        watch: {
            code: {
                files: [
                    'public/scripts/*.js',
                    'public/styles/*.css',
                    'public/index.html'
                ],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        cachebreaker: {
            app: {
                options: {
                    match: ["gl-live-tweets.min.js", "gl-live-tweets.min.css"],
                    files: {
                        src: ['public/index.html']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-breaker');

    //grunt.registerTask('default', ['uglify', 'cssmin']); // Default grunt tasks maps to grunt
    grunt.registerTask('min-js', ['uglify']);
    grunt.registerTask('min-css', ['cssmin']);

    grunt.registerTask('build', [
        'uglify:js',
        'cachebreaker:app',
        'watch:code'
    ]);



};