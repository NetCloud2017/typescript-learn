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

// 同时使用多个泛型
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
