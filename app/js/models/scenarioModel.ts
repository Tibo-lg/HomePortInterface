class ScenarioModel {

    public id: string;
    public name: string;
    public event: EventBlockModel;
    public conditions: Array<ConditionBlockModel>;
    public actions: Array<ActionBlockModel>;
    public IsSaved: boolean;
    public desc: string;
    public active: boolean;

    constructor(name, id, whenBlock : EventBlockModel, ifArray : Array<ConditionBlockModel>, thenArray : Array<ActionBlockModel>, desc: string, active: boolean) {
        this.event = whenBlock;
        this.conditions = ifArray;
        this.actions = thenArray;
        this.name = name;
        this.id = id;
        this.IsSaved = true;
	this.desc = desc;
	this.active = active;
    }

    public CreateCopy() {
      var tmpconditions = new Array<ConditionBlockModel>();
      var tmpactions = new Array<ActionBlockModel>();

      for(var i = 0; i<this.conditions.length; i++)
      {
	tmpconditions.push(this.conditions[i].CreateCopy());
      }

      for(var i = 0; i<this.actions.length; i++)
      {
	tmpactions.push(this.actions[i].CreateCopy());
      }

      return new ScenarioModel(this.name, this.id, (this.event == null ? null :  this.event.CreateCopy()), tmpconditions, tmpactions, this.desc, this.active);
    }
}
