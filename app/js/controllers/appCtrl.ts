/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface AppScope {
    appCtrl : AppCtrl;
    openModal: Function;
    setCurDeviceType: Function;
  }

  export class AppCtrl {

    private appFactory;
    private location;
    private scenarios: Array<ScenarioModel>;
    private curScenario: ScenarioModel;
    private devices: Array<DeviceModel>;
    private newBlock: BlockModel;
    private showModal: number;
    private deviceTypes: Array<string>;
    private curDeviceType: string;

    static $inject = ['$scope', '$location'];
    constructor($scope: AppScope, $location, appFactory) {
      $scope.appCtrl = this;
      this.appFactory = appFactory;
      this.curScenario = new ScenarioModel("", 0, null, new Array<ConditionBlockModel>(), new Array<ActionBlockModel>());
      this.deviceTypes = new Array<string>();
      this.updateDevices();
      this.newBlock = new BlockModel("0");
      this.showModal = 0;
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

      });
    }

    private openModal(blockType){
      this.newBlock = new BlockModel("0");
      this.newBlock.operator = '=';
      this.showModal = blockType;
      console.log("Cur Device Type: " + this.curDeviceType);
    }

    private setCurDeviceType(deviceType){
      this.curDeviceType = deviceType;
      console.log("Cur Device Type: " + this.curDeviceType);
    }

    private addBlock(){
      if(this.showModal == 1){
	this.newBlock.id = "0";
	this.curScenario.event = this.newBlock;
      }else if(this.showModal == 2){
	this.newBlock.id = this.curScenario.conditions.length.toString();
	this.curScenario.conditions.push(this.newBlock);
      }else if(this.showModal == 3){
	this.newBlock.id = this.curScenario.actions.length.toString();
	this.curScenario.actions.push(this.newBlock);
      }
      console.log(this.curScenario);
      this.showModal = 0;
    }

    private resetBlock(){
      this.newBlock = new BlockModel("0");
      this.showModal = 0;
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
      if(this.curScenario.name!=null){
	this.curScenario.id = this.curScenario.name.replace(/ /g, '');
	this.appFactory.setScenario(this.curScenario);
      }
    }
  }
}

app.registerController('AppCtrl', ['$scope', '$location', 'appFactory']); 
