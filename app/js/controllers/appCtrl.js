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
            this.curScenario = new ScenarioModel("", 0, null, new Array(), new Array(), "", true);
            this.deviceTypes = new Array();
            this.updateDevices();
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

        AppCtrl.prototype.updateProperties = function () {
            var _this = this;
            this.appFactory.getProperties(this.devices).then(function (data) {
                _this.properties = data;
            }, function (error) {
                console.error("Could not load property list");
            });
        };

        AppCtrl.prototype.updateTemplates = function () {
            var _this = this;
            this.appFactory.getTemplates().then(function (data) {
                _this.templates = data;
            }, function (error) {
                console.error("Could not load template list");
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
                    },
                    blockType: function () {
                        return blockType;
                    }
                }
            });

            modalInstance.result.then(function (newBlock) {
                if (newBlock != null) {
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
                }
            });
        };

        AppCtrl.prototype.openBlock = function (curBlock, blockType) {
            var _this = this;
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-build.html',
                controller: 'app.ModalBuildCtrl',
                size: 'lg',
                resolve: {
                    curBlock: function () {
                        return curBlock.CreateCopy();
                    },
                    devices: function () {
                        return _this.devices;
                    },
                    curDeviceType: function () {
                        return curBlock.deviceType;
                    },
                    blockType: function () {
                        return blockType;
                    }
                }
            });

            modalInstance.result.then(function (newBlock) {
                if (newBlock == null) {
                    _this.removeBlock(curBlock);
                } else {
                    curBlock.setToBlock(newBlock);
                }
            });
        };

        AppCtrl.prototype.setCurDeviceType = function (deviceType) {
            this.curDeviceType = deviceType;
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

        AppCtrl.prototype.save = function () {
            var _this = this;
            if (this.curScenario.name != null && /\S/.test(this.curScenario.name) && this.curScenario.actions.length != 0) {
                this.curScenario.id = this.curScenario.name.replace(/ /g, '');
                var modalInstance = this.modal.open({
                    templateUrl: 'partials/modal-edit.html',
                    controller: 'app.ModalEditCtrl',
                    size: 'lg',
                    resolve: {
                        scenario: function () {
                            return _this.curScenario.CreateCopy();
                        }
                    }
                });
                modalInstance.result.then(function (desc) {
                    _this.curScenario.desc = desc;
                    if (_this.location.path() === "/build") {
                        _this.saveScenario();
                    } else if (_this.location.path() === "/prop") {
                        _this.appFactory.setProperty(_this.curScenario);
                    }
                });
            } else if (this.curScenario.actions.length == 0) {
                this.modal.open({
                    templateUrl: 'partials/modal-error.html',
                    controller: 'app.ModalErrorCtrl',
                    size: 'sm',
                    resolve: {
                        msg: function () {
                            return "You need at least one action.";
                        }
                    }
                });
            } else {
                this.modal.open({
                    templateUrl: 'partials/modal-error.html',
                    controller: 'app.ModalErrorCtrl',
                    size: 'sm',
                    resolve: {
                        msg: function () {
                            return "Please enter a name before saving.";
                        }
                    }
                });
            }
        };

        AppCtrl.prototype.handleConflict = function (condition) {
            var _this = this;
            var modalInstance = this.modal.open({
                templateUrl: 'partials/modal-suggestion.html',
                controller: 'app.ModalSuggCtrl',
                size: 'lg',
                resolve: {
                    condition: function () {
                        return condition;
                    }
                }
            });

            modalInstance.result.then(function () {
                _this.curScenario.conditions.push(condition);
            });
        };

        AppCtrl.prototype.saveScenario = function () {
            var _this = this;
            if (this.curScenario.event != null) {
                this.appFactory.setScenario(this.curScenario, this.devices).then(function (response) {
                    console.log(response);
                    if (response.status == 409) {
                        console.log("BIZARRRE");
                        _this.handleConflict(response.data);
                    }
                });
            } else if (this.curScenario.event == null) {
                this.modal.open({
                    templateUrl: 'partials/modal-error.html',
                    controller: 'app.ModalErrorCtrl',
                    size: 'sm',
                    resolve: {
                        msg: function () {
                            return "Cannot have a scenario without event";
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
                _this.curScenario = new ScenarioModel("", 0, null, new Array(), new Array(), "", true);
                _this.location.path(route);
            });
        };

        AppCtrl.prototype.load = function () {
            var _this = this;
            this.updateScenarios();
            this.updateProperties();
            this.updateTemplates();
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
                    if (_this.curScenario.event != null) {
                        if (_this.curScenario.event.Device == null) {
                            _this.curScenario.name = "";
                        }
                        _this.location.path("/build");
                    } else {
                        _this.location.path("/prop");
                    }
                }
            });
        };

        AppCtrl.prototype.manage = function () {
            this.updateScenarios();
            this.updateProperties();
            this.updateTemplates();
        };

        AppCtrl.prototype.onActiveChange = function (type, id, value) {
            this.appFactory.setActive(type, id, value);
        };

        AppCtrl.prototype.removeScenario = function (id) {
            var _this = this;
            this.appFactory.removeScenario(id).then(function () {
                _this.updateScenarios();
            });
        };

        AppCtrl.prototype.removeProperty = function (id) {
            var _this = this;
            this.appFactory.removeProperty(id).then(function () {
                _this.updateProperties();
            });
        };
        AppCtrl.$inject = ['$scope', '$location', '$modal', 'appFactory'];
        return AppCtrl;
    })();
    app.AppCtrl = AppCtrl;
})(app || (app = {}));

app.registerController('AppCtrl', ['$scope', '$location', '$modal', 'appFactory']);
