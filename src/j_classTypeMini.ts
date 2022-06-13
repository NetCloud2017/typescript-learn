//  类型缩小 常用于处理联合类型的变量的场景

function padLeft(padding: number | string, input: string): string {
    // return new Array(padding + 1).join(" ") + input;
    /*
        将声明细化为 比声明更具体的类型的过程，称为类型缩小
    */
    if (typeof padding === "number") {
        // 这里确定了padding 就是numbe
        // typeof 类型守卫
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}

// 真值缩小 (这个概念和 js 的 隐式转换 差不多)
// js 中 可以使用 条件语句 、 && 、 || 、 if语句 、 布尔否定 ( ! ); 来组成布尔表达式；

function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        // 0
        // NaN
        // ''（空字符串）
        // On（bigint零的版本）
        // null
        // undefined
        // Boolean('value') 或 !! 'value';
        // 以上都是属于真值缩小的， 最终都是变成 布尔值了；所以缩小了类型
        return `现在共有${numUsersOnline}人在线！`;
    }
    return "现在没有人在线.：（";
}


// 等值缩小
// typescript 也可以用 === ， ！== ， == ， ！=   来做等值检测；实现类型缩小
