class ServiceModel {
    private desc: string;
    private id: string;
    private type: string;
    private url: string;
    private value_url: string;
    private parameter: Parameter;

    constructor() {
    }
}

class Parameter{
    private unit: string;
    private step: number;
    private min: number;
    private max: number;

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
