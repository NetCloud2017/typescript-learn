// 其他类型；

/*
void 没有返回值的函数返回值， 当一个函数没有任何返回语句
或者没有从这个返回语句中 返回任何值的时候它的返回值都是推断出来的

在js 中 一个没有返回值的函数的默认返回值的undefined ， 而在 ts 中 void  和 undefined 是不一样的。 

// 例如
function foo () {
    // ts 会推断它的返回类型就是 void
    return ;
}

*/

// object （全小写） : 指的是任何 非 基元的值; 它不等同于 {} 和 Object
/*
    基元的值包括： 
    string number bigint boolean symbol null undefined

    object 不是 object。始终使用 object！


*/

// unknown

/*
unknown类型代表任何值。这与any类型类似，但更安全，因为对未知 unknown值做任何事情都是不合法的。
// 例如
function f1(a: any) {
    a.b(); //正种
}
function f2(a: unknown) {
    // a.b(); // 这里会报错
}

function safeParse(s: string): unknown {
    return JSON.parse(s);
3
需要小心对待！obj， 
const obj = safeParse (someRandomString) ;

*/

// never 类型

/*
never类型表示永远不会被观察到的值。
如一个函数 抛出错误，终止程序的执行 或者是 死循环， 那么它的返回值的类型就是never  

function fail(msg: string): never {
    throw new Error(msg);
}
function fnnn(x: string | number) {
    if (typeof x === "string") {
        //做一些事
    } else if (typeof x === "number") {
        //再做一些事
    } else {
        // 这里永远也不会触发
        x; //'never'!
    }
}
*/

// Function
/*
全局性的Function类型描述了诸如bind、call、apply和其他存在于JavaScript中
所有函数值的属性。它还有一个特殊的属性，即Function类型的值总是可以被调用；
这些调用返回any。
 
function doSomething(f: Function) { // 不推荐这样使用 ，因为返回 any  类型是不安全的， 可以使用 () => void 代替。
    return f(1, 2, 3);
}

*/
