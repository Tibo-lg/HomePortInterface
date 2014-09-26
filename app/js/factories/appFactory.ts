/// <reference path='../_all.ts' />

angular.module('app')
.factory('appFactory', ['$http', function ($http) {

  var appFactory = {};

  var url_base = "";

  var transformScenario = function(scenario: ScenarioModel): IScenario{
    
    var event = new IEvent(scenario.event.Service.value_url, scenario.event.operator + scenario.event.value, null)
    
    var conditions = scenario.conditions.map(function(d){
      return new ICondition(d.Service.value_url, d.operator + d.value);
    });

    var actions = scenario.actions.map(function(d){
      return new IAction(d.Service.value_url, d.value, d.id);
    });
    return new IScenario(scenario.name, scenario.id, event, conditions, actions);
  }

  var findServiceFromUrl= function(url: string, devices: Array<DeviceModel>){
    for(var i=0; i< devices.length; i++){
      for(var j=0; j< devices[i].service.length; j++){
	if(devices[i].service[j].value_url === url){
	  return {device: devices[i], service: devices[i].service[j]};
	}
      }
    }
    return null;
  }

  var separateValue=function(val){
    if(isNaN(val[1]) === true){
      return {operator: val.slice(0, 2), value: val.slice(2, val.length)};
    }else{
      return {operator: val.slice(0, 1), value: val.slice(1, val.length)};
    }
  }

  var reverseTransformScenario = function(scenario: IScenario, devices: Array<DeviceModel>): ScenarioModel{
    var evDevice = findServiceFromUrl(scenario.event.serviceId, devices);
    var evVal = separateValue(scenario.event.value);
    var event = new EventBlockModel("0", evDevice.device, evDevice.service, evVal.value, evVal.operator, scenario.event.duration); 

    var conditions = scenario.conditions.map( function(d){
      var cDevice = findServiceFromUrl(d.serviceId, devices);
      var cVal = separateValue(d.value);
      return new ConditionBlockModel("0", cDevice.device, cDevice.service, cVal.value, cVal.operator); 
    });

    var actions = scenario.actions.map( function(d){
      var aDevice = findServiceFromUrl(d.serviceId, devices);
      var aVal = separateValue(d.value);
      return new ActionBlockModel("0", aDevice.device, aDevice.service, aVal.value, aVal.operator, d.seqNumber); 
    });

    return new ScenarioModel(scenario.name, scenario.id, event, conditions, actions);
  }

  return {
    getDevices: function () {
      var url = url_base + "/homeport/devices";
      return  $http({
      	method: 'GET',
      	url: url
      })
      .then(function(response){
      	if(response.data.error){
      	  return null;
      	}else{
      	  return response.data;
      	}
      });
    },
    getScenarios: function (devices) {
      var url = url_base + "/scenarios";
      return  $http({
      	method: 'GET',
      	url: url
      })
      .then(function(response){
      	if(response.data.error){
      	  return null;
      	}else{
      	  return response.data.map(function(d){return reverseTransformScenario(d, devices);});
      	}
      });
    },
    setScenario: function (scenario: ScenarioModel) {
      var url = url_base + "/scenarios/" + scenario.id;
      return  $http({
      	method: 'PUT',
      	url: url,
	data: transformScenario(scenario)
      })
      .then(function(response){
      	if(response.data.error){
      	  return null;
      	}else{
      	  return response.data;
      	}
      });
    },
    getProperties: function () {
      var url = url_base + "/properties";
      return  $http({
      	method: 'GET',
      	url: url
      })
      .then(function(response){
      	if(response.data.error){
      	  return null;
      	}else{
      	  return response.data;
      	}
      });
    },
  }
}]); 

