/// <reference path='../_all.ts' />
angular.module('app').factory('appFactory', [
    '$http', function ($http) {
        var appFactory = {};

        var url_base = "";

        var transformScenario = function (scenario) {
            var event = new IEvent(scenario.event.Service.value_url, scenario.event.operator + scenario.event.value, scenario.event.Duration);

            var conditions = scenario.conditions.map(function (d) {
                return new ICondition(d.Service.value_url, d.operator + d.value);
            });

            var actions = scenario.actions.map(function (d) {
                return new IAction(d.Service.value_url, d.value, d.id);
            });
            return new IScenario(scenario.name, scenario.id, event, conditions, actions, scenario.desc, scenario.active);
        };

        var transformProperty = function (scenario) {
            var condition = new ICondition(scenario.conditions[0].Service.value_url, scenario.conditions[0].operator + scenario.conditions[0].value);
            var action = new IAction(scenario.actions[0].Service.value_url, scenario.actions[0].operator + scenario.actions[0].value, scenario.actions[0].id);

            console.log(action);

            return new IProperty(scenario.name, scenario.id, condition, action, scenario.desc, scenario.active);
        };

        var findServiceFromUrl = function (url, devices, deviceType) {
            if (!url) {
                return { service: null, device: null, deviceType: deviceType };
            }
            for (var i = 0; i < devices.length; i++) {
                for (var j = 0; j < devices[i].service.length; j++) {
                    if (devices[i].service[j].value_url === url) {
                        return { device: devices[i], service: devices[i].service[j], deviceType: devices[i].type };
                    }
                }
            }
            return null;
        };

        var separateValue = function (val) {
            if (isNaN(val[1]) === true) {
                return { operator: val.slice(0, 2), value: val.slice(2, val.length) };
            } else {
                return { operator: val.slice(0, 1), value: val.slice(1, val.length) };
            }
        };

        var reverseTransformScenario = function (scenario, devices) {
            var evDevice = findServiceFromUrl(scenario.event.serviceId, devices, scenario.event.deviceType);
            var evVal = separateValue(scenario.event.value);
            var event = new EventBlockModel("0", evDevice.device, evDevice.service, evVal.value, evVal.operator, scenario.event.duration, evDevice.deviceType);

            var conditions = scenario.conditions.map(function (d) {
                var cDevice = findServiceFromUrl(d.serviceId, devices, d.deviceType);
                var cVal = separateValue(d.value);
                return new ConditionBlockModel("0", cDevice.device, cDevice.service, cVal.value, cVal.operator, cDevice.deviceType);
            });

            var actions = scenario.actions.map(function (d) {
                var aDevice = findServiceFromUrl(d.serviceId, devices, d.deviceType);
                return new ActionBlockModel("0", aDevice.device, aDevice.service, d.value, null, d.seqNumber, aDevice.deviceType);
            });

            return new ScenarioModel(scenario.name, scenario.id, event, conditions, actions, scenario.desc, scenario.active);
        };

        var reverseTransformProperty = function (property, devices) {
            var cDevice = findServiceFromUrl(property.condition.serviceId, devices, property.condition.deviceType);
            var cVal = separateValue(property.condition.value);
            var condition = new ConditionBlockModel("0", cDevice.device, cDevice.service, cVal.value, cVal.operator, cDevice.deviceType);

            var aDevice = findServiceFromUrl(property.action.serviceId, devices, property.action.deviceType);
            var action = new ActionBlockModel("0", aDevice.device, aDevice.service, property.action.value, null, property.action.seqNumber, aDevice.deviceType);

            return new ScenarioModel(property.name, property.id, null, [condition], [action], property.desc, property.active);
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
            getScenarios: function (devices) {
                var url = url_base + "/scenarios";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data.map(function (d) {
                            return reverseTransformScenario(d, devices);
                        });
                    }
                });
            },
            setScenario: function (scenario, devices) {
                var url = url_base + "/scenarios/" + scenario.id;
                return $http({
                    method: 'PUT',
                    url: url,
                    data: transformScenario(scenario)
                }).then(function (response) {
                    return response;
                }, function (response) {
                    if (response.status == 409) {
                        var cDevice = findServiceFromUrl(response.data.serviceId, devices, response.data.deviceType);
                        var cVal = separateValue(response.data.value);
                        response.data = new ConditionBlockModel("0", cDevice.device, cDevice.service, cVal.value, cVal.operator, cDevice.deviceType);
                    }
                    return response;
                });
            },
            removeScenario: function (id) {
                var url = url_base + "/scenarios/" + id;
                return $http({
                    method: 'DELETE',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return null;
                    }
                });
            },
            getProperties: function (devices) {
                var url = url_base + "/properties";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data.map(function (d) {
                            return reverseTransformProperty(d, devices);
                        });
                    }
                });
            },
            setProperty: function (scenario) {
                var url = url_base + "/properties/" + scenario.id;
                return $http({
                    method: 'PUT',
                    url: url,
                    data: transformProperty(scenario)
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            },
            removeProperty: function (id) {
                var url = url_base + "/properties/" + id;
                return $http({
                    method: 'DELETE',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return null;
                    }
                });
            },
            getTemplates: function () {
                var url = url_base + "/templates";
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data.map(function (d) {
                            return reverseTransformScenario(d, null);
                        });
                    }
                });
            },
            setActive: function (type, id, value) {
                var url = url_base + "/" + type + "/" + id + "/active";
                return $http({
                    method: 'put',
                    url: url,
                    data: { value: value }
                }).then(function (response) {
                    if (response.data.error) {
                    } else {
                    }
                });
            }
        };
    }]);
