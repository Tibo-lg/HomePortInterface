var ScenarioModel = (function () {
    function ScenarioModel(name, id, whenBlock, ifArray, thenArray) {
        this.event = whenBlock;
        this.conditions = ifArray;
        this.actions = thenArray;
        this.name = name;
        this.id = id;
        this.IsSaved = true;
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

        return new ScenarioModel(this.name, this.id, (this.event == null ? null : this.event.CreateCopy()), tmpconditions, tmpactions);
    };
    return ScenarioModel;
})();
