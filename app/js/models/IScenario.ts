class IScenario{
  private name: string;
  private id: string;
  private event: IEvent;
  private conditions: Array<ICondition>;
  private actions: Array<IAction>;

  constructor(name, id, event, conditions, actions){
    this.name = name;
    this.id = id;
    this.event = event;
    this.conditions = conditions;
    this.actions = actions;
  }
}
