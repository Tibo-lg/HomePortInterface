var ScenarioModel = (function () {
    function ScenarioModel(name, id, whenBlock, ifArray, thenArray, desc, active) {
        this.event = whenBlock;
        this.conditions = ifArray;
        this.actions = thenArray;
        this.name = name;
        this.id = id;
        this.IsSaved = true;
        this.desc = desc;
        this.active = active;
    }
    ScenarioModel.prototype.CreateCopy = function () {
        var tmpconditions = new Array();
        var tmpactions = new Array();

        for (var i = 0; i < this.conditions.length; i++) {
            tmpconditions.push(this.conditions[i].CreateCopy());
        }

        for (var i = 0; i < this.actions.length; i++) {
            tmpactions.push(this.actions[i].CreateCopy());
        }

        return new ScenarioModel(this.name, this.id, (this.event == null ? null : this.event.CreateCopy()), tmpconditions, tmpactions, this.desc, this.active);
    };
    return ScenarioModel;
})();
