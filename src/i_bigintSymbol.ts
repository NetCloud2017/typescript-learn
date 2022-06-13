/*
原语：

内核或微核提供核外调用的过程或函数称为原语(primitive)。
原语是一段用机器指令编写的完成特定功能的程序,在执行过程中不允许中断。

反正就是底层暴露的接口函数
*/

// ES 6 的 Symbol 也是原语

// ES 2020 开始的 Bigint 原语

const oneHundred: bigint = BigInt(100);

// "目标低于 ES2020 时，bigInt 文本不可用. target 要改成 2020
//  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt

// const anotherOnehundred : bigint = 10n

// Symbol

const firstName = Symbol("name");
const secondName = Symbol("name");
// if (firstName === secondName) {
//     console.log(1);
// }
