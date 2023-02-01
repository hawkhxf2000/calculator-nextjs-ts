import OperationFactory from "../../factory/operationFactory";
import {NextApiRequest,NextApiResponse} from "next";
import IOperation from "../../factory/IOperation";
import Operation from "../../factory/IOperation";

export default function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    let numberA = req.query.numberA;
    let numberB= req.query.numberB;
    let operator = <string>req.query.operator;


    if(numberA === null || numberB === null){
        return res.status(400).json("There must be two numbers for calculation");
    }
    if(!operator) {
        return res.status(400).json("There must be a operator");
    }
    if(operator == "/" && Number(numberB) === 0){
        return res.status(400).json("Division by 0");
    }

    let re = /^\+|-|\*|\/$/;
    if(!re.test(<string>operator)){
        return res.status(400).json("The operator is not correct");
    }

    let oper = <IOperation>OperationFactory.getOperation(operator);
    oper.numberA = Number(numberA);
    oper.numberB = Number(numberB);
    res.status(200).json({result:oper.getResult()});
}