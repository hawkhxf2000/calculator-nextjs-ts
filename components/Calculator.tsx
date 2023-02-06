import styles from './Calculator.module.css'
import React, {useState} from "react";

interface numberToCalculate {
    numberA: string,
    numberB: string
}
export default function Calculator() {

    const initValue:numberToCalculate = {numberA : "", numberB : ""};

    const [textDisplay, setTextDisplay] = useState("");
    // const [numberDisplay, setNumberDisplay] = useState("");
    const [operatorClick, setOperatorClick] = useState(false);
    const [numberToCalc, setNumberToCalc] = useState<numberToCalculate>(initValue);
    const [operator, setOperator] = useState<string | null>(null);
    const [isCalcEnd, setIsCalcEnd] = useState(false);

    const handleNumberClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(isCalcEnd){
            alert("This is only a demo project, Only support calculation of 2 numbers");
            return;
        }
        // console.log(e.currentTarget.textContent);
        let text = textDisplay + e.currentTarget.textContent;
        setTextDisplay(text);
        operatorClick? setNumberToCalc({...numberToCalc, numberB: (numberToCalc.numberB+e.currentTarget.textContent)})
        : setNumberToCalc({...numberToCalc, numberA: (numberToCalc.numberA+e.currentTarget.textContent)})

    }

    const handleClear = () => {
        setTextDisplay('');
        setNumberToCalc(initValue);
        setOperator("");
        setOperatorClick(false);
        setIsCalcEnd(false);
    }

    const handleOperatorClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if (operatorClick) {
            alert("operator only can click once");
            return;
        }
        setOperatorClick(true);
        setOperator(e.currentTarget.textContent);
        let text = textDisplay + e.currentTarget.textContent;
        setTextDisplay(text);

    }

    const handleBackSpace = (() => {
        if(isCalcEnd){
            return;
        }

        let strLength;
        if(operatorClick){
            strLength = numberToCalc.numberB.length;
            setNumberToCalc({...numberToCalc, numberB: (numberToCalc.numberB.slice(0, strLength-1))})
        }else{
            strLength = numberToCalc.numberA.length;
            setNumberToCalc({...numberToCalc, numberA: (numberToCalc.numberA.slice(0, strLength-1))})
        }
        strLength = textDisplay.length;
        setTextDisplay(textDisplay.slice(0,strLength-1));
    })

    const handleEqualClick = async () => {
        if(isCalcEnd){
            return;
        }

        let operatorParam;

        switch (operator) {
            case "+":
                operatorParam = "%2B";
                break;
            case "x":
                operatorParam = "*";
                break;
            default:
                operatorParam = operator;
                break;
        }

        let url = "/api/calcFunction?numberA=" + numberToCalc.numberA
                    + "&numberB=" + numberToCalc.numberB
                    + "&operator=" + operatorParam;
        await fetch(url).then(response=>{
            if(response.status == 400){
                response.json().then(data=>{
                    alert(data);
                    handleClear();
                })
            }else{
                response.json().then(data=>{
                    console.log(data);
                    setNumberToCalc({...numberToCalc, numberB: data.result+""})
                })
            }
        })
        setOperator("");
        setIsCalcEnd(true);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.calcBody}>
                    <div className={styles.calcScreen}>
                        <div className={styles.calcOperation}>{textDisplay}</div>
                        <div className={styles.calcTyped}> {operatorClick ? numberToCalc.numberB : numberToCalc.numberA}
                            <span className={styles.blinkMe}>_</span>
                        </div>
                    </div>
                    <div className={styles.calcButtonRow}>
                        <div className={styles.buttonC} onClick={handleClear}>C</div>
                        <div className={styles.buttonL}>%</div>
                        <div className={styles.buttonL} onClick={handleBackSpace}>{"<-"}</div>
                        <div className={styles.buttonL} onClick={handleOperatorClick}>/</div>
                    </div>
                    <div className={styles.calcButtonRow}>
                        <div className={styles.button} onClick={handleNumberClick}>7</div>
                        <div className={styles.button} onClick={handleNumberClick}>8</div>
                        <div className={styles.button} onClick={handleNumberClick}>9</div>
                        <div className={styles.buttonL} onClick={handleOperatorClick} >x</div>
                    </div>
                    <div className={styles.calcButtonRow}>
                        <div className={styles.button} onClick={handleNumberClick}>4</div>
                        <div className={styles.button} onClick={handleNumberClick}>5</div>
                        <div className={styles.button} onClick={handleNumberClick}>6</div>
                        <div className={styles.buttonL} onClick={handleOperatorClick} >-</div>
                    </div>
                    <div className={styles.calcButtonRow}>
                        <div className={styles.button} onClick={handleNumberClick}>1</div>
                        <div className={styles.button} onClick={handleNumberClick}>2</div>
                        <div className={styles.button} onClick={handleNumberClick}>3</div>
                        <div className={styles.buttonL} onClick={handleOperatorClick} >+</div>
                    </div>
                    <div className={styles.calcButtonRow}>
                        <div className={styles.button} onClick={handleNumberClick}>.</div>
                        <div className={styles.button} onClick={handleNumberClick}>0</div>
                        <div className={styles.button}>!</div>
                        <div className={styles.buttonL} onClick={handleEqualClick}>=</div>
                    </div>
                </div>
            </div>
        </>
    )
}