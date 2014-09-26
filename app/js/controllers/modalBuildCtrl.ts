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

    static $inject = ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType'];
    constructor($scope: ModalBuildScope, $modalInstance, curBlock, devices, curDeviceType) {
      $scope.modalBuildCtrl = this;
      if(curBlock === null){
	this.newBlock = new BlockModel("0");
      }else{
	this.newBlock = curBlock;
      }
      this.newBlock.operator = '=';
      this.devices = devices;
      this.curDeviceType = curDeviceType;
      this.modalInstance = $modalInstance;
    }

    private ok(){
      this.modalInstance.close(this.newBlock);
    }

    private cancel(){
      this.modalInstance.dismiss();
    }
  }
}

app.registerController('ModalBuildCtrl', ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType']); 
