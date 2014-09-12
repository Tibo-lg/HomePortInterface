
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

    constructor(id: string, device?: DeviceModel, service?: ServiceModel, value?: string, operator?: string) {
        this.id = id;
//        this.Device = device;//LoadController.GetDeviceByServiceURL(window.DeviceList, serviceUrl);
//        this.Service = service;//LoadController.GetServiceByUrl(window.DeviceList, serviceUrl);
//        this.value = value;
//        this.operator = operator;
    }
} 

class ActionBlockModel extends BlockModel {
    private SeqNumber: number;
    constructor(id : string, device :DeviceModel, service :ServiceModel, value, operator: string, seqNumber : number) {
        super(id, device, service, value, operator);
        this.SeqNumber = seqNumber;
    }

    public CreateCopy()
    {
      return new ActionBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.SeqNumber);
    }
}

class ConditionBlockModel extends BlockModel {

   /* public static CreatefromScenarioBlock(block: ScenarioBlockModel) {
        return new ScenarioConditionModel(block.Service.Url, block.value);
    }*/

    constructor(id : string, device :DeviceModel, service :ServiceModel, value, operator: string) {
        super(id, device, service, value, operator);
    }

    public CreateCopy()
    {
      return new ConditionBlockModel(this.id, this.Device, this.Service, this.value, this.operator);
    }
} 

class EventBlockModel extends BlockModel {

    private Duration: number;

    /*public static CreatefromScenarioBlock(block: ScenarioBlockModel, seqNumber, duration, timeRelation) {
        return new ScenarioEventModel(block.Service.Url, block.value, seqNumber, duration, timeRelation);
    }*/

    constructor(id: string, device :DeviceModel, service :ServiceModel, value : any, operator : string, duration : number) {
        super(id, device, service, value, operator);

        this.Duration = duration;
    }

    public CreateCopy()
    {
      return new EventBlockModel(this.id, this.Device, this.Service, this.value, this.operator, this.Duration);
    }
} 
