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
