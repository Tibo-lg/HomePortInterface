var IScenario = (function () {
    function IScenario(name, id, event, conditions, actions) {
        this.name = name;
        this.id = id;
        this.event = event;
        this.conditions = conditions;
        this.actions = actions;
    }
    return IScenario;
})();
