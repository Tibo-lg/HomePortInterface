class IEvent{
  serviceId: string;
  value: string;
  duration: string;
  deviceType: string;

  constructor(serviceId, value, duration){
    this.serviceId = serviceId;
    this.value = value;
    this.duration = duration;
  }
}

