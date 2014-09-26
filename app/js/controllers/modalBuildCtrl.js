/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalBuildCtrl = (function () {
        function ModalBuildCtrl($scope, $modalInstance, curBlock, devices, curDeviceType) {
            $scope.modalBuildCtrl = this;
            if (curBlock === null) {
                this.newBlock = new BlockModel("0");
            } else {
                this.newBlock = curBlock;
            }
            this.newBlock.operator = '=';
            this.devices = devices;
            this.curDeviceType = curDeviceType;
            this.modalInstance = $modalInstance;
        }
        ModalBuildCtrl.prototype.ok = function () {
            this.modalInstance.close(this.newBlock);
        };

        ModalBuildCtrl.prototype.cancel = function () {
            this.modalInstance.dismiss();
        };
        ModalBuildCtrl.$inject = ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType'];
        return ModalBuildCtrl;
    })();
    app.ModalBuildCtrl = ModalBuildCtrl;
})(app || (app = {}));

app.registerController('ModalBuildCtrl', ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType']);
