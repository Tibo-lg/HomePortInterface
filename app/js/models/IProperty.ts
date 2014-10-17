class IProperty{
  public name: string;
  public id: string;
  public condition: ICondition;
  public action: IAction;
  public desc: string;
  public active: boolean; 

  constructor(name, id, condition, action, desc, active){
    this.name = name;
    this.id = id;
    this.condition = condition;
    this.action = action;
    this.desc = desc;
    this.active = active;
  }
}
