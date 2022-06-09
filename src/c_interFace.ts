// 接口可以用来约束 对象、函数、 以及类的结构和类型，
// 只能遵守不能改变

interface List {
    id: number;
    name: string;
    [x: string]: any; // 含义 是用任意的 字符串去索引List; 这样就可以添加多余的属性了
    age?: number; // 可选属性 ?
    // readonly male?: string; // 只读属性； 只读属性不能被修改
}
interface Result {
    data: List[];
}
function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name);
        if (value.age) {
            console.log(value.age);
        }
    });
}
let result = {
    data: [
        { id: 1, name: "A", sex: "male" },
        { id: 2, name: "8" },
    ],
};
// 传入的 data 符合 List 的条件、
render(result);

// 如果是直接传入对象就会多data 的数据进行类型检查, 如下：
render({
    data: [
        { id: 1, name: " A", x: "male" }, // 添加字符串引用签名
        { id: 2, name: " B" },
    ],
});

// 要过这种检查的方法有三种;
// 1、赋值到变量才传入；

// 2、类型断言, (推荐第一个)
render({
    data: [
        { id: 1, name: " A", sex: "male" },
        { id: 2, name: " B" },
    ],
} as Result);

render(<Result>{
    data: [
        { id: 1, name: " A", sex: "male" },
        { id: 2, name: " B" },
    ],
});
// 3、字符串索引签名
// interface List {
//     id: number;
//     name: string;
//     [x: string]: any;
// }

// 定义用数字去索引的接口
// 当不确定一个接口有多少个属性的时候就可以用 可索引类型的接口；
// 可索引的接口用可以数字 也可以用 字符串去索引；
interface StringArray {
    // 用任意的数字去索引 StringArray , 都会得到一个 string;
    [index: number]: string;
}

// 比如
let chars: StringArray = ["a", "b"];

// 字符串索引的接口
interface Nnmes {
    // 用任意的字符串去索引 Names 都会得到一个 string；
    [x: string]: string; // 但是这样不能被允许声明一个 number类型的成员了
    // y:number; 
    // 两种索引签名是可以混用 的；如下定义一个数字索引签名
    // 数字索引签名的返回值一定要是字符串索引签名返回值的子类型
    // [z:number]: number; 这样 会报错 ， 若是 改为[x:string]: any; 就可以了；
    [z:number]: string;


}
