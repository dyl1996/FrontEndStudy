/**
 * 任何包含 import 或 export 语句的文件，就是一个模块（module）。相应地，如果文件不包含 export 语句，就是一个全局的脚本文件。
 */

// 如果一个文件不包含 export 语句，但是希望把它当作一个模块（即内部变量对外不可见），可以在脚本头部添加一行语句
/*
    export {}
*/

/**
 * 输出类型 export type
 */

// export type Bool = true | false
/*
type Bool2 = true | false;
export { type Bool2 }
export type { Bool2 }
*/

/**
 * 输入类型 import type
 */

// import 在一条语句中，可以同时输入类型和正常接口。
/*
// a.ts
export interface A {
    foo: string;
  }
  
export let a = 123;
  
// b.ts
import { A, a } from "./a";
// 通过type区分输入类型
// 方式1
import { type A, a } from "./a";
// 方式2(只能输入类型)
import type { A } from "./a";
// import type 输入默认类型
import type DefaultType from "ModuleA"
// import type 输入所有类型
import type * as TypeNS from "ModuleA"
// Point只能作为类型使用
class Point {
  x: number;
  y: number;
}

export type { Point };
*/

/**
 * importsNotUsedAsValues 编译设置
 */

// import { TypeA } from './a';
//（1）remove：这是默认值，自动删除输入类型的 import 语句。

//（2）preserve：保留输入类型的 import 语句,但会删掉其中涉及类型的部分
// import './'
//（3）error：保留输入类型的 import 语句（与preserve相同），但是必须写成import type的形式，否则报错。
// import type { TypeA } from './a'

/**
 * CommonJS 模块
 */

// TypeScript 使用import =语句输入 CommonJS 模块。
// import * as fs from "fs";
// 等同于
// import fs = require("fs");

// TypeScript 使用export =语句，输出 CommonJS 模块的对象，等同于 CommonJS 的module.exports对象。
// let obj = { foo: 123 };
// export = obj;

// export = 输出的模块稚嫩

/**
 * 其他
 * https://typescript.p6p.net/typescript-tutorial/module.html
 */
