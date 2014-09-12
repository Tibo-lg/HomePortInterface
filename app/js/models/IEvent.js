var IEvent = (function () {
    function IEvent(serviceId, value, duration) {
        this.serviceId = serviceId;
        this.value = value;
        this.duration = duration;
    }
    return IEvent;
})();
