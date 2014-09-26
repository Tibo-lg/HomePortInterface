/// <reference path='../_all.ts' />
/** Controller for the application **/
var app;
(function (app) {
    var AppCtrl = (function () {
        function AppCtrl($scope, $location, $modal, appFactory) {
            var _this = this;
            $scope.appCtrl = this;
            this.location = $location;
            this.apply = $scope.$apply;
            this.modal = $modal;
            this.appFactory = appFactory;
            this.curScenario = new ScenarioModel("", 0, null, new Array(), new Array());
            this.deviceTypes = new Array();
            this.updateDevices();
            this.newBlock = new BlockModel("0");
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
                console.error("Could not load device list");
            });
        };

        AppCtrl.prototype.updateScenarios = function () {
            var _this = this;
            this.appFactory.getScenarios(this.devices).then(function (data) {
                _this.scenarios = data;
            }, function (error) {
                console.error("Could not load scenario list");
            });
        };

        AppCtrl.prototype.openModal = function (blockType) {
            var _this = this;
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-build.html',
                controller: 'app.ModalBuildCtrl',
                size: 'lg',
                resolve: {
                    curBlock: function () {
                        return null;
                    },
                    devices: function () {
                        return _this.devices;
                    },
                    curDeviceType: function () {
                        return _this.curDeviceType;
                    }
                }
            });

            modalInstance.result.then(function (newBlock) {
                switch (blockType) {
                    case 0 /* EVENT */:
                        _this.curScenario.event = newBlock;
                        break;
                    case 1 /* CONDITION */:
                        _this.curScenario.conditions.push(newBlock);
                        break;
                    case 2 /* ACTION */:
                        _this.curScenario.actions.push(newBlock);
                        break;
                }
            });
        };

        AppCtrl.prototype.openBlock = function (curBlock) {
            var _this = this;
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-build.html',
                controller: 'app.ModalBuildCtrl',
                size: 'lg',
                resolve: {
                    curBlock: function () {
                        return curBlock;
                    },
                    devices: function () {
                        return _this.devices;
                    },
                    curDeviceType: function () {
                        return curBlock.Device.type;
                    }
                }
            });
        };

        AppCtrl.prototype.setCurDeviceType = function (deviceType) {
            this.curDeviceType = deviceType;
            console.log("Cur Device Type: " + this.curDeviceType);
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
            if (this.curScenario.name != null && /\S/.test(this.curScenario.name)) {
                this.curScenario.id = this.curScenario.name.replace(/ /g, '');
                this.appFactory.setScenario(this.curScenario);
            } else {
                this.modal.open({
                    templateUrl: 'partials/modal-error.html',
                    controller: 'app.ModalErrorCtrl',
                    size: 'sm',
                    resolve: {
                        msg: function () {
                            return "Please enter a scenario name";
                        }
                    }
                });
            }
        };

        AppCtrl.prototype.newClick = function () {
            var _this = this;
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-choice.html',
                controller: 'app.ModalChoiceCtrl',
                size: 'lg'
            });
            modalInstance.result.then(function (route) {
                _this.location.path(route);
            });
        };

        AppCtrl.prototype.load = function () {
            var _this = this;
            this.updateScenarios();
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-load.html',
                controller: 'app.ModalLoadCtrl',
                size: 'lg',
                resolve: {
                    model: function () {
                        return _this;
                    }
                }
            });
            modalInstance.result.then(function (object) {
                if (object instanceof ScenarioModel) {
                    _this.curScenario = object;
                }
            });
        };
        AppCtrl.$inject = ['$scope', '$location', '$modal', 'appFactory'];
        return AppCtrl;
    })();
    app.AppCtrl = AppCtrl;
})(app || (app = {}));

app.registerController('AppCtrl', ['$scope', '$location', '$modal', 'appFactory']);
