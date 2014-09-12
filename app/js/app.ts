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
angular.module('app').config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/build");
  $stateProvider
  .state('build', {
    url: '/build',
    templateUrl: 'partials/build.html',
  })
  .state('prop', {
    url: '/prop',
    templateUrl: 'partials/prop.html',
  })
});

/** Utility functions **/
module app {
    export module Directives { null; }
    export module Services { null; }

    export var SECONDS_IN_MS = 1000;
    export var MINUTE_IN_MS = SECONDS_IN_MS*60;
    export var HOURS_IN_MS = MINUTE_IN_MS*60;
    export var DAY_IN_MS = HOURS_IN_MS*24;
    export var WEEK_IN_MS = DAY_IN_MS*7;
    export var MONTH_IN_MS = DAY_IN_MS*30;
    export var YEAR_IN_MS = DAY_IN_MS*356;
    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    export function registerController(className: string, services = []) {
        var controller = 'app.' + className;
        services.push(app[className]);
        angular.module('app').controller(controller, services);
    }

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
    export function registerDirective(directive: string, services = []) {
        services.push(app.Directives[directive]);
        angular.module('app').directive(directive, services);
    }
    
    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
        export function registerService (className: string, services = []) {
          //var service = 'app.Services.' + className;
          var service = className[0].toLowerCase() + className.slice(1);
          services.push(() => new app[className]());
          console.log(service, services);
          angular.module('app').factory(service, services);
        }
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
     
    
    export class AUTH_EVENTS {
        public static loginSuccess:     string = 'auth-login-success';
        public static loginFailed:      string = 'auth-login-failed';
        public static logoutSuccess:    string = 'auth-logout-success';
        public static sessionTimeout:   string = 'auth-session-timeout';
        public static notAuthenticated: string = 'auth-not-authenticated';
        public static notAuthorized:    string = 'auth-not-authorized';
    }
}
