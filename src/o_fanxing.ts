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
// getproperty(c, "m"); 报错

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
    name: "6666";
}
function createInstance<A extends Animal>(c: new () => A): A {
    // new () => A) 表示传进来的是一个类，
    // <A extends Animal> A 继承于 Animal 的 泛型 ，因此 传入的类 需要具有 Animal 的属性；
    return new c();
}
createInstance(Lion).keeper;
createInstance(Bee).keeper;
// createInstance(BeeKeeper); //  没有 Animal 的属性所以报错；

// 2、 keyof 类型操作符
// 这操作符在映射类型组合的时候特别有用；

// type QQ = {
//     x: string;
//     y: string;
// };

// type Keys = keyof QQ; // 将 QQ的key 作为一个 类型 且值 是string

// const j: Keys = "x";
// // const k: Keys = 'w' 报错

type Arrayish = {
    [n: number]: unknown;
};
type AA = keyof Arrayish;
const a1: AA = 0;
type Mapish = {
    // 当 索引类型是string的时候 ，它就是 string  和 number 的联合类型 如下 可以赋 字符串也可以是 数字；
    [k: string]: boolean;
};
type M = keyof Mapish;
const m1: M = "s";
const m2: M = 100;
// const m3: M = true; // 索引类型只有 string 和 number；

// 3、 typeof  类型操作符
// typeof 使用时要注意， 不能修复 函数调用的返回值 例如 ： typeof  func(), 一般写 修饰变量或 对象的属性；
let str = "hello";
let str2: typeof str = "12"; // 检测 str 的类型作为 str2 的类型；
// str2 = 214 // 报错 , 因为不是 string 类型；

/*
预定义类型 
ReturnType<T>

ReturnType 是 TS 内置的
*/
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // 获取的 是函数返回值的类型
let ss: K = true;
function ff() {
    return {
        x: 10,
        y: 3,
    };
}
type P = ReturnType<typeof ff>;

const p: P = {
    x: 1,
    y: 2,
};

// 4、 索引访问类型

// type People = {
//     age: number,
//     name: string,
//     alive: boolean
// }

// interface People {
//     age: number
//     name: string
//     alive: boolean
// }
// type Age = People['age'] // 获取某个类型
// let  peopleAge: Age = 234;
// type PeopleId = People['age' | 'name'] // 获取多个类型  相当于 number | string

// type N = People[keyof People] //  相当于 number | string | boolean 这三个联合类型

// let n1:N = 'a'
// n1 = 2
// n1 = true
// // n1 = {} error

// type AliveOrName = 'alive' | 'name'
// type I3 = People[AliveOrName] // 相当于 boolean | string
// const I31: I3 = true
// const I32: I3 = 'hello'
// // const I33: 13 = 100

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
// type People ={ name: string, age: number }
type People = typeof MyArray[number];
const p1: Person = {
    name: "xiaoqian",
    age: 11,
    // alive: true,
};

type Age = typeof MyArray[number]["age"];
const age: Age = 11;
type Age2 = People["age"];
const age2: Age2 = 300;

// 只能在索引的时候使用类型， 而不能是变量引用, 如下
const key = "age";

type Age3 = People[typeof key]; //  People[key] 报错, 除非用 type key = 'age' 这样声明 key 就可以。

// 5、 条件类型
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}
// type Examplel = number
type Example1 = Dog extends Animal ? number : string;
// type Example = string
type Example2 = RegExp extends Animal ? number : string;
// 这样写其实没多大意义， 要结合泛型写
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
// function createlabel(id: number): IdLabel;
// function createlabel(name: string): NameLabel;
// function createlabel(nameOrId: string | number): IdLabel | NameLabel;
// function createlabel(nameorId: string | number): IdLabel | NameLabel {
//     // 这样 会随着 参数的类型增多，函数签名而增多， 可以用 条件类型优化
//     throw "";
// }

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "";
}
// type aaa = Namelabel
let aaa = createLabel("typescript");
// type bbb = IdLabel
let bbb = createLabel(2.8);
// type ccc  = NameLabel | IdLabel
let ccc = createLabel(Math.random() >= 0.5 ? " hello" : 1);

// 6、 映射类型

// 7、 模板字面量类型
