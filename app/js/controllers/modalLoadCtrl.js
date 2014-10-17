/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalLoadCtrl = (function () {
        function ModalLoadCtrl($scope, $modalInstance, model) {
            $scope.modalLoadCtrl = this;
            this.modalInstance = $modalInstance;
            this.model = model;
        }
        ModalLoadCtrl.prototype.onClick = function (object) {
            this.modalInstance.close(object);
        };
        ModalLoadCtrl.prototype.test = function () {
            console.log("JOIJOIJOIJ");
        };
        ModalLoadCtrl.$inject = ['$scope', '$modalInstance', 'model'];
        return ModalLoadCtrl;
    })();
    app.ModalLoadCtrl = ModalLoadCtrl;
})(app || (app = {}));

app.registerController('ModalLoadCtrl', ['$scope', '$modalInstance', 'model']);
