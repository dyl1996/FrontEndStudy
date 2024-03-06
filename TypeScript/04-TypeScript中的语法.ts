/**
 * 联合类型(!)
 */
let foo: number | string = "abc";
// 类型缩小
if (typeof foo === "string") {
  console.log(foo.length);
}

/**
 * 类型别名
 */
type PointType = { x: number; y: number; z?: number };
function printCoordinate(point: PointType) {
  console.log(point.x, point.y, point.z);
}

/**
 * 接口
 */
interface PointType2 {
  x: number;
  y: number;
  z?: number;
}

/**
 * 接口声明和类型别名的区别
 */

// 1.区别一: type类型使用范围更广, 接口类型只能用来声明对象
type MyNumber = number;
// 2.区别二: 在声明对象时, interface可以多次声明
// 2.1. type不允许两个相同名称的别名同时存在
// type PointType1 = {
//   x: number
//   y: number
// }

// type PointType1 = {
//   z?: number
// }
// 2.2. interface可以多次声明同一个接口名称
interface PointType3 {
  x: number;
  y: number;
}

interface PointType3 {
  z: number;
}

const point: PointType3 = {
  x: 100,
  y: 200,
  z: 300,
};
// 3.interface支持继承的
interface IPerson {
  name: string;
  age: number;
}
interface Me extends IPerson {
  kouhao: string;
}
// 4.interface可以被类实现(TS面向对象时候再讲)
class Person implements IPerson {
  name: string;
  age: number;
}

/**
 * 交叉类型(&)：多种类型同时满足
 * 联合类型：多种类型满足其一
 */
type newType = number & string; // never
interface IPerson2 {
  name: string;
  age: number;
}
interface ICoder {
  name: string;
  coding: () => void;
}
type InfoType = IPerson2 & ICoder;
const info: InfoType = {
  name: "why",
  age: 18,
  coding() {
    console.log("coding");
  },
};

/**
 * 类型断言
 * 断言只能断言成更加具体的类型, 或者 不太具体(any/unknown) 类型
 */
const imgEl = document.querySelector(".img") as HTMLImageElement;
const age: number = 18;
// 错误的做法
// const age2 = age as string

/**
 * 非空断言(!)
 */
// 定义接口
interface IPerson3 {
  name: string;
  age: number;
  friend?: {
    name: string;
  };
}

const info2: IPerson3 = {
  name: "why",
  age: 18,
};

// 访问属性: 可选链: ?.
console.log(info2.friend?.name);

// 属性赋值:
// 解决方案一: 类型缩小
if (info2.friend) {
  info2.friend.name = "kobe";
}

// 解决方案二: 非空类型断言(有点危险, 只有确保friend一定有值的情况, 才能使用)
info2.friend!.name = "james";

/**
 * 字面量类型
 */

// 1.字面量类型的基本上
const name: "why" = "why";
let age2: 18 = 18;

// 2.将多个字面量类型联合起来 |
type Direction = "left" | "right" | "up" | "down";
const d1: Direction = "left";

// 栗子: 封装请求方法
type MethodType = "get" | "post";
function request(url: string, method: MethodType) {}

request("http://codercba.com/api/aaa", "post");

// TS细节
// const info = {
//   url: "xxxx",
//   method: "post"
// }
// 下面的做法是错误: info.method获取的是string类型
// request(info.url, info.method)

// 解决方案一: info.method进行类型断言
// request(info.url, info.method as "post")

// 解决方案二: 直接让info对象类型是一个字面量类型
// const info2: { url: string, method: "post" } = {
//   url: "xxxx",
//   method: "post"
// }
const info3 = {
  url: "xxxx",
  method: "post",
} as const;
// xxx 本身就是一个string
request(info3.url, info3.method);

/**
 * 类型缩小
 */
// 1.typeof: 使用的最多
function printID(id: number | string) {
  if (typeof id === "string") {
    console.log(id.length, id.split(" "));
  } else {
    console.log(id);
  }
}
// 2.===/!==: 方向的类型判断
type Direction2 = "left" | "right" | "up" | "down";
function switchDirection(direction: Direction2) {
  if (direction === "left") {
    console.log("左:", "角色向左移动");
  } else if (direction === "right") {
    console.log("右:", "角色向右移动");
  } else if (direction === "up") {
    console.log("上:", "角色向上移动");
  } else if (direction === "down") {
    console.log("下:", "角色向下移动");
  }
}
// 3. instanceof: 传入一个日期, 打印日期
function printDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getTime());
  } else {
    console.log(date);
  }

  // if (typeof date === "string") {
  //   console.log(date)
  // } else {
  //   console.log(date.getTime())
  // }
}
// 4.in: 判断是否有某一个属性
interface ISwim {
  swim: () => void;
}

interface IRun {
  run: () => void;
}

function move(animal: ISwim | IRun) {
  if ("swim" in animal) {
    animal.swim();
  } else if ("run" in animal) {
    animal.run();
  }
}
export default {};
