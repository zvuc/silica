module.exports = function(grunt) {
  'use strict';
  
  require("load-grunt-tasks")(grunt, {
    pattern: ['grunt-*']
  });
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Meta
    meta: {
      banner: '/* \n' +
              ' * Silica admin dashboard skin for Textcube 1.10 \n' +
              ' * by Hansol Kim (zvuc) (http://xenosium.com) \n' +
              ' * GitHub: https://github.com/zvuc/silica \n' +
              ' * \n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> License \n' +
              ' */\n'
    },

    // LESS
    less: {
      main: {
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]})
            //new (require('less-plugin-clean-css'))(cleanCssOptions)
          ]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          ext: ".css",
          src: ["*.less"],
          dest: "build_temp/"
        }]
      }
    },


    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= meta.banner %>'
      },
      files: {
        expand: true,
        src: ["build_temp/*.css"]
      }
    },

    //copy
    copy: {
      main: {
        expand: true,
        cwd: 'build_temp/',
        src: '**',
        dest: 'build/',
        flatten: true,
        filter: 'isFile'
      }
    },

    // clean
    clean: {
      main: ["build_temp/"]
    },
    
    // watch
    watch: {
      less: {
        files: ['src/*'],
        tasks: ['default']
      }
    }

  });
  
  grunt.registerTask('default', ['less:main', 'usebanner', 'copy', 'clean']);
  grunt.registerTask('dev', ['watch']);
  
}