/// <reference path='_all.ts' />
'use strict';
/** Declare app level module which depends on filters, and services **/
//modules:'app.controllers', 'app.directives', 'app.filters', 'app.services'
//var modules = ['app.Controllers', 'app.Directives', 'app.Factories'];
//modules.forEach(function (module) { angular.module(module, []); });
var modules = [];
modules.push('ngSanitize');
modules.push('ngCookies');
modules.push('ui.router');
modules.push('ui.bootstrap');
angular.module('app', modules);

/** Router **/
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/build");
    $stateProvider.state('build', {
        url: '/build',
        templateUrl: 'partials/build.html'
    }).state('prop', {
        url: '/prop',
        templateUrl: 'partials/prop.html'
    });
});

/** Utility functions **/
var app;
(function (app) {
    (function (Directives) {
        null;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
    (function (Services) {
        null;
    })(app.Services || (app.Services = {}));
    var Services = app.Services;

    app.SECONDS_IN_MS = 1000;
    app.MINUTE_IN_MS = app.SECONDS_IN_MS * 60;
    app.HOURS_IN_MS = app.MINUTE_IN_MS * 60;
    app.DAY_IN_MS = app.HOURS_IN_MS * 24;
    app.WEEK_IN_MS = app.DAY_IN_MS * 7;
    app.MONTH_IN_MS = app.DAY_IN_MS * 30;
    app.YEAR_IN_MS = app.DAY_IN_MS * 356;

    /**
    * Register new controller.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'app.' + className;
        services.push(app[className]);
        angular.module('app').controller(controller, services);
    }
    app.registerController = registerController;

    /**
    * Register new filter.
    *
    * @param className
    * @param services
    */
    //    export function registerFilter (className: string, services = []) {
    //        var filter = className.toLowerCase();
    //        services.push(() => (new app.filters[className]()).filter);
    //        angular.module('app.filters').filter(filter, services);
    //    }
    /**
    * Register new directive.
    *
    * @param directive
    * @param services
    */
    function registerDirective(directive, services) {
        if (typeof services === "undefined") { services = []; }
        services.push(app.Directives[directive]);
        angular.module('app').directive(directive, services);
    }
    app.registerDirective = registerDirective;

    /**
    * Register new service.
    *
    * @param className
    * @param services
    */
    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        //var service = 'app.Services.' + className;
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new app[className]();
        });
        console.log(service, services);
        angular.module('app').factory(service, services);
    }
    app.registerService = registerService;

    /**
    * Register new factory.
    *
    * @param className
    * @param services
    */
    //export function registerFactory(className: string, services = []) {
    //    var factory = className[0].toLowerCase() + className.slice(1);
    //    services.push(() => new app.Factories[className]());
    //    angular.module('app.Factories').factory(factory, services);
    //}
    var AUTH_EVENTS = (function () {
        function AUTH_EVENTS() {
        }
        AUTH_EVENTS.loginSuccess = 'auth-login-success';
        AUTH_EVENTS.loginFailed = 'auth-login-failed';
        AUTH_EVENTS.logoutSuccess = 'auth-logout-success';
        AUTH_EVENTS.sessionTimeout = 'auth-session-timeout';
        AUTH_EVENTS.notAuthenticated = 'auth-not-authenticated';
        AUTH_EVENTS.notAuthorized = 'auth-not-authorized';
        return AUTH_EVENTS;
    })();
    app.AUTH_EVENTS = AUTH_EVENTS;
})(app || (app = {}));
