module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    shell: {
      options: {
        stdout: true
      },
      docs: {
        command: './node_modules/.bin/yuidoc -o ./docs ./src'
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: 'node ./node_modules/bower/bin/bower install'
      },
    },

    connect: {
      docs: {
        options: {
          base: 'docs/',
          port: 8888,
          keepalive: true
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      }
    },

    open: {
      docs: {
        path: 'http://localhost:8888'
      },
      coverage: {
        path: 'http://localhost:5555'
      }
    },

    karma: {
      test: {
        configFile: './test/karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      auto: {
        configFile: './test/karma.conf.js',
        autoWatch: true,
        singleRun: false
      },
      coverage: {
        configFile: './test/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'src/ngMidwayTester.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      }
    }
  });

  //single run tests
  grunt.registerTask('test', ['install','karma:test']);
  grunt.registerTask('autotest', ['karma:auto']);
  grunt.registerTask('coverage', ['install','karma:coverage','open:coverage','connect:coverage']);
  grunt.registerTask('docs', ['install','shell:docs','open:docs','connect:docs']);
  grunt.registerTask('install', ['shell:npm_install','shell:bower_install']);
};
