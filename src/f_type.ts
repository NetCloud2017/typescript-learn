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
