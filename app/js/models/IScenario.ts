class IScenario{
  public name: string;
  public id: string;
  public event: IEvent;
  public conditions: Array<ICondition>;
  public actions: Array<IAction>;
  public desc: string;
  public active: boolean; 

  constructor(name, id, event, conditions, actions, desc, active){
    this.name = name;
    this.id = id;
    this.event = event;
    this.conditions = conditions;
    this.actions = actions;
    this.desc = desc;
    this.active = active;
  }
}
