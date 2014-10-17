/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalSuggScope {
    modalSuggCtrl : ModalSuggCtrl;
  }

  export class ModalSuggCtrl {

    private modalInstance: any;
    private condition: ConditionBlockModel;

    static $inject = ['$scope', '$modalInstance', 'condition'];
    constructor($scope: ModalSuggScope, $modalInstance, condition) {
      $scope.modalSuggCtrl = this;
      this.modalInstance = $modalInstance;
      this.condition = condition;
    }

    private onClick(){
      this.modalInstance.close();
    }

    private onCancel(){
      this.modalInstance.dismiss();
    }
  }
}

app.registerController('ModalSuggCtrl', ['$scope', '$modalInstance', 'condition']); 




