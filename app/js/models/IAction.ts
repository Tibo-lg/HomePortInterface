class IAction{
  serviceId: string;
  value: string;
  seqNumber: number;

  constructor(serviceId, value, seqNumber){
    this.serviceId = serviceId;
    this.value = value;
    this.seqNumber = seqNumber;
  }
}
