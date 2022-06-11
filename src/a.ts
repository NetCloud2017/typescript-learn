/*
 es6 数据类型
Boolean / Number / String / Array / Object / Function 
Symbol / Undefined / Null 

TypeScript 数据类型
Boolean / Number / String / Array / Object / Function
Symbol / Undefined / Null
void / any / never / 元组 / 枚举 / 高级类型（泛型）
*/

// 原始类型
let bool: boolean = false;
let num: number = 0;
let abc: string = "name";

//数组
let arr1: Array<string> = ["abc", "d", "e"]; // 这种是泛型写法
let arr2: number[] = [23]; // 定义一个数组类型， 数组的元素是数字；
// 联合类型
let arr3: Array<string | number> = ["abc", "d", "e"];

// 元组 : 是一个特殊的类数组，他限定元素的类型和个数， 有数组的方法；但是无法直接
// 获取其数据；
let tuple: [number, string] = [23, "23"];
// 元组的越界问题
// tuple.push(3);
// console.log(tuple);
// tuple[2]; // 添加的元素访问不到。实际开发中不允许这样使用；

// 函数
// let  add = (x,y) => x + y;

// let add= (x:number,y:number):number(这个number 是返回值的类型)=> x + y;
// 通常 返回值类型可以省略， ts 的类型推断功能；
// 函数也会根据返回 值推断 返回值的类型；
let add = (x: number, y: number): number => x + y;
// 定义函数类型
let compute: (x: number, y: number) => number;
// 创建函数
compute = (a, b) => a + b;

const names = ["小干", "小锋", "小猿"];
names.forEach(function (s) {
    // forEach 的 s 的类型也是根据 names 元素 推断出来的，这个叫上下文类型；
    // 这样可以 知道哪里可以省略写类型注释；
    console.log(s.toUpperCase());
});
 

//对象
let obj: object = { x: 1, y: 2 };
// 这里只是定义了它是object类型但是美说明它应该包含哪些属性
// 所以直接修改会失败
// obj.x = 3; // Error 修改失败/
// 应该这样声明
let obj2: { x: number; y: number } = {
    x: 1,
    y: 23,
};
obj2.x = 2; // 可以修改成功；

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2); // false;

// undefined null
// undefined 和 null 任何 类型的子类型
// 默认情况下是 不允许给其他类型赋值的，
// 若是要赋值可以使用联合类型 或 去tsconfig 文件 设置 strictNullChecks: false;
let un: undefined = undefined;
let nu: null = null;
let num1: number | null | undefined = 2;
num1 = nu;

// void 类型 表示没有任何返回值的类型； 如： let noReturn = () => {}
// 由于 undefined 不是保留字， 容易篡改所以出现了 void 0
let noReturn = () => void 0; //  返回值 是一个undefined;

// any
// 没有声明 默认是any 类型 可以赋任何类型的值；
let x;

// never 类型 表示永远不会有返回值的类型；
// 主要分两种情况 1、 抛出错误， 2、 死循环；
let error = () => {
    throw new Error("error");
};
let deathRun = () => {
    while (true) {}
};
