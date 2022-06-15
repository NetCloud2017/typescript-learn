// 定义对象类型

// function greet(person: { name: string; age: number }) {
//     // 匿名定义
//     return "Hello" + person.name;
// }
// interface Person {
//     // 接口定义
//     name: string;
//     age: number;
// }

// function greet(person: Person) {
//     return "Hello" + person.name;
// }

// type Person = {
//     // 类型别名定义
//     name: string;
//     age: number;
// };

// function greet(person: Person) {
//     return "Hello" + person.name;
// }

// 属性修改器

// 可选属性
type Shaped = {};
interface PaintOptions {
    shaped: Shaped; //
    xPos?: number;
    yPos?: number;
}

function paintShape({
    shaped: Shape, // 对象结构别名,
    xPos: number = 0,
    yPos = 0,
}: PaintOptions) {
    console.log(Shape);
    console.log(number);
}
const shaped: Shaped = {};
paintShape({ shaped });

// 只读属性
// readonly 功能和 const  差不多；
interface Home {
    readonly address: "北京";
    readonly resident: {
        name: string; // 这里可以修改
        readonly age: 23;
    };
}

// ts 在检测两个属性是否兼容的时候他不考虑属性是否是 readonly， 因此readonly 属性可以用 别名来改变
// 例如
interface Person {
    name: string;
    age: number;
}
interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}
let writablePerson: Person = {
    name: "Felix",
    age: 18,
};
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
// 导致 readonlyPerson 的 age 也改变了；

// 索引签名
// 当我们不知道对象的某个属性的具体名称，但是知道它的大概的样子， 这时我们就可以使用索引签名
// 索引 只能是 number 或 string 类型；

interface NotOkay {
    [index: string]: number | string;
    readonly [props: number]: number; //只读索引签名
    length: number;
    name: string;
}
let notOkay: NotOkay = {
    1: 23,
    x: 100,
    length: 100,
    name: "felix",
};
