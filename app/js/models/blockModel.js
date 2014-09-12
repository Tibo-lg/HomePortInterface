var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlockType;
(function (BlockType) {
    BlockType[BlockType["EVENT"] = 0] = "EVENT";
    BlockType[BlockType["CONDITION"] = 1] = "CONDITION";
    BlockType[BlockType["ACTION"] = 2] = "ACTION";
})(BlockType || (BlockType = {}));

var BlockModel = (function () {
    function BlockModel(id, device, service, value, operator) {
        this.id = id;
        //        this.Device = device;//LoadController.GetDeviceByServiceURL(window.DeviceList, serviceUrl);
        //        this.Service = service;//LoadController.GetServiceByUrl(window.DeviceList, serviceUrl);
        //        this.value = value;
        //        this.operator = operator;
    }
    return BlockModel;
})();

var ActionBlockModel = (function (_super) {
    __extends(ActionBlockModel, _super);
    function ActionBlockModel(id, device, service, value, operator, seqNumber) {
        _super.call(this, id, device, service, value, operator);
        this.SeqNumber = seqNumber;
    }
    ActionBlockModel.prototype.CreateCopy = function () {
        return new ActionBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.SeqNumber);
    };
    return ActionBlockModel;
})(BlockModel);

var ConditionBlockModel = (function (_super) {
    __extends(ConditionBlockModel, _super);
    /* public static CreatefromScenarioBlock(block: ScenarioBlockModel) {
    return new ScenarioConditionModel(block.Service.Url, block.value);
    }*/
    function ConditionBlockModel(id, device, service, value, operator) {
        _super.call(this, id, device, service, value, operator);
    }
    ConditionBlockModel.prototype.CreateCopy = function () {
        return new ConditionBlockModel(this.id, this.Device, this.Service, this.value, this.operator);
    };
    return ConditionBlockModel;
})(BlockModel);

var EventBlockModel = (function (_super) {
    __extends(EventBlockModel, _super);
    /*public static CreatefromScenarioBlock(block: ScenarioBlockModel, seqNumber, duration, timeRelation) {
    return new ScenarioEventModel(block.Service.Url, block.value, seqNumber, duration, timeRelation);
    }*/
    function EventBlockModel(id, device, service, value, operator, duration) {
        _super.call(this, id, device, service, value, operator);

        this.Duration = duration;
    }
    EventBlockModel.prototype.CreateCopy = function () {
        return new EventBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.Duration);
    };
    return EventBlockModel;
})(BlockModel);
