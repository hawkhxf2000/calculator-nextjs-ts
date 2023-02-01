import Operation from "./operation";

export default class OperationSub extends Operation{
    constructor() {
        super();
    }
    public override getResult(): number {
        return this.numberA - this.numberB;
    }
}