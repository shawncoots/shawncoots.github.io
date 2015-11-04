/*global module:false*/
module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CSS Minifier. Add your files to be minified in the src array.
        cssmin: {
            build: {
                src: [
                    'res/css/normalize.css',
                    'res/css/bootstrap.css',
                    'res/css/typography.css',
                    'res/css/layout.css'
                ],
                dest: 'res/build/global.min.css'
            }
        },

        /* Compiles LESS files in res/less. Uses grunt's glob expansion to get everything in the dir.
         * You won't need to update this when you add a new file. */
        less: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'res/less/',
                        src: ['*.less'],
                        dest: 'res/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'res/css/',
                        src: ['*.css'],
                        dest: 'res/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        // Contains tasks to run when grunt watch is invoked. Whenever any of the files specified are modified, executes tasks specified.
        watch: {
            less: {
                files: 'res/less/**/*.less',
                tasks: 'less:dev'
            },
            autoprefixer: {
                files: 'res/.tmp/css/*.css',
                tasks: 'autoprefixer:dev'
            }
        }
    });

    // Load plugins. Run npm install in the theme root to install these according to package.json
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task - executes when you run grunt in the theme root.
    grunt.registerTask('default', ['less:dev', 'postcss:dev', 'cssmin']);
};
