/// <reference path='../_all.ts' />

/** Controller for the application **/
module app {

  export interface ModalEditScope {
    modalEditCtrl : ModalEditCtrl;
  }

  export class ModalEditCtrl {

    private modalInstance: any;
    private scenario: ScenarioModel;

    static $inject = ['$scope', '$modalInstance', 'scenario'];
    constructor($scope: ModalEditScope, $modalInstance, scenario) {
      $scope.modalEditCtrl = this;
      this.modalInstance = $modalInstance;
      this.scenario = scenario;
    }

    private onClick(){
      this.modalInstance.close(this.scenario.desc);
    }

    private onCancel(){
      this.modalInstance.dismiss();
    }
  }
}

app.registerController('ModalEditCtrl', ['$scope', '$modalInstance', 'scenario']); 



