/*
    控制流分析： 
     
    // 这种基于可达性的代码分析称为 控制流分析；
*/
// function padLeft(padding: number | string, input: string) {
//     if (typeof padding === "number") {
//         // 若是 padding 是 number  这个 函数的返回值 就是一个 string，
//         // 它会把 number 和 Sting 类型缩写为 string 类型
//         return new Array(padding + 1).join(" ") + input;
//     }
//     return padding + input;
// }

// 例如
function example() {
    let x: string | number | boolean;
    x = Math.random() < 0.5;
    // let x: boolean
    console.log(x);
    if (Math.random() < 0.5) {
        x = "hello";
        // x: string
        console.log(x);
    } else {
        x = 100;
        // x: number
        console.log(x);
    }
    return x;
}

let newX = example();
newX = 'hello';
newX = 100;
// newX = true // 这里会报错 , 因为函数的返回值被推断出只有
// string  和 number 这两个类型；