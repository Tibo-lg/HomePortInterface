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
    private properties: Array<ScenarioModel>;
    private templates: Array<ScenarioModel>;
    private curScenario: ScenarioModel;
    private devices: Array<DeviceModel>;
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
      this.curScenario = new ScenarioModel("", 0, null, new Array<ConditionBlockModel>(), new Array<ActionBlockModel>(), "", true);
      this.deviceTypes = new Array<string>();
      this.updateDevices();
      this.curDeviceType = "";
      $scope.openModal = (blockType)=>{ this.openModal(blockType);};
      $scope.setCurDeviceType = (blockType)=>{ this.setCurDeviceType(blockType);};
    }

    private updateDevices(){
      this.appFactory.getDevices()
      .then((data)=>{
	this.devices = data;
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

    private updateProperties(){
      this.appFactory.getProperties(this.devices)
      .then((data)=>{
	this.properties = data;
      },
      (error)=>{
	console.error("Could not load property list");
      });
    }

    private updateTemplates(){
      this.appFactory.getTemplates()
      .then((data)=>{
	  this.templates = data;
      },
      (error)=>{
	console.error("Could not load template list");
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
	  },
	  blockType: ()=>{
	    return blockType;
	  }
	}
      });

      modalInstance.result.then( (newBlock)=>{
	if(newBlock != null){
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
	    case BlockType.P_ACTION:
	      this.curScenario.actions.push(newBlock);
	      break;
	  }
	}
      });
    }

    private openBlock(curBlock, blockType){
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-build.html',
	controller: 'app.ModalBuildCtrl',
	size: 'lg',
	resolve: {
	  curBlock: ()=>{
	    return curBlock.CreateCopy();
	  },
	  devices: ()=>{
	    return this.devices;
	  },
	  curDeviceType: ()=>{
	    return curBlock.deviceType;
	  },
	  blockType: ()=>{
	    return blockType;
	  }
	}
      });

      modalInstance.result.then( (newBlock)=>{
	if(newBlock == null){
	  this.removeBlock(curBlock);
	}else{
	  curBlock.setToBlock(newBlock);
	}
	console.log(curBlock);
	console.log(newBlock);
	console.log(this.curScenario.actions);
      });
    }

    private setCurDeviceType(deviceType){
      this.curDeviceType = deviceType;
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

    private save(){
      if(this.curScenario.name != null && /\S/.test(this.curScenario.name) && this.curScenario.actions.length != 0){
	this.curScenario.id = this.curScenario.name.replace(/ /g, '');
	var modalInstance = this.modal.open({
	  templateUrl: 'partials/modal-edit.html',
	  controller: 'app.ModalEditCtrl',
	  size: 'lg',
	  resolve: {
	    scenario: ()=>{
	      return this.curScenario.CreateCopy();
	    }
	  }
	});
	modalInstance.result.then( (desc)=>{
	  this.curScenario.desc = desc;
	  if(this.location.path() === "/build"){
	    this.saveScenario();
	  }else if(this.location.path() === "/prop"){
	    this.appFactory.setProperty(this.curScenario);
	  }
	});
      }else if(this.curScenario.actions.length == 0){
	this.modal.open({
	  templateUrl: 'partials/modal-error.html',
	  controller: 'app.ModalErrorCtrl',
	  size: 'sm',
	  resolve: {
	    msg: ()=>{
	      return "You need at least one action.";
	    }
	  }
	});
      }else{
	this.modal.open({
	  templateUrl: 'partials/modal-error.html',
	  controller: 'app.ModalErrorCtrl',
	  size: 'sm',
	  resolve: {
	    msg: ()=>{
	      return "Please enter a name before saving.";
	    }
	  }
	});
      }
    }

    private handleConflict(condition){
      var modalInstance = this.modal.open({
	templateUrl: 'partials/modal-suggestion.html',
	controller: 'app.ModalSuggCtrl',
	size: 'lg',
	resolve: {
	  condition: ()=>{
	    return condition;
	  }
	}
      });

      modalInstance.result.then(()=>{
	this.curScenario.conditions.push(condition);
      });
    }

    private saveScenario(){
      if(this.curScenario.event != null){
	this.appFactory.setScenario(this.curScenario, this.devices).then( 
	  (response)=>{
	    console.log(response);
	    if(response.status == 409){
	      console.log("BIZARRRE");
	      this.handleConflict(response.data);
	    }
	  });
      }else if(this.curScenario.event == null){
	this.modal.open({
	  templateUrl: 'partials/modal-error.html',
	  controller: 'app.ModalErrorCtrl',
	  size: 'sm',
	  resolve: {
	    msg: ()=>{
	      return "Cannot have a scenario without event";
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
	this.curScenario = new ScenarioModel("", 0, null, new Array<ConditionBlockModel>(), new Array<ActionBlockModel>(), "", true);
	this.location.path(route);
      });
    }

    private load(){
      this.updateScenarios();
      this.updateProperties();
      this.updateTemplates();
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
	  if( this.curScenario.event != null ){
	    if(this.curScenario.event.Device == null){
	      this.curScenario.name = "";
	    }
	    this.location.path("/build");
	  }else{
	    this.location.path("/prop");
	  }
	}
      });
    }

    private manage(){
      this.updateScenarios();
      this.updateProperties();
      this.updateTemplates();
    }

    private onActiveChange(type, id, value){
      this.appFactory.setActive(type, id, value);
    }

    private removeScenario(id){
      this.appFactory.removeScenario(id).then( ()=>{this.updateScenarios();});
    }

    private removeProperty(id){
      this.appFactory.removeProperty(id).then( ()=>{this.updateProperties();});
    }
  }
}

app.registerController('AppCtrl', ['$scope', '$location', '$modal', 'appFactory']); 
