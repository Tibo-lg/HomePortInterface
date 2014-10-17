/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalChoiceScope {
    modalChoiceCtrl : ModalChoiceCtrl;
  }

  export class ModalChoiceCtrl {

    private modalInstance: any;

    static $inject = ['$scope', '$modalInstance'];
    constructor($scope: ModalChoiceScope, $modalInstance) {
      $scope.modalChoiceCtrl = this;
      this.modalInstance = $modalInstance;
    }

    private redirect(route){
      this.modalInstance.close(route);
    }
  }
}

app.registerController('ModalChoiceCtrl', ['$scope', '$modalInstance']); 

