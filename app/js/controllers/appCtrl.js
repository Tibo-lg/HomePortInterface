/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var AppCtrl = (function () {
        function AppCtrl($scope, $location, appFactory) {
            var _this = this;
            $scope.appCtrl = this;
            this.appFactory = appFactory;
            this.curScenario = new ScenarioModel("", 0, null, new Array(), new Array());
            this.deviceTypes = new Array();
            this.updateDevices();
            this.newBlock = new BlockModel("0");
            this.showModal = 0;
            this.curDeviceType = "";
            $scope.openModal = function (blockType) {
                _this.openModal(blockType);
            };
            $scope.setCurDeviceType = function (blockType) {
                _this.setCurDeviceType(blockType);
            };
        }
        AppCtrl.prototype.updateDevices = function () {
            var _this = this;
            this.appFactory.getDevices().then(function (data) {
                _this.devices = data;
                console.log(_this.devices);
                for (var i = 0; i < _this.devices.length; i++) {
                    if (_this.deviceTypes.indexOf(_this.devices[i].type) == -1) {
                        _this.deviceTypes.push(_this.devices[i].type);
                    }
                }
            }, function (error) {
            });
        };

        AppCtrl.prototype.openModal = function (blockType) {
            this.newBlock = new BlockModel("0");
            this.newBlock.operator = '=';
            this.showModal = blockType;
            console.log("Cur Device Type: " + this.curDeviceType);
        };

        AppCtrl.prototype.setCurDeviceType = function (deviceType) {
            this.curDeviceType = deviceType;
            console.log("Cur Device Type: " + this.curDeviceType);
        };

        AppCtrl.prototype.addBlock = function () {
            if (this.showModal == 1) {
                this.newBlock.id = "0";
                this.curScenario.event = this.newBlock;
            } else if (this.showModal == 2) {
                this.newBlock.id = this.curScenario.conditions.length.toString();
                this.curScenario.conditions.push(this.newBlock);
            } else if (this.showModal == 3) {
                this.newBlock.id = this.curScenario.actions.length.toString();
                this.curScenario.actions.push(this.newBlock);
            }
            console.log(this.curScenario);
            this.showModal = 0;
        };

        AppCtrl.prototype.resetBlock = function () {
            this.newBlock = new BlockModel("0");
            this.showModal = 0;
        };

        AppCtrl.prototype.removeBlock = function (block) {
            if (block == this.curScenario.event) {
                this.curScenario.event = null;
            }
            var index = this.curScenario.conditions.indexOf(block);
            if (index > -1) {
                this.curScenario.conditions.splice(index, 1);
            }
            var index = this.curScenario.actions.indexOf(block);
            if (index > -1) {
                this.curScenario.actions.splice(index, 1);
            }
        };

        AppCtrl.prototype.saveScenario = function () {
            if (this.curScenario.name != null) {
                this.curScenario.id = this.curScenario.name.replace(/ /g, '');
                this.appFactory.setScenario(this.curScenario);
            }
        };
        AppCtrl.$inject = ['$scope', '$location'];
        return AppCtrl;
    })();
    app.AppCtrl = AppCtrl;
})(app || (app = {}));

app.registerController('AppCtrl', ['$scope', '$location', 'appFactory']);
