/**
 *  在TypeScript中编写基于模块的代码时，有三个主要方面需要考虑：
 * 1、语法：我想用什么语法来导入和导出东西？
 * 2、模块解析：模块名称（或路径）和磁盘上的文件之间是什么关系？
 * 3、模块输出目标：我编译出来的JavaScript模块应该是什么样子的?
 *
 *
 * export type
 * import type
 * import { type Cat }
 */
// 可以这样
// import type { Cat, Dog } from'./animal'
// import { createCatName } from'./animal'

import { createCatName, type Cat, type Dog } from "./t_tsModuleExport"; // 不要写 .ts
const { add } = require("./t_tsModuleExport");
console.log(add(2, 2), "commonJs");
type Animals = Cat | Dog;
console.log(typeof createCatName ,'name')

// 也可 es 模块 与 commonjs 行为
// import fs = require("fs");
// const code = fs.readFileSync("./a.ts", "utf8");
