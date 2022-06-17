/*
never类型 ： 一个不应该存在的状态， 他可以分配给其他任何类型， 
但是不允许其他类型分配给他， 除了他自己本身。 
*/

// never 类型与 穷尽性检测

interface A {
    name: "a";
}
interface B {
    name: string ;
}
interface C {
    name: "c";
}

type Kind = A | B 
// type Kind = A | B | C; //   这样default项会报错

function BelongType(kind: Kind) {
    switch (kind.name) {
        case "a":
            console.log(kind.name);
            break;
        case "b":
            console.log(kind.name);
            break;
        default:
            // 这个穷尽性检测就是为了 当 Kind 加入了
            // 其他类型的时候可以将其拦截下来
            const neverType = kind as never;
            return neverType;
    }
}
