import Operation from "./operation";

export default class OperationDiv extends Operation{
    constructor() {
        super();
    }
    public override getResult(): number {
        return this.numberA / this.numberB;
    }
}