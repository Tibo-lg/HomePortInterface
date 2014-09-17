/// <reference path='../_all.ts' />
angular.module('app').factory('appFactory', [
    '$http', function ($http) {
        var appFactory = {};

        var url_base = "";

        var transformScenario = function (scenario) {
            var event = new IEvent(scenario.event.Service.value_url, scenario.event.operator + scenario.event.value, null);

            var conditions = scenario.conditions.map(function (d) {
                return new ICondition(d.Service.value_url, d.operator + d.value);
            });

            var actions = scenario.actions.map(function (d) {
                return new IAction(d.Service.value_url, d.value, d.id);
            });
            console.log(new IScenario(scenario.name, scenario.id, event, conditions, actions));
            return new IScenario(scenario.name, scenario.id, event, conditions, actions);
        };

        return {
            getDevices: function () {
                var url = url_base + "/homeport/devices";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            },
            getScenarios: function () {
                var url = url_base + "/scenarios";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            },
            setScenario: function (scenario) {
                var url = url_base + "/scenarios/" + scenario.id;
                return $http({
                    method: 'PUT',
                    url: url,
                    data: transformScenario(scenario)
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            },
            getProperties: function () {
                var url = url_base + "/properties";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            }
        };
    }]);
