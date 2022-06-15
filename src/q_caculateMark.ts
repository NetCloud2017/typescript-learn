// 参数展开运算符-- 形参展开

function multiply(n: number, ...m: number[]) {
    // 将剩余的参数 以 [1,2,3,4] 赋值给 m
    return m.map((x) => n * x);
}
const returnValue = multiply(10, 1, 2, 3, 4); // [10, 20, 30, 40]

// 实参展开

const arrr = [1, 2, 3];
const arr22 = [4, 5, 6];
arrr.push(...arr22); // [1, 2, 3, 4, 5, 6]


// const args =[8, 5]
// const angle = Math.atan2(...args) // 报错 扩张参数必须具有元组类型或传递给 rest 参数。
/*
    意思是 args 被 ts 判断 为一个 number[] , 且 不确定 元素的个数， 而 Math.atan2 函数只能传两个参数
    因此要将 args 确定为常量
*/ 

const args = [8, 5] as const
// args.push(3); 加不上去了
const angle = Math.atan2(...args)
