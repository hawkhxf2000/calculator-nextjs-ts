import Operation from "./operation";

export default class OperationAdd extends Operation{
    constructor() {
        super();
    }
    public override getResult(): number {
        return this.numberA + this.numberB;
    }
}