/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var ModalBuildCtrl = (function () {
        function ModalBuildCtrl($scope, $modalInstance, curBlock, devices, curDeviceType, blockType) {
            $scope.modalBuildCtrl = this;
            this.blockType = blockType;
            if (curBlock === null) {
                switch (this.blockType) {
                    case 0 /* EVENT */:
                        this.newBlock = new EventBlockModel("0");
                        break;
                    case 1 /* CONDITION */:
                        this.newBlock = new ConditionBlockModel("0");
                        break;
                    case 2 /* ACTION */:
                        this.newBlock = new ActionBlockModel("0");
                        break;
                }
                this.newBlock.deviceType = curDeviceType;
                this.okButton = "Add Block";
                this.cancelButton = "Cancel";
            } else {
                this.newBlock = curBlock;
                this.okButton = "Modify Block";
                this.cancelButton = "Remove Block";
            }
            this.newBlock.operator = '=';
            this.devices = devices;
            this.curDeviceType = curDeviceType;
            this.modalInstance = $modalInstance;
        }
        ModalBuildCtrl.prototype.ok = function () {
            console.log(this.newBlock);
            this.modalInstance.close(this.newBlock);
        };

        ModalBuildCtrl.prototype.cancel = function () {
            this.modalInstance.close(null);
        };
        ModalBuildCtrl.$inject = ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType'];
        return ModalBuildCtrl;
    })();
    app.ModalBuildCtrl = ModalBuildCtrl;
})(app || (app = {}));

app.registerController('ModalBuildCtrl', ['$scope', '$modalInstance', 'curBlock', 'devices', 'curDeviceType', 'blockType']);
