var IScenario = (function () {
    function IScenario(name, id, event, conditions, actions, desc, active) {
        this.name = name;
        this.id = id;
        this.event = event;
        this.conditions = conditions;
        this.actions = actions;
        this.desc = desc;
        this.active = active;
    }
    return IScenario;
})();
