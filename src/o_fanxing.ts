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

// interface Box<Type> {
//     contents: Type;
// }
// interface Apple {}
// let aa: Apple = {};
// type AppleBox = Box<Apple>; // ApplyBox 就是 Box<Apple>
// let ab: AppleBox = {
//     contents: aa,
// };

// type 定义泛型

type Box<Type> = {
    contents: Type;
};
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>; // 相当于 Type | Type[] | null
type OneOrManyOrNul1String = OneOrManyOrNull<string>; //  string | string[] | null

// 类型操纵 可以用其他的类型术语来表达类型

// 如何从类型中创建类型

/*
    我们可以通过各种类型操作符， 用一种简洁的， 可维护的方式来表达复杂的操作和值
    //   用现有的类型 或者是值来表达一个新的类型的方法
*/

// 1、 泛型类型
// function identity<Type>(arg: Type): Type {
//     return arg;
// }
// let output = identity<string>("myString");

// function loggingIdentity<Type>(arg: Array<Type>): Type[] { // Array<Type> 参数是 Array , 参数元素是泛型，当前type 是 number
//     console.log(arg.length); // 不定义泛型为数组时 ，会报错
//     return arg;
// }
// loggingIdentity([100, 200]);

function identity<Type>(arg: Type): Type {
    // 泛型函数声明
    return arg;
}
// let myIdentity: <Type>(arg: Type) => Type = identity;   // 泛型函数字面量
// let myIdentity: <Input>(arg: Input) => Input = identity; // Type 的名字不用和 identity 的一致， 只要命名是一一对应既可
// let myIdentity: { <Type>(arg: Type): Type } = identity; // 也可以用对象字面量的形式定义
// interface GenericIdentityFn {
//     // 泛型接口
//     <Type>(arg: Type): Type; // <Type>(arg: Type) 相当于函数的命名部分 , 后面的 :<Type> 是声明函数的返回值
// }
// let myIdentity: GenericIdentityFn = identity;
interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}
let myIdentity: GenericIdentityFn<string> = identity; // 确定泛型参数类型
// myIdentity(123) //   会报错
myIdentity("123");

// 泛型类

class GenericNumber<NumType> {
    //类的 属性和 方法 初始化没有明确赋值会报错，可以设置 "strictPropertyInitialization": false,
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}
// let myGeneric = new GenericNumber<number>();
// myGeneric.zeroValue = 0;
// myGeneric.add = function (x, y) {
//     return x + y;
// };
let myGeneric = new GenericNumber<string>();
myGeneric.zeroValue;
myGeneric.add = function (x, y) {
    return x + y;
};

// 泛型约束

interface Lengthwise {
    length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // 这样也可以确保 arg 这个参数拥有 length 这个属性；
    return arg;
}
loggingIdentity(["hello", "world"]);

// 在泛型约束中使用类型参数

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    //  Key 用 keyof  约束 为 属于 Type 里面的某个 key
    return obj[key];
}
let c = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};
getProperty(c, "a");

// 在泛型中使用 类类型

class Animal {
    numLegs: number = 4;
}
class Bee extends Animal {
    keeper: boolean = false;
}
class Lion extends Animal {
    keeper: string = "gogo";
}
class BeeKeeper {
    name: '6666'
}
function createInstance<A extends Animal>(c: new () => A): A { // new () => A) 表示传进来的是一个类， 
   // <A extends Animal> A 继承于 Animal 的 泛型 ，因此 传入的类 需要具有 Animal 的属性；
    return new c();
}
createInstance(Lion).keeper;
createInstance(Bee).keeper;
// createInstance(BeeKeeper); //  没有 Animal 的属性所以报错；

// getproperty(c, "m"); 报错

// 2、 keyof 类型操作符

// 3、 typeof  类型操作符

// 4、 索引访问类型

// 5、 条件类型

// 6、 映射类型

// 7、 模板字面量类型
