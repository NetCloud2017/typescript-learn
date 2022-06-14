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

// 可选参数