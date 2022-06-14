function strLog(obj: { a: string; b?: string }) {
    // ? 可选字符的用法
    // if(obj.b)  {
    //     console.log(obj.b.toLocaleLowerCase());
    // }
    obj.b?.toLocaleLowerCase();
}
strLog({ a: "name" });

// 联合类型
function printId(id: number | string | string[]) {
    // console.log(id.toUperCase());
    if (typeof id === "string") {
    } else if (Array.isArray(id)) {
        id.join(",");
    }
}
printId("1234");
printId(123);

// 函数在 ts 中的使用；
// 函数类型表达式

let fn: (a: string) => void; // fn 是一个函数类型

// 这可以这样 定义

type Fn2 = (a: string) => void;
function greeter(fn: Fn2) {
    fn("hello world");
}

function printToLog(s: string) {
    console.log(s);
}
greeter(printToLog);

// 调用签名

/*
在 js 中 函数可以有属性 ， 但在 ts 中函数类型表达式的语法不允许有属性
如果要用属性描述可以调用的东西， 可以在对象属性中用调用签名。

*/

type DescribableFunction = {
    discription: string;
    // （someArg) 代表函数 func1 的传参类型 返回值是布尔类型
    // 调用签名
    (someArg: number): boolean;
};

function doSomeThing(fn: DescribableFunction) {
    console.log(fn.discription + "returned" + fn(6));
}

function func1(n: number) {
    console.log(n);
    return Math.random() > 0.5 ? true : false;
}

func1.discription = "66666";

doSomeThing(func1);

// 构造签名
/*
    
*/

class Ctor {
    s: string;
    constructor(s: string) {
        this.s = s;
    }
}

type NewFunc = {
    // 构造签名
    new (s: string): Ctor;
};

function fn2(ctor: NewFunc) {
    return new ctor("hello");
}

const instance = fn2(Ctor);
console.log(instance.s); // hello

// 调用签名和 构造签名混合使用

/*

https://cn.bing.com/search?q=interface%20CallOrConstructor%20%7B%20%20%20%20%20new%20(s%3A%20string)%3A%20Date%3B%20%20%20%20%20(n%3F%3A%20number)%3A%20number%3B%20%7D

*/
interface CallOrConstructor {
    // 不知道什么样的对象才符合这个接口
    new (s: string): Date;
    (n?: number): number;
}
function fn3(date: CallOrConstructor) {
    let d = new date("2021-12-20");
    let n = date(100);

    console.log(d, n);
}

// function CreateDate(s: string, n?: number) {
//     if (typeof n === "number") {
//         return n ** 2;
//     }
//     return new Date(s);
// }

// fn3(CreateDate)

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
function fnn(x: string): void;
function fnn() {
    // 实现函数 这里没有参数 ，为啥调用是不传参数会报错呢？
    // 因为在调用函数时， 是看不到实现函数里面的参数的， 只能看到重载签名函数的参数约束。
}
// fnn() // 这里会报错
fnn("hello");

// 2、参数类型不正确
function fnn2(x: boolean): void;
function fnn2(x: string): void;
function fnn2(x: boolean | string) {} // 参数兼容重载函数的参数

// 3、返回类型不正确
function fnn3(x: string): string;
function fnn3(x: boolean): boolean;
function fnn3(x: string | boolean): string | boolean {
    // 返回值兼容
    return "hello";
}

// 编写好重载
// 1、在可能的情况下，总是倾向于使用联合类型的参数而不是重载参数

// function len(s: string): number;
// function len(arr: any[]): number;
// function len(x: any) {
//     return x.length;
// }
function len(x: any[] | string) {
    return x.length;
}

len("hello");
len([1, 2, 3]);
len(Math.random() > 0.5 ? "hello" : [4, 5, 6]); // 这样前面注释的就报错

// 函数内的 this 声明
/*
ts 会通过代码流分析来推断 函数内的this 是什么、 
在js 中 我们是不能用this 这个参数名的，而在ts中我们是可以使用这个语法空间的
它允许我们使用this 这个参数的名字， 同时还可以给this 指定它的类型
*/

interface User {
    admin: boolean;
}
interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}
const db: DB = {
    filterUsers: (filter: (this: User) => boolean) => {
        let user1: User = {
            admin: true,
        };
        let user2: User = {
            admin: false,
        };
        return [user1, user2];
    },
};

const admins = db.filterUsers(function (this: User) {
    return this.admin;
});

// const admins = db.filterUsers((this: User) => {
//     // 报错 箭头函数是 不能包含this这个参数的
//     return this.admin;
// });
console.log(admins);
