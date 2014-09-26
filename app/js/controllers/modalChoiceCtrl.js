/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalChoiceCtrl = (function () {
        function ModalChoiceCtrl($scope, $modalInstance) {
            $scope.modalChoiceCtrl = this;
            this.modalInstance = $modalInstance;
            console.log(this);
        }
        ModalChoiceCtrl.prototype.redirect = function (route) {
            this.modalInstance.close(route);
        };
        ModalChoiceCtrl.$inject = ['$scope', '$modalInstance'];
        return ModalChoiceCtrl;
    })();
    app.ModalChoiceCtrl = ModalChoiceCtrl;
})(app || (app = {}));

app.registerController('ModalChoiceCtrl', ['$scope', '$modalInstance']);
