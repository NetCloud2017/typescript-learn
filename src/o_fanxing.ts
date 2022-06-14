/* 
    泛型： 俩个值之间存在的对应关系，比如 函数参数的值 和 函数返回的值 之间存在的对应关系； 

    function firstElement(arr: any[]) {
        返回值是 参数的某个元素
        return arr[0];
    }

*/
// 这个Type 写什么都可以
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
    // return 1000  这样写报错 ， 因为这个是泛型， 不能确定调用是传进来的就一定是 number 类型；
}
const s = firstElement<string>(["a", "b", "c"]); //s是'string'类型 <这里声明传参类型> 不写也可以 ， ts 会自动推断。
const n = firstElement<number>([1, 2, 3]); // n是'number'类型
const u = firstElement<undefined>([]); // u是undefined类型

// 同时使用多个泛型
// Input 是 string 类型 ， Output 是 number 类型
function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output
): Output[] {
    return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
