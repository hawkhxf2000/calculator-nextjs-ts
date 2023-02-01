import OperationFactory from "../factory/operationFactory";
import IOperation from "@/factory/IOperation";

test('1 + 2 to equal 3',() => {
    let oper:IOperation= <IOperation>OperationFactory.getOperation("+");
    oper.numberA = 1;
    oper.numberB = 2;
    expect(oper.getResult()).toBe(3);
})

test('2 -1 to equal 1',() => {
    let oper:IOperation= <IOperation>OperationFactory.getOperation("-");
    oper.numberA = 2;
    oper.numberB = 1;
    expect(oper.getResult()).toBe(1);
})


test('2 * 1 to equal 2',() => {
    let oper:IOperation= <IOperation>OperationFactory.getOperation("*");
    oper.numberA = 2;
    oper.numberB = 1;
    expect(oper.getResult()).toBe(2);
})


test('2/1 to equal 2',() => {
    let oper:IOperation= <IOperation>OperationFactory.getOperation("/");
    oper.numberA = 2;
    oper.numberB = 1;
    expect(oper.getResult()).toBe(2);
})