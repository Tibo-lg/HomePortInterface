var IAction = (function () {
    function IAction(serviceId, value, seqNumber) {
        this.serviceId = serviceId;
        this.value = value;
        this.seqNumber = seqNumber;
    }
    return IAction;
})();
