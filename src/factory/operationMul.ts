import Operation from "./operation";

export default class OperationMul extends Operation{
    constructor() {
        super();
    }
    public override getResult(): number {
        return this.numberA * this.numberB;
    }
}