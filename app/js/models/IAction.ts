class IAction{
  serviceId: string;
  value: string;
  seqNumber: number;
  deviceType: string;

  constructor(serviceId, value, seqNumber){
    this.serviceId = serviceId;
    this.value = value;
    this.seqNumber = seqNumber;
  }
}
