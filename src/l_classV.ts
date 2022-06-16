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
    get length():number {
        return this._length;
    }
    set length(value: string | number | boolean) {
        // 4.3 开始 这里的value的值类型可以 和 get 返回的不一致，但是赋值时要一致。
        let num = Number(value)
        if(!Number.isFinite(num)) {
            this._length = 0
            return
        }
        this._length = num;
    }
}

// 6、索引签名
