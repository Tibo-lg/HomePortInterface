//enum DeviceType {
//  SIMPLE_SWITCH,
//  DOUBLE_SWITCH,
//  THERMOSTAT,
//  TEMP_HUMID_SENSOR,
//  ACCES_CONTROL,
//  WINDOW_SENSOR,
//}
var DeviceModel = (function () {
    function DeviceModel(id, description, location, type, service) {
        this.id = id;
        this.desc = description;
        this.location = location;
        this.type = type;
        this.service = service;
    }
    return DeviceModel;
})();
