/* 
    泛型： 俩个值之间存在的对应关系，比如 函数参数的值 和 函数返回的值 之间存在的对应关系； 

    function firstElement(arr: any[]) {
        返回值是 参数的某个元素
        return arr[0];
    }

*/
// 这个Type 写什么都可以
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
    // return 1000  这样写报错 ， 因为这个是泛型， 不能确定调用是传进来的就一定是 number 类型；
}
const s = firstElement<string>(["a", "b", "c"]); //s是'string'类型 <这里声明传参类型> 不写也可以 ， ts 会自动推断。
const n = firstElement<number>([1, 2, 3]); // n是'number'类型
const u = firstElement<undefined>([]); // u是undefined类型

// 同时使用多个泛型 用 逗号隔开；
// Input 是 string 类型 ， Output 是 number 类型
function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output
): Output[] {
    return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// 泛型函数的限制条件 extends 关键字
/*
    <Type extends { length: number }>
    意思是 参数a  或 b  必须具有 length 这个属性， 且它的值时number 类型；
*/
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
const longerArray = longest([1, 2], [2, 3, 4]);
const longerString = longest("felix", "lu");
// const notOk = longest(10, 100); 报错

// 使用通用约束条件的常见错误
/*
    function minimumLength<Type extends { length: number }>(
        obj: Type,
        minimum: number
    ): Type {
        // 泛型 Type 是 Array , 但是返回的 却是  object
        if (obj.length >= minimum) {
            return obj;
        } else {
            return { length: minimum };
        }
    }
    const arr = minimumLength([1, 2, 3], 6);
    console.log(arr.slice(0));
*/

// 如何指定类型参数

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// const arr = combine(["string"], [1, 2, 3]); //这样会报错 需要手动指定类型参数
const arr = combine<string | number>(["string"], [1, 2, 3]);
console.log(arr);

/*

  编写优秀通用函数的准则
1、可能的情况下，使用类型参数本身，而不是对其进行约束


2、总是尽可能少地使用类型参数
3、如果一个类型的参数只出现在一个地方，请重新考虑你是否真的需要它
类型参数是用来关联过个值的类型的，只使用了一次那就没有必要定义

 */

// 规则1
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
    // Type被 any[] 约束了
    return arr[0];
}
const a = firstElement1([1, 2, 3]);
const b = firstElement2([1, 2, 3]);

// 规则 2
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean) {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
) {
    // Func 类型参数就是约束了一下为函数 ， 没有干其他用处。 所以可以尽可能少用类型参数
    return arr.filter(func);
}

// 规则3
function greet<Str extends string>(s: Str) {
    console.log("Hello," + s);
}
greet("World");
function greet2(s: string) {
    console.log("Hello," + s);
}

// 可选参数 和 默认值
function selectableArg(num?: number) {
    // 可选参数和 默认值不能同时在同一个值上使用
    // function selectableArg(num: number = 100) {
}

// 回调函数中的可选参数

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        // callback(arr[i], i)
        callback(arr[i]);
    }
}
// myForEach([1, 2, 3],(a) ⇒ console.log(a))
// myForEach([1, 3, 4], (a, i) ⇒ console.log(a, i))
myForEach([1, 2, 3], (a, i) => {
    /*
        当为为回调写一个函数的时候， 永远不要写可选参数， 除非不传递该参数就不调用该函数
    */
    // console.log(i.toFixed()); // 这里报错 ，因为 i 是可选参数
});

/*
函数重载
这些重复定义的函数 和参数的形式就称之为函数签名
*/
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// 签名两个叫做 重载签名， 也叫重载函数 ，不用实现
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    //  d和 y 是可选参数的原因是 由于 第一个函数只有一个参数
    // 当前这个叫做 实现签名， 实现函数， 要实现功能， 实现签名的参数 要和 重载签名的一致
    // 实现签名的 函数不能用重载签名的参数， 只能要兼容它， 并且调用的时候要和重载签名的参数格式一致，而不是参照实现签名的参数传递参数
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 6, 7);
// const d3 = makeDate(5, 9);  // 这里报错，原因只能参照 重载签名的参数去传， 没有传两个参数的

// 重载签名和实现签名的三个问题

// 1、参数不正确

// 2、参数类型不正确

// 3、返回类型不正确

