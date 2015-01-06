/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalBuildScope {
    modalBuildCtrl : ModalBuildCtrl;
  }

  export class ModalBuildCtrl {

    private newBlock: BlockModel;
    private devices: Array<DeviceModel>;
    private curDeviceType: string;
    private modalInstance: any;
    private okButton: string;
    private cancelButton: string;
    private blockType: BlockType;

    static $inject = ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType'];
    constructor($scope: ModalBuildScope, $modalInstance, curBlock, devices, curDeviceType, blockType) {
      $scope.modalBuildCtrl = this;
      this.blockType = blockType;
      if(curBlock === null){
	switch(this.blockType){
	  case BlockType.EVENT:
	    this.newBlock = new EventBlockModel("0");
	    break;
	  case BlockType.CONDITION:
	    this.newBlock = new ConditionBlockModel("0");
	    break;
	  case BlockType.ACTION:
	    this.newBlock = new ActionBlockModel("0");
	    break;
	  case BlockType.P_ACTION:
	    this.newBlock = new ActionBlockModel("0");
	    break;
	}
	this.newBlock.deviceType = curDeviceType;
	this.okButton = "Add Block";
	this.cancelButton = "Cancel";
      }else{
	this.newBlock = curBlock;
	this.okButton = "Modify Block";
	this.cancelButton = "Remove Block";
      }
      this.newBlock.operator = '=';
      this.devices = devices;
      this.curDeviceType = curDeviceType;
      this.modalInstance = $modalInstance;
    }

    private ok(){
      console.log(this.newBlock);
      this.modalInstance.close(this.newBlock);
    }

    private cancel(){
      this.modalInstance.close(null);
    }
  }
}

app.registerController('ModalBuildCtrl', ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType', 'blockType']); 
