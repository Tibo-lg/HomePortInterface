/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalErrorCtrl = (function () {
        function ModalErrorCtrl($scope, $modalInstance, msg) {
            $scope.modalErrorCtrl = this;
            this.msg = msg;
            this.modalInstance = $modalInstance;
            console.log(this);
        }
        ModalErrorCtrl.prototype.ok = function () {
            this.modalInstance.close();
        };
        ModalErrorCtrl.$inject = ['$scope', '$modalInstance', 'msg'];
        return ModalErrorCtrl;
    })();
    app.ModalErrorCtrl = ModalErrorCtrl;
})(app || (app = {}));

app.registerController('ModalErrorCtrl', ['$scope', '$modalInstance', 'msg']);
