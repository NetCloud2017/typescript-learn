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
    z!:number
    t?: string
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

// 3、 构造器

// 4、方法

// 5、 Getters / Setters

// 6、索引签名
