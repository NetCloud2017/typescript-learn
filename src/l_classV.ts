// 如何使用类型谓词
// 参数名 is 类型
type aFish = {
    name: string;
    swim: () => void;
};

type aBird = {
    name: string;
    fly: () => void;
};
// 若是 true 则 pet 就是  aFish 这个类 ， 否则是个 布尔值
function isFish(pet: aFish | aBird): pet is aFish {
    return (pet as aFish).swim !== undefined;
}

// 返回值 是 aFish 或 aBird 的类。
function getSmallPet(): aFish | aBird {
    let bird: aBird = {
        name: "flog",
        fly: () => {},
    };
    let fish: aFish = {
        name: "goldFF",
        swim: () => {},
    };
    return true ? bird : fish;
}

let pet = getSmallPet();

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

const zoo: (aFish | aBird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: aFish[] = zoo.filter(isFish);
const underWater2: aFish[] = zoo.filter(isFish) as aFish[];

const underWater3: aFish[] = zoo.filter((pet): pet is aFish => {
    if (pet.name === "frog") {
        return false;
    }
    return isFish(pet);
});

// 类的属性

// 1、 雷属性

class Pointt {
    // 也可以在这里进行初始化赋值
    x = 1;
    y: number = 1;
    // 也可用 确定分配断言 或 可选操作符进行初始化
    z!: number;
    t?: string;
    // constructor() {
    //     // 也可以在这里进行初始化赋值
    //     this.x = 0;
    //     this.y = 0;
    // }
}
const pt = new Pointt();
pt.x = 1;
pt.y = 1;
console.log(pt.x);
console.log(pt.y);

// 2、 readonly

class Greeter {
    readonly name: string = "world";
    constructor(otherName?: string) {
        // constructor 这里 的赋值和 直接设置属性后赋值的区别是
        //  属性 后赋值是 定义初始赋值 ，constructor 赋值是由用户实例化后 赋值；
        // 这里可以更改
        if (otherName !== undefined) {
            // 条件类型缩减后进行赋值
            this.name = otherName;
        }
    }
    err() {
        // 类符方法里也是不可以更改的
        // this.name = "Tnot ok";
    }
}
const g = new Greeter("hello");
// g.name = 'a'
console.log(g.name);

// 3、 构造器 constructor

/**
 *  这里需要注意两点：
 *  1、构造函数不能有类型参数
 *  2、构造函数不能有返回类型注释,如这种 ( constructor (): type {})
 */
class PointT {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}
const pp = new PointT();
// console.log(p.x)
// console.log(p.y)
class Line extends PointT {
    constructor() {
        super(); // ** 派生类必须要有 super 函数 否则报错
        console.log(this.y);
    }
}

// 4、方法

class ClassFunc {
    x: number = 123;
    name: string = "ok";
    returnVal(str: string): string {
        return this.name;
    }
    scaleX(num: number) {
        this.x *= num;
    }
    changeName(name: string): void {
        this.name = name;
        this.returnVal(name);
    }
}
const initC = new ClassFunc();
initC.scaleX(10);
console.log(initC.x); // 1230

// 5、 Getters / Setters
// 类的特殊的推理规则
// 1、如果存在get，但没有set，则该属性自动是只读的
// 2、如果没有指定setter参数的类型，它将从getter的返回类型中推断出来
// 3、访问器和设置器必须有相同的成员可见性
class C {
    _length = 0;
    get length(): number {
        return this._length;
    }
    set length(value: string | number | boolean) {
        // 4.3 开始 这里的value的值类型可以 和 get 返回的不一致，但是赋值时要一致。
        let num = Number(value);
        if (!Number.isFinite(num)) {
            this._length = 0;
            return;
        }
        this._length = num;
    }
}

// 6、索引签名
class MyClass {
    // 索引签名和对象的一样
    [s: string]: boolean | ((s: string) => boolean);
    x = true;
    check(s: string) {
        return this[s] as boolean;
    }
}

// 类的继承

// 1、 implements 继承接口
interface A1 {}
interface B1 {}
// 多一个接口实现
class CC implements A1, B1 {}

interface Checkable {
    check(name: string): boolean;
    checkFail?: false; // 带有可选属性的 接口， 类可以不实现它；
}
class NameChecker implements Checkable {
    // 实现的接口的 方法， 参数并不一定要和接口的参数类型一致， 只要保持一致既可
    check(name: string | number | boolean): boolean {
        return name !== "ok";
    }
}

const namex = new NameChecker();

// console.log(namex.checkFail, " ddd"); // 默认没有实现

// 2、 extends 继承类

class AnimalC {
    move() {
        console.log("Moving along!");
    }
}
class Dog extends AnimalC {
    wooff(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}
const d = new Dog();
d.move();

//  重写方法
// 派生类重写基类的属性或方法

/**
 *  可以用 super. 的方法访问 基类的属性和方法
 *  因为js  是一个简单的查找对象，所以没有超级字段的概念， ts 强制要求它的派生类总是基类的一个子类型
 */
class Base {
    greet() {
        console.log("Hello World");
    }
}
class Derived extends Base {
    greet(name?: string) {
        // 若这个 参数是必填的， 那就报错了。
        // 子类覆盖 基类的方法 的参数要 遵守 和基类的 参数类型一致规则一致；
        if (name === undefined) {
            super.greet();
        } else {
            console.log(name.toUpperCase());
        }
    }
}
const dd = new Derived();
dd.greet();
dd.greet("reader");

// 派生类赋值

const bd: Base = dd;
bd.greet();

// 类的初始化顺序
/*
 *   1、基类的字段被初始化
 *   2、基类构造函数运行
 *   3、派生类的字段被初始化
 *   4、派生类构造函数运行
 */
class B {
    name = "base";
    constructor() {
        console.log("My name is " + this.name); // base
    }
}
class Deri extends B {
    name = "derived";
}
const der = new Deri();

// 继承内置类型
class MsgError extends Error {
    constructor(m: string) {
        super(m);
        //注意： es5 target 版本一下需要 明确的设置原型（如下）， 用于编译成 es 5 版本一下的代码， 这样 sayHello 方法才会继承到 原型上。，或 msgError 是 MsgError 的实例；
        Object.setPrototypeOf(this, MsgError.prototype);
    }
    sayHello() {
        return "hello" + this.message;
    }
}

const msgError = new MsgError("hello");
console.log(msgError.sayHello(), msgError instanceof MsgError); //

// 成员的可见性

class Greet {
    // *  public: 公开的，默认值。任何对象在任何地方都可以访问（默认情况下可不写）
    public greet() {
        // 可在内部 可以在 外面的实例， 也可以在子类中访问
        console.log("hi!");
    }
    // *  protected : 受保护的。能在当前类或者子类中进行访问
    protected sayHello() {
        this.greet();
    }
    protected ID = "01";

    // *  private : 私有的。只能在当前类中进行访问
    // private和protected一样，但不允许从子类中访问该成员。TypeScript允许跨实例的私有访问

    private name = "gogo";
    sayName(other: Greet) {
        //  跨实例的 私有访问 ， 这个 other 可以是 当前的实例， 也可以是子类的实例
        return this.name;
    }
}
class Hello extends Greet {
    public ID: string = "12"; // 子类中修改继承的保护属性， 默认是 protected ;
    constructor() {
        super();
        this.greet();
    }
}
const gg = new Greet();
gg.greet();
console.log(gg.sayName(gg), 666);
// gg.sayHello(); // 访问不了
const gson = new Hello();
console.log(gson.ID, 123);

// 类的静态成员

/**
 * 类可以有静态成员， 这些成员不与类的特定实例相关联， 他们可以通过类的构造函数对象本身来访问
 *  注意：
 *  特殊的静态名称不安全，避免使用：name,length,call等, TypeScript没有静态类的概念，因为我们还有函数和普通对象
 *
 */

class MyC {
    // private / protected / public 都可以修饰 静态属性和方法；
    private static x = 0;
    static qqNum: "2202";
    abc = "666";
    static printx() {
        // console.log(MyC.x);
        return "hello";
    }
}

// console.log(MyC.x); // 私有属性
console.log(MyC.qqNum);
// console.log(MyC.abc); // 访问不了， 静态属性和非静态的区别就是能不能直接通过类访问；

// MyC.printx()

class SonClass extends MyC {
    //  这些静态属性和方法也是可以继承的。
    //  Property 'sonProp' of type 'void' is not assignable to 'string' index type 'boolean | ((s: string) => boolean)'
    sonProp = MyC.printx();
}

// 类的 static 区块；
// # 命名的属性 只能在 target es2015 以上使用；

class Foo {
    static #count = 0; //  这样它会变成一个私有变量， （他和私有变量有什么区别呢？ ， 区块有什么用）
    get count() {
        return Foo.#count;
    }
    static {
        // static  区块
        try {
            const lastInstance = {
                length: 100,
            };
            Foo.#count += lastInstance.length;
        } catch {}
    }
}
// Foo.#count; 访问不了
