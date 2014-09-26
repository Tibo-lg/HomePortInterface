class ServiceModel {
    public desc: string;
    public id: string;
    public type: string;
    public url: string;
    public value_url: string;
    public parameter: Parameter;

    constructor() {
    }
}

class Parameter{
    public unit: string;
    public step: number;
    public min: number;
    public max: number;

    constructor(){

    }
}

var BinaryOperatorEnum = {
    equal: "=",
    lessThan: "<",
    lessThanOrEqual: "<=",
    largerThan: ">",
    largerThanOrEqual: ">=",
}
