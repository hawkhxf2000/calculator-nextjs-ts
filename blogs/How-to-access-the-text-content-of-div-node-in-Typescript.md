---
title: 'How to access the text content of div node in Typescript'  
author: Xiao Feng Huang  
date: '2023-01-28'
---

在制作计算器的application中，使用div来做计算器按钮，因此需要获取div中的text内容。
~~~
<div className={styles.button} onClick={handleClick}>7</div>
~~~
在handleClick中引入event对象中的currentTarget属性中的textNode值，即为div中的text值
~~~
const handleClick = (e:React.MouseEvent<HTMLDivElement>) =>{
        console.log(e.currentTarget.textContent);
        let currentNumber = number + e.currentTarget.textContent;
        setNumber(currentNumber);
    }
~~~