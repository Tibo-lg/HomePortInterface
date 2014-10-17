/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalSuggCtrl = (function () {
        function ModalSuggCtrl($scope, $modalInstance, condition) {
            $scope.modalSuggCtrl = this;
            this.modalInstance = $modalInstance;
            this.condition = condition;
        }
        ModalSuggCtrl.prototype.onClick = function () {
            this.modalInstance.close();
        };

        ModalSuggCtrl.prototype.onCancel = function () {
            this.modalInstance.dismiss();
        };
        ModalSuggCtrl.$inject = ['$scope', '$modalInstance', 'condition'];
        return ModalSuggCtrl;
    })();
    app.ModalSuggCtrl = ModalSuggCtrl;
})(app || (app = {}));

app.registerController('ModalSuggCtrl', ['$scope', '$modalInstance', 'condition']);
