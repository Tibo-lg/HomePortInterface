class ICondition{
  serviceId: string;
  value: string;
  deviceType: string;

  constructor(serviceId, value){
    this.serviceId = serviceId;
    this.value = value;
  }
}
