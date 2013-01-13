;var ngMidwayTester;

(function() {

  ngMidwayTester = function() {};

  ngMidwayTester.prototype.register = function(module, callback) {
    if(typeof module == 'string') {
      module = angular.module(module);
    }

    var name = module.value('appName').name;
    var testModuleName = 'ngMidwayTest';

    var that = this;
    this.$module = angular.module(testModuleName, [name]).config(
      ['$provide','$routeProvider','$locationProvider', function($p, $r, $l) {
        that.$provide = $p;
        that.$routeProvider = $r;
        that.$locationProvider = $l;
      }]
    );

    this.$module.run(['$injector', function($injector) {
      that.$injector = $injector;
    }]);

    this.attach(testModuleName);
    this.prepareGlobals(callback);
  };

  ngMidwayTester.prototype.attach = function(name) {
    var html = this.html();
    html.setAttribute('data-ng-app',name);
    var body = this.body();
    body.innerHTML += '<div id="data-ng-view" data-ng-view></div>';
    angular.bootstrap(html, [name]);
  };

  ngMidwayTester.prototype.html = function() {
    return document.getElementsByTagName('html')[0];
  };

  ngMidwayTester.prototype.body = function() {
    return document.getElementsByTagName('body')[0];
  };

  ngMidwayTester.prototype.view = function() {
    return document.getElementById('data-ng-view');
  };

  ngMidwayTester.prototype.reset = function(callback) {
    this.resetPath();
    this.resetView();
    this.apply(callback);
  };

  ngMidwayTester.prototype.resetView = function(callback) {
    this.view().innerHTML = '';
  };

  ngMidwayTester.prototype.resetPath = function(callback) {
    this.path('/', callback);
  };

  ngMidwayTester.prototype.path = function(url, callback) {
    if(url && callback) {
      this.location().path(url);
      this.apply(callback);
    }
    else {
      return this.location().path();
    }
  };

  ngMidwayTester.prototype.directive = function(html, scope) {
    scope = scope || this.scope();
    return this.$compile(html)(scope);
  };

  ngMidwayTester.prototype.module = function(module) {
    return this.$module;
  };

  ngMidwayTester.prototype.factory = function(service) {
    return this.service(service);
  };

  ngMidwayTester.prototype.routeProvider = function() {
    return this.$routeProvider;
  };

  ngMidwayTester.prototype.service = function(service) {
    try {
      return this.$injector.get(service);
    }
    catch(e) {
      return null;
    };
  };

  ngMidwayTester.prototype.location = function() {
    return this.$location;
  };

  ngMidwayTester.prototype.injector = function() {
    return this.$injector;
  };

  ngMidwayTester.prototype.module = function() {
    return this.$module;
  };

  ngMidwayTester.prototype.inject = function(array) {
    if(this.$injector) {
      this.injector().invoke(array);
    }
    else {
      this.module().run(array);
    }
  };

  ngMidwayTester.prototype.ready = function() {
    return !!this.$injector;
  };

  ngMidwayTester.prototype.controller = function(ctrl, options) {
    return this.$controller(ctrl, options);
  };

  ngMidwayTester.prototype.newScope = function(fn) {
    return this.$rootScope.$new();
  };

  ngMidwayTester.prototype.scope = function(element) {
    return angular.element(element || document.body).scope();
  };

  ngMidwayTester.prototype.apply = function(scope, callback) {
    callback = callback || function() {};
    var s = this.scope();
    if(s.$$phase) {
      callback();
    }
    else {
      s.$apply(function() {
        callback(); 
      });
    }
  };

  ngMidwayTester.prototype.prepareGlobals = function(callback) {
    var that = this;
    this.inject(['$controller','$location','$routeParams','$rootScope','$compile',function($c, $l, $p, $r, $o) {
      that.$controller  = $c;
      that.$location    = $l;
      that.$params      = $p;
      that.$compile     = $o;
      that.$rootScope   = that.$injector.get('$rootScope');
      that.$route       = that.$injector.get('$route');
      if(callback) callback();
    }]);
  };

})();
