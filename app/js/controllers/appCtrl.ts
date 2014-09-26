/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface AppScope {
    appCtrl : AppCtrl;
    openModal: Function;
    setCurDeviceType: Function;
    $apply: Function;
  }

  export class AppCtrl {

    private appFactory;
    private location;
    private scenarios: Array<ScenarioModel>;
    private curScenario: ScenarioModel;
    private devices: Array<DeviceModel>;
    private newBlock: BlockModel;
    private modal: any;
    private deviceTypes: Array<string>;
    private curDeviceType: string;
    private apply: Function;

    static $inject = ['$scope', '$location', '$modal', 'appFactory'];
    constructor($scope: AppScope, $location, $modal, appFactory) {
      $scope.appCtrl = this;
      this.location = $location;
      this.apply = $scope.$apply;
      this.modal = $modal;
      this.appFactory = appFactory;
      this.curScenario = new ScenarioModel("", 0, null, new Array<ConditionBlockModel>(), new Array<ActionBlockModel>());
      this.deviceTypes = new Array<string>();
      this.updateDevices();
      this.newBlock = new BlockModel("0");
      this.curDeviceType = "";
      $scope.openModal = (blockType)=>{ this.openModal(blockType);};
      $scope.setCurDeviceType = (blockType)=>{ this.setCurDeviceType(blockType);};
    }

    private updateDevices(){
      this.appFactory.getDevices()
      .then((data)=>{
	this.devices = data;
	console.log(this.devices);
	for(var i=0; i<this.devices.length; i++){
	  if(this.deviceTypes.indexOf(this.devices[i].type) == -1){
	    this.deviceTypes.push(this.devices[i].type);
	  }
	}
      },
      (error)=>{
	console.error("Could not load device list");
      });
    }

    private updateScenarios(){
      this.appFactory.getScenarios(this.devices)
      .then((data)=>{
	  this.scenarios = data;
      },
      (error)=>{
	console.error("Could not load scenario list");
      });
    }

    private openModal(blockType){
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-build.html',
	controller: 'app.ModalBuildCtrl',
	size: 'lg',
	resolve: {
	  curBlock: ()=>{
	    return null;
	  },
	  devices: ()=>{
	    return this.devices;
	  },
	  curDeviceType: ()=>{
	    return this.curDeviceType;
	  }
	}
      });

      modalInstance.result.then( (newBlock)=>{
	switch(blockType){
	  case BlockType.EVENT:
	    this.curScenario.event = newBlock;
	    break;
	  case BlockType.CONDITION:
	    this.curScenario.conditions.push(newBlock);
	    break;
	  case BlockType.ACTION:
	    this.curScenario.actions.push(newBlock);
	    break;
	}
      });
    }

    private openBlock(curBlock){
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-build.html',
	controller: 'app.ModalBuildCtrl',
	size: 'lg',
	resolve: {
	  curBlock: ()=>{
	    return curBlock;
	  },
	  devices: ()=>{
	    return this.devices;
	  },
	  curDeviceType: ()=>{
	    return curBlock.Device.type;
	  }
	}
      });
    }

    private setCurDeviceType(deviceType){
      this.curDeviceType = deviceType;
      console.log("Cur Device Type: " + this.curDeviceType);
    }

    private removeBlock(block){
      if(block == this.curScenario.event){
	this.curScenario.event = null;
      }
      var index = this.curScenario.conditions.indexOf(block);
      if(index > -1){
	this.curScenario.conditions.splice(index, 1);
      }
      var index = this.curScenario.actions.indexOf(block);
      if(index > -1){
	this.curScenario.actions.splice(index, 1);
      }
    }

    private saveScenario(){
      if(this.curScenario.name != null && /\S/.test(this.curScenario.name)){
	this.curScenario.id = this.curScenario.name.replace(/ /g, '');
	this.appFactory.setScenario(this.curScenario);
      }else{
	this.modal.open({
	  templateUrl: 'partials/modal-error.html',
	  controller: 'app.ModalErrorCtrl',
	  size: 'sm',
	  resolve: {
	    msg: ()=>{
	      return "Please enter a scenario name";
	    }
	  }
	});
      }
    }

    private newClick(){
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-choice.html',
	controller: 'app.ModalChoiceCtrl',
	size: 'lg'
      });
      modalInstance.result.then( (route)=>{
	this.location.path(route);
      });
    }

    private load(){
      this.updateScenarios();
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-load.html',
	controller: 'app.ModalLoadCtrl',
	size: 'lg',
	resolve: {
	  model: () => {return this;}
	}
      });
      modalInstance.result.then( (object)=>{
	if(object instanceof ScenarioModel){
	  this.curScenario = object;
	}
      });
    }
  }
}

app.registerController('AppCtrl', ['$scope', '$location', '$modal', 'appFactory']); 
