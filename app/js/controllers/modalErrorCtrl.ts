/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalErrorScope {
    modalErrorCtrl : ModalErrorCtrl;
  }

  export class ModalErrorCtrl {

    private msg: string;
    private modalInstance: any;

    static $inject = ['$scope', '$modalInstance', 'msg'];
    constructor($scope: ModalErrorScope, $modalInstance, msg) {
      $scope.modalErrorCtrl = this;
      this.msg = msg;
      this.modalInstance = $modalInstance;
      console.log(this);
    }

    private ok(){
      this.modalInstance.close();
    }
  }
}

app.registerController('ModalErrorCtrl', ['$scope', '$modalInstance', 'msg']); 
