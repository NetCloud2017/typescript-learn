//数字枚举
enum Role {
    //  默认第一个是 0；
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest,
}
// 数字枚举可以反向映射
/*
 成员的key  和 value 都作为了 key 和 value；    
 obj[obj['abc'] = 1] = 'abc'
 {1: 'abc', abc: 1}
*/
console.log(Role.Reporter);
//字符串枚举
/*
只有成员的名称作为 key 所以不能做反向映射
obj[Fail] = '抱歉， 失败了'
*/
enum Message {
    Success = "情喜你，成功了",
    Fail = "抱歉，失败了",
}
//鼻构枚举: 数字枚举和 字符串枚举混用；（不推荐）
enum Answer {
    N,
    Y = "Yes",
}
//校举成员的性质
// 枚举成员的值是定义后不能修改的

// Role.Reporter = 2 // 报错
enum Char {
    /*
    枚举成员的分类
    1、常量枚举 const member (在编译的时候计算出结果， 以常量的形式出现在运行时环境)  
    包括： 没有初始值 、 对已有枚举成员的引用、 常量表达式     
 */
    a,
    b = Char.a,
    C = 1 + 3,

    /* 
    2、compute member  非常量表达式
    这些在运行时才计算出结果； 
    在compute 枚举成员的后面添加成员 要赋初始值；否则错误
*/
    d = Math.random(),
    e = "123".length,
    dd = Math.random(),
}
//常量枚举
// 用 const 定义的 枚举是常量枚举， 常量枚举在编译的时候会被直接去除，
// 它的作用是： 当我们不需要对象， 而需要对象的值的时候就可以使用常量枚举，
const enum Month {
    Jan,
    Feb,
    Mar,
}
// 这样可以减少在编译环境的代码
// 如
let month = [Month.Jan, Month.Feb, Month.Mar];

//枚单美型 在某些情况下枚举和 枚举成员都可以作为一种单独的类型存在；
enum E {
    a,
    b,
}
enum F {
    a = 0,
    b = 1,
}
enum G {
    a = "apple",
    b = "banana",
}
let e: E = 3;
let f: F = 3;
// 例如 e 和 不能进行比较
// e === f // 报错
let e1: E.a = 1;
let e2: E.b;
let e3: E.a = 1;

// e1 和  e3  是相同的枚举成员可以进行比较，而 e1 不能和 e2 比较

let g1: G = G.b; //只能赋 G.a 或 G.b; // 字符串的枚举它的取值只能是枚举的成员值；
let g2: G.a;

// 作业
enum myRole {
    a,
    b, 
    c,
    d,
    e,
    f,
}
function initByRole(role: myRole) {
    if (role === 1 || role === 2) {
        // do sth
    } else if (role === 3 || role == 4) {
        // do sth
    } else if (role === 5) {
        // do sth
    } else {
        // do sth
    }
}
