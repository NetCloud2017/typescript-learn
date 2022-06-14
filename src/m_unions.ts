// 联合类型 unions

// interface Shape {
//     kind: 'circle' | 'square',
//     radius?: number,
//     sideLength?: number
// }

interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type Shape = Circle | Square;
function handleShape(shape: Shape) {
    if (shape.kind === "circle") {
    }
}

function getArea(shape: Shape) {
    // 这个写法有问题 ，因为 用第一个 Shape 时 不知道它是circle 还是 square
    // 所以要拆分成俩个类
    // return Math.PI * shape.radius!  ** 2

    // if(shape.kind === 'circle') {
    //     return Math.PI * shape.radius ** 2;
    // }

    // Switch 写法
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}
