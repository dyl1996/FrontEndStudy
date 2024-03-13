/**
 * namespace 用来建立一个容器，内部的所有变量和函数，都必须在这个容器里面使用。
 * 如果要在命名空间以外使用内部成员，就必须为该成员加上export前缀，表示对外输出该成员。
 */
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }

  // 正确
  isString("yes");
}

Utils.isString("no");

/**
 * namespace 内部还可以使用import命令输入外部成员，相当于为外部成员起别名。当外部成员的名字比较长时，别名能够简化代码。
 */
namespace App {
  import isString = Utils.isString;

  isString("yes");
  // 等同于
  Utils.isString("yes");
}

// import命令也可以在 namespace 外部，指定别名
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;

// 等同于 new Shapes.Polygons.Square()
let sq = new polygons.Square();

/**
 * namespace 可以嵌套
 */
namespace Utils {
  export namespace Messaging {
    export function log(msg: string) {
      console.log(msg);
    }
    export interface MyInterface {}
    export class MyClass {}
  }
}

Utils.Messaging.log("hello"); // "hello"

/**
 * 如果 namespace 代码放在一个单独的文件里，那么引入这个文件需要使用三斜杠的语法。
 */

// /// <reference path = "SomeFileName.ts" />

/**
 * namespace 的输出
 */
// shapes.ts
export namespace Shapes2 {
  export class Triangle {
    // ...
  }
  export class Square {
    // ...
  }
}
// 导入
// 写法一
// import { Shapes } from "./shapes";
// let t = new Shapes.Triangle();

// 写法二
// import * as shapes from "./shapes";
// let t = new shapes.Shapes.Triangle();

/**
 * namespace合并
 * 非export的成员不会被合并，但是它们只能在各自的命名空间中使用。
 */
namespace Animals {
  export class Cat {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// 等同于
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Cat {}
//   export class Dog {}
// }

// 函数合并 要求同名函数必须在命名空间之前声明 确保先创建出一个函数对象，然后同名的命名空间就相当于给这个函数对象添加额外的属性
function f() {
  return f.version;
}

namespace f {
  export const version = "1.0";
}

f(); // '1.0'
f.version; // '1.0'

// 类合并
class C {
  foo = 1;
}

namespace C {
  export const bar = 2;
}

C.bar; // 2

// Enum合并
enum E {
  A,
  B,
  C,
}

namespace E {
  export function foo() {
    console.log(E.C);
  }
}

E.foo(); // 2
