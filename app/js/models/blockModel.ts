
enum BlockType {
  EVENT,
  CONDITION,
  ACTION
}

class BlockModel {
    public id: string;
    public Device: DeviceModel;
    public Service: ServiceModel;
    public value: string;
    public operator: string;
    public deviceType: string;

    constructor(id: string, device?: DeviceModel, service?: ServiceModel, value?: string, operator?: string, deviceType?: string) {
        this.id = id;
        this.Device = device;//LoadController.GetDeviceByServiceURL(window.DeviceList, serviceUrl);
        this.Service = service;//LoadController.GetServiceByUrl(window.DeviceList, serviceUrl);
        this.value = value;
        this.operator = operator;
	this.deviceType = deviceType;
    }

    public CreateCopy()
    {
      return new BlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.deviceType);
    }

    public setToBlock(b: BlockModel){
      this.id = b.id;
      this.Device = b.Device;
      this.Service = b.Service;
      this.value = b.value;
      this.operator = b.operator;
      this.deviceType = b.deviceType;
    }
} 

class ActionBlockModel extends BlockModel {
    private SeqNumber: number;
    constructor(id : string, device ?:DeviceModel, service ?:ServiceModel, value?: string, operator?: string, seqNumber?: number, deviceType?: string) {
        super(id, device, service, value, operator, deviceType);
        this.SeqNumber = seqNumber;
    }

    public CreateCopy()
    {
      return new ActionBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.SeqNumber, this.deviceType);
    }
}

class ConditionBlockModel extends BlockModel {

   /* public static CreatefromScenarioBlock(block: ScenarioBlockModel) {
        return new ScenarioConditionModel(block.Service.Url, block.value);
    }*/

    constructor(id : string, device?: DeviceModel, service?: ServiceModel, value?: string, operator?: string, deviceType?: string) {
        super(id, device, service, value, operator, deviceType);
    }

    public CreateCopy()
    {
      return new ConditionBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.deviceType);
    }
} 

class EventBlockModel extends BlockModel {

    public Duration: string;

    /*public static CreatefromScenarioBlock(block: ScenarioBlockModel, seqNumber, duration, timeRelation) {
        return new ScenarioEventModel(block.Service.Url, block.value, seqNumber, duration, timeRelation);
    }*/

    constructor(id: string, device?: DeviceModel, service?: ServiceModel, value?: any, operator?: string, duration?: string, deviceType?: string) {
        super(id, device, service, value, operator, deviceType);

        this.Duration = duration;
    }

    public CreateCopy()
    {
      return new EventBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.Duration, this.deviceType);
    }

    public setToBlock(b: BlockModel){
      this.Duration = (<EventBlockModel>b).Duration;
      super.setToBlock(b);
    }
} 
