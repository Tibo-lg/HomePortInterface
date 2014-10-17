/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalEditCtrl = (function () {
        function ModalEditCtrl($scope, $modalInstance, scenario) {
            $scope.modalEditCtrl = this;
            this.modalInstance = $modalInstance;
            this.scenario = scenario;
        }
        ModalEditCtrl.prototype.onClick = function () {
            this.modalInstance.close(this.scenario.desc);
        };

        ModalEditCtrl.prototype.onCancel = function () {
            this.modalInstance.dismiss();
        };
        ModalEditCtrl.$inject = ['$scope', '$modalInstance', 'scenario'];
        return ModalEditCtrl;
    })();
    app.ModalEditCtrl = ModalEditCtrl;
})(app || (app = {}));

app.registerController('ModalEditCtrl', ['$scope', '$modalInstance', 'scenario']);
