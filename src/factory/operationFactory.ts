import OperationAdd from "./operationAdd";
import OperationSub from "./operationSub";
import OperationMul from "./operationMul";
import OperationDiv from "./operationDiv";
import IOperation from "./IOperation";


export default class OperationFactory {
    static getOperation(operator:string):IOperation | undefined {
        switch(operator)
        {
            case "+":
                return new OperationAdd();
            case "-":
                return new OperationSub();
            case "*":
                return new OperationMul();
            case "/":
                return new OperationDiv();
            default:
                return;
        }
    }
}
