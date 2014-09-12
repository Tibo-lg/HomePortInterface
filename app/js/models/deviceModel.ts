//enum DeviceType {
//  SIMPLE_SWITCH,
//  DOUBLE_SWITCH,
//  THERMOSTAT,
//  TEMP_HUMID_SENSOR,
//  ACCES_CONTROL,
//  WINDOW_SENSOR,
//}

class DeviceModel {

    public desc: string;
    public id: string;
    public location: string;
    public type: string;
    public services: Array<ServiceModel>;

    constructor(id: string, description: string, location: string, type: string, services: Array<ServiceModel>) {
        this.id = id;
        this.desc = description;
        this.location = location;
        this.type = type;
        this.services = services;
    }
}
