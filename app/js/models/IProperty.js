var IProperty = (function () {
    function IProperty(name, id, condition, action, desc, active) {
        this.name = name;
        this.id = id;
        this.condition = condition;
        this.action = action;
        this.desc = desc;
        this.active = active;
    }
    return IProperty;
})();
