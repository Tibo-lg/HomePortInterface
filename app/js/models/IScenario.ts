class IScenario{
  public name: string;
  public id: string;
  public event: IEvent;
  public conditions: Array<ICondition>;
  public actions: Array<IAction>;

  constructor(name, id, event, conditions, actions){
    this.name = name;
    this.id = id;
    this.event = event;
    this.conditions = conditions;
    this.actions = actions;
  }
}
