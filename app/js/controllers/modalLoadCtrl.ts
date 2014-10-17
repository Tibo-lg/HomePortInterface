/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalLoadScope {
    modalLoadCtrl : ModalLoadCtrl;
  }

  export class ModalLoadCtrl {

    private modalInstance: any;
    private model: AppCtrl;

    static $inject = ['$scope', '$modalInstance', 'model'];
    constructor($scope: ModalLoadScope, $modalInstance, model) {
      $scope.modalLoadCtrl = this;
      this.modalInstance = $modalInstance;
      this.model = model;
    }

    private onClick(object){
      this.modalInstance.close(object);
    }
    private test(){console.log("JOIJOIJOIJ");}
  }
}

app.registerController('ModalLoadCtrl', ['$scope', '$modalInstance', 'model']); 


