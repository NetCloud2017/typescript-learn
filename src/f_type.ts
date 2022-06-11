// type 类型别名

// 用 type 来定义类型别名

type Point = {
    x: string,
    y: number
}

type Id = number | string;

function id(id: Point) {
    console.log(id);
}

id({x: '123', y: 23});


// 基元类型
type InputStr = string;



// 类型断言 ， 用于指明 返回值的指定类型
// 这两个是等效的， 类型断言在编译时会被删除， 所以没有与类型断言相关的运行时检测
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElemen
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas")
