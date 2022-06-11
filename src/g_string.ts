// 文字类型

//值约束 只能在 对象 ，函数形参 返回值中 用  
type Obj = {
    name: "a" | "b" | "c";
    age: 18 | 19 | 20;
};

let limitObj: Obj = {
    name: "a",
    age: 18,
};

// 组合约束

interface Options {
    width: number
}
function configure(x:Options | 'auto') {

}
configure({width: 10})
configure('auto')


// 布尔文字类型 ，只有两个
let  bool1:true = true // 'as'
let  bool2: false = false;

// 文字推理
 
/* 
    当我们使用对象来初始化变量的时候， typescript 会认为 稍后
    这个值会被改变 
*/

const count = {
    count: 0
}
if(true) {
    count .count = 1
}
function handleRequest(url: string, method: "get"|"post") {

}

// const req = {
//     url: 'url',
//     method: 'get' // 由于 method 是字符串 范围太广导致传入参数不能识别
//     // 方法1、method: 'get' as 'get'
// }

// 方法2
const req = {
    url: 'url',
    method: 'get'
} as const; 

// 方法3 
handleRequest(req.url, req.method as 'get')