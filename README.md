# ngMidwayTester [![Build Status](https://travis-ci.org/yearofmoo/ngMidwayTester.png?branch=master)](https://travis-ci.org/yearofmoo/ngMidwayTester)

A pure-javascript integration tester for AngularJS that can be run inline with application code.  

## Installation

1. run `npm install ng-midway-tester`.
2. include `./node_modules/ngMidwayTester/src/ngMidwayTester.js` into your test runner.

## Getting Started

Inside of your test spec code, you can use the midway tester like so:

```javascript
//creating the tester
var tester = ngMidwayTester('moduleName');

//destroying the tester
tester.destroy();
tester = null;
```

Be sure to have a new instance of the tester for each spec you're testing.

## Example

```javascript
//this is the module code
angular.module('myModule', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/home', {
      template : 'welcome to {{ title }}',
      controller : 'HomeCtrl'
    });
  })
  .controller('HomeCtrl', function($scope) {
    $scope.title = 'my home page';
  });

//this test spec uses mocha since it has nice support for async testing...
describe('my test spec', function() {
  var tester;
  beforeEach(function() {
    var useRouting = true;
    tester = ngMidwayTester('myModule', useRouting);
  });

  afterEach(function() {
    tester.destroy();
    tester = null;
  });

  it('should have a working home page', function(done) {
    tester.visit('/home', function() {
      expect(tester.path()).to.equal('/home');
      expect(tester.viewElement().html()).to.contain('welcome to my home page');

      var scope = tester.viewScope();
      expect(scope.title).to.equal('my home page');
      done();
    });
  });
});
```

## Docs

http://yearofmoo.github.io/ngMidwayTester/docs/classes/ngMidwayTester.html

## License

MIT
