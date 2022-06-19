// undefined null 

function doSomething(x: string | null) {
    if(x === null) {

    } else {
        console.log(x.toUpperCase());
    }
    // 方法 2 使用非空断言运算符： ！ ，因为 ts 有一种特殊的
    // 语法 null 和 undefined， 可以在任何不进行显式检测的情况下
    // 从类型中删除， 叹号在表达式之后， 实际上是写入一种类型推断
    // 也就是说这个值不是 null 或 undefined
    
    //  例如 
    function donull (x?:number |null) {
        console.log(x!.toFixed()); // 非空断言
    }
}