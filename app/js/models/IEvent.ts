class IEvent{
  serviceId: string;
  value: string;
  duration: string;

  constructor(serviceId, value, duration){
    this.serviceId = serviceId;
    this.value = value;
    this.duration = duration;
  }
}

