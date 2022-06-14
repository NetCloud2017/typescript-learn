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