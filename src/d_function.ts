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
